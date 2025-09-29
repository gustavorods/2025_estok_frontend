import React from "react";
import { Link } from "react-router-dom";
import './SidebarItem.css'

const SidebarItem = ({ icon, label, active, to = "#", onClick }) => {
  return (
    <Link to={to} className={active ? "active" : ""} onClick={onClick}>
      <span className="material-icons-sharp">{icon}</span>
      <h3>{label}</h3>
    </Link>
  );
};

export default SidebarItem;
