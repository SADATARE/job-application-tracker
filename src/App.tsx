import type { JobApplication, ApplicationFormData } from "./types/JobApplication";import Sidebar from "./components/sidebar";
import StatsRow from "./components/StatsRow";
import ApplicationsTable from "./components/ApplicationsTable";
import { useState, useEffect } from 'react'
import ApplicationFormModal from "./components/ApplicationFormModal";
import { loadApplications, saveApplications } from "./utils/storage";
import ConfirmDialog from "./components/ConfirmDialog";
import Header from "./components/Header";
import PageIntro from "./components/PageIntro";
import EmptyState from "./components/EmptyState";
import { mockApplications } from "./utils/mockData";

function App() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [applications, setApplications] = useState<JobApplication[]>(() => loadApplications() ?? []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredApplications = applications
    .filter((app) => activeFilter === "All" || app.status === activeFilter)
    .filter((app) => {
      const query = searchQuery.toLowerCase().trim();
      return (
        app.company.toLowerCase().includes(query) || app.role.toLowerCase().includes(query)
      );
    });

  function handleStatusChange(id: string, newStatus: string) {
  setApplications((prev) =>
    prev.map((app) =>
      app.id === id
        ? { ...app, status: newStatus as JobApplication["status"], lastUpdated: new Date().toISOString() }
        : app
    )
  );
}

function handleEditApplication(updatedData: ApplicationFormData) {
  if (!editingApplication) return;
  setApplications((prev) =>
    prev.map((app) =>
      app.id === editingApplication.id
        ? {
            ...updatedData,
            id: app.id,
            lastUpdated:
              updatedData.status !== app.status ? new Date().toISOString() : app.lastUpdated,
          }
        : app
    )
  );
  setEditingApplication(null);
}

function handleConfirmDelete() {
  if (!deletingId) return;
  setApplications((prev) => prev.filter((app) => app.id !== deletingId));
  setDeletingId(null);
}

  function handleApplication(newApp: ApplicationFormData){
      const application: JobApplication = {
        ...newApp,
        id: crypto.randomUUID(),
        lastUpdated: new Date().toISOString(),
      };

    setApplications((prev) => [...prev, application]);
    setIsModalOpen(false)
  }

  function handleLoadSampleData() {
    const sampleWithFreshDates = mockApplications.map((app) => ({
      ...app,
      lastUpdated: new Date().toISOString(),
    }));
    setApplications(sampleWithFreshDates);
  }

useEffect(() => {
  saveApplications(applications);
}, [applications]);

  return (
    <div className="app-shell"> 
    <Header onMenuClick={() => setIsSidebarOpen(true)}/>
    <div className="app-layout">

    <Sidebar
      applications={applications}
      activeFilter={activeFilter}
      onFilterChange={setActiveFilter}
      isOpen={isSidebarOpen}
      onClose={() => setIsSidebarOpen(false)}
    />
      <main className="main-content">
        <PageIntro onAddClick={() => setIsModalOpen(true)} />
        {applications.length > 0 && <StatsRow applications={applications}/>}

   <div className="table-toolbar">
    <h2>Recent applications</h2>
    {applications.length === 0 ? (                                          
      <span className="toolbar-count">0 applications</span>
    ) : (
      <input
                  type="text"
                  placeholder="Search company or role"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} className="search"
                />
    )}
  </div>

          {applications.length === 0 && (<EmptyState onAddClick={() => setIsModalOpen(true)} onLoadSample={handleLoadSampleData} />)}

            {applications.length > 0 && filteredApplications.length === 0 && (
              <p className="no-results">No applications match your search or filter.</p>
            )}

        {(isModalOpen || editingApplication) && (
          <ApplicationFormModal 
          existingApplication={editingApplication ?? undefined} onSave={editingApplication ? handleEditApplication : handleApplication} onCancel={() => {
            setIsModalOpen(false);
            setEditingApplication(null)
          }}
          />
        )}
        {deletingId && (
          <ConfirmDialog message="Are you sure you want to delete this application? This can't be undone." onConfirm={handleConfirmDelete} onCancel={() => setDeletingId(null)}/>
        )}
        {filteredApplications.length > 0 &&(<ApplicationsTable applications={filteredApplications} onStatusChange={handleStatusChange} onDelete={(id) => setDeletingId(id)} onEdit={(app) => setEditingApplication(app)}/>)}
      </main>
    </div>
    </div>
  );
}

export default App;

