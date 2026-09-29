import { Briefcase, Cloud, Menu } from "lucide-react";
import "./Header.css";

interface HeaderProps {
    onMenuClick: () => void;
}

function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-brand">
        <button className="menu-toggle" onClick={onMenuClick} aria-label="Open menu">
            <Menu size={22} />
        </button>
        <span className="header-logo">
          <Briefcase size={20} />
        </span>
        <span className="header-title">Trackr</span>
      </div>
      <div className="header-right">
        <span className="header-status">
          <Cloud size={18} />
          Saved on this device
        </span>
        <span className="header-avatar">TS</span>
      </div>
    </header>
  );
}

export default Header;