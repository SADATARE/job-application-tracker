import "./sidebar.css";
import type { JobApplication } from "../types/JobApplication";
import type { LucideIcon } from "lucide-react";
import { LayoutGrid, Send, MessagesSquare, Sparkles, ArchiveX } from "lucide-react";

interface SidebarProps {
  applications: JobApplication[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const filters: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "All", label: "All applications", icon: LayoutGrid },
  { value: "Applied", label: "Applied", icon: Send },
  { value: "Interview", label: "Interview", icon: MessagesSquare },
  { value: "Offer", label: "Offers", icon: Sparkles },
  { value: "Rejected", label: "Rejected", icon: ArchiveX },
];

function Sidebar({ applications, activeFilter, onFilterChange, isOpen, onClose }: SidebarProps) {
  return (
  <>
    <div className={`sidebar-backdrop ${isOpen ? "visible" : ""}`} onClick={onClose} />
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <p className="sidebar-heading">Workspace</p>
      <nav>
        {filters.map(({ value, label, icon: Icon }) => {
          const count =
            value === "All"
              ? applications.length
              : applications.filter((app) => app.status === value).length;

          return (
            <button
              key={value}
              className={`sidebar-item ${activeFilter === value ? "active" : ""}`}
              onClick={() => {
                onFilterChange(value);
                onClose();
              }}
            >
              <Icon size={20} />
              <span className="sidebar-label">{label}</span>
              <span className="sidebar-count">{count}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  </>
);
}

export default Sidebar;