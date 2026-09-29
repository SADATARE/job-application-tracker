import { Plus, Sparkles } from "lucide-react";
import "./EmptyState.css";

interface EmptyStateProps {
  onAddClick: () => void;
  onLoadSample: () => void;
}

function EmptyState({ onAddClick, onLoadSample }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-illustration" aria-hidden="true">
        <div className="empty-card-back" />
        <div className="empty-card-front">
          <span className="empty-bar" />
          <span className="empty-bar empty-bar-gray" />
          <span className="empty-bar" />
        </div>
        <span className="empty-badge empty-badge-plus">
          <Plus size={22} />
        </span>
        <span className="empty-badge empty-badge-spark">
          <Sparkles size={18} />
        </span>
      </div>

      <h3 className="empty-title">Ready when you are.</h3>
      <p className="empty-text">
        Add your first application to begin tracking opportunities, interviews, and offers in one
        calm, focused place.
      </p>

      <button type="button" className="add-button" onClick={onAddClick}>
        <Plus size={18} />
        Add your first application
      </button>
      <p className="empty-hint">Takes less than a minute</p>
        <button type="button" className="load-sample-button" onClick={onLoadSample}>
         Or load sample data to explore
         </button>
    </div>
  );
}

export default EmptyState;