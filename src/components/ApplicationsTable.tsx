import type { JobApplication } from "../types/JobApplication";
import "./ApplicationsTable.css";
import { formatDate } from "../utils/formatDate";
import StatusBadge from "./StatusBadge";
import { getAvatarColor } from "../utils/avatarColor";
import { Pencil, Trash2 } from "lucide-react";

interface ApplicationsTableProps {
  applications: JobApplication[];
  onStatusChange: (id: string, newStatus: string) => void;
  onDelete: (id: string) => void;
  onEdit: (application: JobApplication) => void;
}

function ApplicationsTable({ applications, onStatusChange, onDelete, onEdit }: ApplicationsTableProps) {
  return (
    <div>
      
    <table>
      <thead>
        <tr>
          <th className="round-left">Company</th>
          <th>Role</th>
          <th>Date applied</th>
          <th>Status</th>
          <th>Posting</th>
          <th className="round-right"></th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app) => (
          <tr key={app.id}>
            <td>
                <div className="company-cell">
                    <span
                    className="company-avatar"
                    style={{ backgroundColor: getAvatarColor(app.company) }}
                    >
                    {app.company.charAt(0).toUpperCase()}
                    </span>
                    <span className="company-name">{app.company}</span>
                </div>
            </td>
            <td>{app.role}</td>
            <td>{formatDate(app.dateApplied)}</td>
            <td><StatusBadge status={app.status} onStatusChange={(newStatus) => onStatusChange(app.id,newStatus)}/></td>
            <td>
              {app.postingUrl ? (
                <a href={app.postingUrl} target="_blank" rel="noopener noreferrer">
                  View ↗
                </a>
              ) : (
                <span className="no-posting">—</span>
              )}
            </td>
            <td>
              <div className="row-actions">
                <button aria-label="Edit application" onClick={() => onEdit(app)}>
                  <Pencil size={16} />
                </button>
                <button aria-label="Delete application" onClick={() => onDelete(app.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

        <div className="applications-cards">
        {applications.map((app) => (
          <div key={app.id} className="application-card">
            <div className="application-card-top">
              <div className="company-cell">
                <span className="company-avatar" style={{ backgroundColor: getAvatarColor(app.company) }}>
                  {app.company.charAt(0).toUpperCase()}
                </span>
                <span className="company-name">{app.company}</span>
              </div>
              <StatusBadge status={app.status} onStatusChange={(newStatus) => onStatusChange(app.id, newStatus)} />
            </div>

            <p className="application-card-role">{app.role}</p>
            <p className="application-card-date">Applied {formatDate(app.dateApplied)}</p>

            <div className="application-card-bottom">
              {app.postingUrl ? (
                <a href={app.postingUrl} target="_blank" rel="noopener noreferrer">
                  View ↗
                </a>
              ) : (
                <span className="no-posting">—</span>
              )}
              <div className="row-actions">
                <button aria-label="Edit application" onClick={() => onEdit(app)}>
                  <Pencil size={16} />
                </button>
                <button aria-label="Delete application" onClick={() => onDelete(app.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApplicationsTable;