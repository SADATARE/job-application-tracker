import "./ApplicationFormModal.css";
import { useState } from "react";
import type { JobApplication, Status, ApplicationFormData } from "../types/JobApplication";

interface ApplicationFormModalProps {
  existingApplication?: JobApplication;
  onSave: (application: ApplicationFormData) => void;
  onCancel: () => void;
}

function ApplicationFormModal({ existingApplication, onSave, onCancel }: ApplicationFormModalProps) {
    const [company, setCompany] = useState(existingApplication?.company ?? "");
    const [role, setRole] = useState(existingApplication?.role ?? "");
    const [dateApplied, setDateApplied] = useState(existingApplication?.dateApplied ?? "");
    const [status, setStatus] = useState<Status>(existingApplication?.status ?? "Applied");
    const [postingUrl, setPostingUrl] = useState(existingApplication?.postingUrl ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ company, role, dateApplied, status, postingUrl: postingUrl || undefined });
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{existingApplication ? "Edit application" : "Add an application"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Company
            <input value={company} onChange={(e) => setCompany(e.target.value)} required placeholder="e.g MoniePoint"/>
          </label>
          <label>
            Role
            <input value={role} onChange={(e) => setRole(e.target.value)} required placeholder="e.g Frontend Developer"/>
          </label>
          <label>
            Date applied
            <input
              type="date"
              value={dateApplied}
              onChange={(e) => setDateApplied(e.target.value)}
              required
            />
          </label>
          <label>
            Status
            <select value={status} onChange={(e) => setStatus(e.target.value as Status)}>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </label>
          <label>
            Link to posting (optional)
            <input value={postingUrl} onChange={(e) => setPostingUrl(e.target.value)} placeholder="https://company.com/careers/role"/>
          </label>
          <div className="modal-actions">
            <button id="cancel" type="button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit">Save application</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplicationFormModal;