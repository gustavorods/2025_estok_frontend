import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import "./Sidebar.css";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Fecha menu ao clicar em overlay ou opção
  const handleClose = () => setOpen(false);

  return (
    <aside>
      <div className="top">
        <div className="logo">
          <img src="/estok-logo.png" alt="Logo" />
          <h2>ESTOK</h2>
        </div>

        {/* Ícone sanduíche (hambúrguer) só em telas pequenas */}
        <div className="menu-toggle" onClick={() => setOpen(!open)}>
          <span className="material-icons-sharp">menu</span>
        </div>

        {/* Botão X (fecha menu em mobile) */}
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

      {/* Overlay para fechar menu ao clicar fora */}
      <div
        className={`sidebar-overlay${open ? " open" : ""}`}
        onClick={handleClose}
      />

      {/* Conteúdo da sidebar */}
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
          active={location.pathname === "/"}
          to="/"
          onClick={handleClose}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
