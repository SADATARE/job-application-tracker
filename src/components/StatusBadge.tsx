import "./StatusBadge.css";
import type { Status } from "../types/JobApplication";

interface StatusBadgeProps {
  status: Status;
  onStatusChange: (newStatus: string) => void;
}

const statusOptions: Status[] = ["Applied", "Interview", "Offer", "Rejected"];

function StatusBadge({ status, onStatusChange }: StatusBadgeProps) {
  return (
    <select
      className={`status-badge status-${status.toLowerCase()}`}
      value={status}
      onChange={(e) => onStatusChange(e.target.value)}
    >
      {statusOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default StatusBadge;