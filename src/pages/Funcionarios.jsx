import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import "./Funcionarios.css";

const STORAGE_KEY = "estok_funcionarios";

const Funcionarios = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [opcoesModal, setOpcoesModal] = useState({ open: false, idx: null });
  const [modalView, setModalView] = useState("menu");
  const [editUsuario, setEditUsuario] = useState("");
  const [editSenha, setEditSenha] = useState("");

  // Carregar do localStorage ao montar
  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      setFuncionarios(JSON.parse(data));
    }
  }, []);

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(funcionarios));
  }, [funcionarios]);

  // Abrir modal de opções do card
  const handleOpenOpcoes = (idx) => {
    setOpcoesModal({ open: true, idx });
    setModalView("menu");
    setEditUsuario(funcionarios[idx]?.usuario || "");
    setEditSenha(funcionarios[idx]?.senha || "");
  };

  // Adicionar novo funcionário com campos vazios
  const handleAdicionarFuncionario = () => {
    setFuncionarios([...funcionarios, { usuario: "", senha: "" }]);
  };

  // Salvar edição de funcionário
  const handleSalvarAlteracao = (e) => {
    e.preventDefault();
    if (!editUsuario || !editSenha) return;
    setFuncionarios(
      funcionarios.map((f, i) =>
        i === opcoesModal.idx ? { usuario: editUsuario, senha: editSenha } : f
      )
    );
    setOpcoesModal({ open: false, idx: null });
  };

  // Excluir funcionário
  const handleExcluir = () => {
    setFuncionarios(funcionarios.filter((_, i) => i !== opcoesModal.idx));
    setOpcoesModal({ open: false, idx: null });
  };

  // Fechar modal de opções
  const closeOpcoesModal = () => {
    setOpcoesModal({ open: false, idx: null });
    setModalView("menu");
  };

  return (
    <div className="container">
      <Sidebar />
      <main className="func-main">
        <div className="func-header">
          <h2>Funcionários</h2>
          <button
            className="func-add-btn"
            onClick={handleAdicionarFuncionario}
          >
            <span className="material-icons-sharp">person_add</span>
            Adicionar Funcionário
          </button>
        </div>

        <div className="func-cards">
          {funcionarios.map((f, idx) => (
            <div className="func-card" key={idx}>
              <div className="func-nome">
                <label
                  style={{
                    fontWeight: 500,
                    color: "#7d8da1",
                    fontSize: "0.98rem",
                  }}
                >
                  Usuário
                </label>
                <input
                  className="func-input"
                  type="text"
                  value={f.usuario}
                  readOnly
                  style={{
                    marginBottom: "0.7rem",
                    background: "#f6f6f9",
                    cursor: "not-allowed",
                  }}
                  placeholder="Usuário"
                />
                <label
                  style={{
                    fontWeight: 500,
                    color: "#7d8da1",
                    fontSize: "0.98rem",
                  }}
                >
                  Senha
                </label>
                <input
                  className="func-input"
                  type="text"
                  value={f.senha}
                  readOnly
                  style={{
                    background: "#f6f6f9",
                    cursor: "not-allowed",
                  }}
                  placeholder="Senha"
                />
              </div>
              <button
                className="func-opcoes-btn"
                onClick={() => handleOpenOpcoes(idx)}
                title="Opções"
              >
                <span className="material-icons-sharp">more_vert</span>
              </button>
            </div>
          ))}
          {funcionarios.length === 0 && (
            <div className="func-empty">Nenhum funcionário cadastrado.</div>
          )}
        </div>

        {/* Modal de opções do card */}
        {opcoesModal.open && (
          <div className="func-modal-overlay" onClick={closeOpcoesModal}>
            <div
              className="func-modal func-modal-opcoes"
              onClick={(e) => e.stopPropagation()}
            >
              {modalView === "menu" && (
                <>
                  <h3>Opções</h3>
                  <div className="func-modal-btns-col">
                    <button
                      className="func-btn visualizar"
                      onClick={() => setModalView("visualizar")}
                    >
                      Visualizar
                    </button>
                    <button
                      className="func-btn alterar"
                      onClick={() => setModalView("alterar")}
                    >
                      Alterar
                    </button>
                    <button
                      className="func-btn excluir"
                      onClick={() => setModalView("excluir")}
                    >
                      Excluir
                    </button>
                    <button
                      className="func-btn fechar"
                      onClick={closeOpcoesModal}
                    >
                      Fechar
                    </button>
                  </div>
                </>
              )}

              {modalView === "visualizar" && (
                <>
                  <h3>Dados do Funcionário</h3>
                  <div className="func-view">
                    <div>
                      <strong>Usuário:</strong>{" "}
                      {funcionarios[opcoesModal.idx]?.usuario}
                    </div>
                    <div>
                      <strong>Senha:</strong>{" "}
                      {funcionarios[opcoesModal.idx]?.senha}
                    </div>
                  </div>
                  <div className="func-modal-btns-col">
                    <button
                      className="func-btn fechar"
                      onClick={() => setModalView("menu")}
                    >
                      Voltar
                    </button>
                  </div>
                </>
              )}

              {modalView === "alterar" && (
                <>
                  <h3>Alterar Funcionário</h3>
                  <form onSubmit={handleSalvarAlteracao}>
                    <input
                      type="text"
                      value={editUsuario}
                      onChange={(e) => setEditUsuario(e.target.value)}
                      className="func-input"
                      placeholder="Usuário"
                      autoFocus
                    />
                    <input
                      type="text"
                      value={editSenha}
                      onChange={(e) => setEditSenha(e.target.value)}
                      className="func-input"
                      placeholder="Senha"
                    />
                    <div className="func-modal-btns-col">
                      <button type="submit" className="func-btn salvar">
                        Salvar
                      </button>
                      <button
                        type="button"
                        className="func-btn fechar"
                        onClick={() => setModalView("menu")}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </>
              )}

              {modalView === "excluir" && (
                <>
                  <h3>Excluir Funcionário</h3>
                  <div className="func-view">
                    Tem certeza que deseja excluir{" "}
                    <strong>{funcionarios[opcoesModal.idx]?.usuario}</strong>?
                  </div>
                  <div className="func-modal-btns-col">
                    <button
                      className="func-btn excluir"
                      onClick={handleExcluir}
                    >
                      Confirmar
                    </button>
                    <button
                      className="func-btn fechar"
                      onClick={() => setModalView("menu")}
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Funcionarios;
