import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import "./Perfil.css";

const Perfil = () => {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    nome: "Lázaro Ramos",
    genero: "Masculino",
    senha: "********",
    email: "lazaro@gmail.com",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    if (editMode) {
      // Aqui você pode adicionar lógica de salvar
    }
    setEditMode(!editMode);
  };

  return (
    <div className="perfil-container">
      <Sidebar />
      <main className="perfil-main">
        <div className="perfil-card">
          <div className="perfil-foto">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Perfil"
            />
          </div>
          <h2 className="perfil-nome">{form.nome}</h2>
          <form className="perfil-form">
            <div className="perfil-form-col perfil-form-col-esq">
              <label>
                Nome Completo
                <input
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </label>
              <label>
                Gênero
                <select
                  name="genero"
                  value={form.genero}
                  onChange={handleChange}
                  disabled={!editMode}
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
              </label>
            </div>
            <div className="perfil-form-col perfil-form-col-dir">
              <label>
                Senha
                <input
                  type="password"
                  name="senha"
                  value={form.senha}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </label>
            </div>
          </form>
          <button
            className={`perfil-btn ${editMode ? "salvar" : ""}`}
            onClick={handleEdit}
          >
            <span className="perfil-btn-icon">
              {editMode ? (
                <span style={{ fontSize: "1.3em", marginRight: "8px" }}>✔️</span>
              ) : (
                <span className="material-icons-sharp" style={{ fontSize: "1.3em", marginRight: "8px" }}>edit</span>
              )}
            </span>
            {editMode ? "Salvar" : "Editar"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Perfil;
