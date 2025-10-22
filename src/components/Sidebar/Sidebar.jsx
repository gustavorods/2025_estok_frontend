import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import "./Sidebar.css";


const logout = () => {
  localStorage.removeItem("isLoggedIn");
  navigate("/login");
};


const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Fecha menu ao clicar em overlay ou opção
  const handleClose = () => setOpen(false);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // limpa o login
    navigate("/login"); // redireciona pro login
  };

  return (
    <aside>
      <div className="top">
        <div className="logo">
          <img src="/estok-logo.png" alt="Logo" />
          <h2>ESTOK</h2>
        </div>

        <div className="menu-toggle" onClick={() => setOpen(!open)}>
          <span className="material-icons-sharp">menu</span>
        </div>

        {open && (
          <div
            className="close show"
            onClick={handleClose}
            tabIndex={0}
            role="button"
            aria-label="Fechar menu"
          >
            <span className="material-icons-sharp">close</span>
          </div>
        )}
      </div>

      <div
        className={`sidebar-overlay${open ? " open" : ""}`}
        onClick={handleClose}
      />

      <div className={`sidebar${open ? " open" : ""}`}>
        <SidebarItem
          icon="dashboard"
          label="Dashboard"
          active={location.pathname === "/dashboard"}
          to="/dashboard"
          onClick={handleClose}
        />
        <SidebarItem
          icon="inventory_2"
          label="Produtos"
          active={location.pathname === "/produtos"}
          to="/produtos"
          onClick={handleClose}
        />
        <SidebarItem
          icon="history"
          label="Histórico"
          active={location.pathname === "/historico"}
          to="/historico"
          onClick={handleClose}
        />
        <SidebarItem
          icon="groups"
          label="Funcionários"
          active={location.pathname === "/funcionarios"}
          to="/funcionarios"
          onClick={handleClose}
        />
        <SidebarItem
          icon="settings"
          label="Configurações"
          active={location.pathname === "/perfil"}
          to="/perfil"
          onClick={handleClose}
        />
        <SidebarItem
          icon="help_outline"
          label="Ajuda"
          active={location.pathname === "/ajuda"}
          to="/ajuda"
          onClick={handleClose}
        />
        <SidebarItem
  icon="logout"
  label="Sair"
  active={false}
  to="/"
  onClick={() => {
    handleClose();
    logout();
  }}
/>

      </div>
    </aside>
  );
};

export default Sidebar;
