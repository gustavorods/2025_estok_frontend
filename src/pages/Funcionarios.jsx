import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import "./Funcionarios.css";
import Footer from "../components/Footer";

const STORAGE_KEY = "estok_funcionarios";
const API_URL = "https://two025-estok-backend.onrender.com/api/estok/employee/create-employee";
// coloque sua chave em .env como REACT_APP_API_KEY ou substitua abaixo
const API_KEY = import.meta.env.VITE_AUTH_KEY;

const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
const passwordChecks = (pwd) => ({
  length: pwd.length >= 8,
  upper: /[A-Z]/.test(pwd),
  lower: /[a-z]/.test(pwd),
  number: /[0-9]/.test(pwd),
  special: /[^A-Za-z0-9]/.test(pwd),
});

const Funcionarios = () => {
  const [funcionarios, setFuncionarios] = useState([]);

  // estados apenas para adicionar
  const [modalNovoOpen, setModalNovoOpen] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [novoGenero, setNovoGenero] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novoSenha, setNovoSenha] = useState("");
  const [erroNovo, setErroNovo] = useState("");

  // estados de requisição
  const [novoLoading, setNovoLoading] = useState(false);
  const [novoStatusMsg, setNovoStatusMsg] = useState("");
  const [novoStatusOk, setNovoStatusOk] = useState(null); // null = nada, true = sucesso, false = erro

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) setFuncionarios(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(funcionarios));
  }, [funcionarios]);

  const handleAbrirNovo = () => {
    setNovoNome("");
    setNovoGenero("");
    setNovoEmail("");
    setNovoSenha("");
    setErroNovo("");
    setNovoStatusMsg("");
    setNovoStatusOk(null);
    setModalNovoOpen(true);
  };

  const handleAdicionarFuncionario = async (e) => {
    e.preventDefault();
    setErroNovo("");
    setNovoStatusMsg("");
    setNovoStatusOk(null);

    if (!novoNome || !novoGenero || !novoEmail || !novoSenha) {
      setErroNovo("Preencha todos os campos.");
      return;
    }
    if (!validateEmail(novoEmail)) {
      setErroNovo("Informe um e-mail válido.");
      return;
    }
    const checks = passwordChecks(novoSenha);
    if (!checks.length || !checks.upper || !checks.lower || !checks.number || !checks.special) {
      setErroNovo("A senha não atende aos requisitos obrigatórios.");
      return;
    }

    const payload = {
      name: novoNome,
      email: novoEmail,
      gender_name: novoGenero,
      password: novoSenha,
    };

    setNovoLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify(payload),
      });

      const ct = res.headers.get("content-type") || "";
      const body = ct.includes("application/json") ? await res.json() : await res.text();

      if (res.ok) {
        // sucesso: adiciona localmente e mostra mensagem verde
        setFuncionarios((prev) => [
          ...prev,
          { usuario: novoNome, genero: novoGenero, email: novoEmail, senha: novoSenha },
        ]);
        setNovoStatusOk(true);
        setNovoStatusMsg(
          typeof body === "string" ? body || "Funcionário criado com sucesso." : body.message || "Funcionário criado com sucesso."
        );
        // limpa campos
        setNovoNome("");
        setNovoGenero("");
        setNovoEmail("");
        setNovoSenha("");
      } else {
        // erro: mostra mensagem vermelha com o erro retornado (se houver)
        setNovoStatusOk(false);
        const msg = (body && (body.error || body.message)) || (typeof body === "string" ? body : `Erro ${res.status}`);
        setNovoStatusMsg(msg);
      }
    } catch (err) {
      setNovoStatusOk(false);
      setNovoStatusMsg(err.message || "Erro de rede. Tente novamente.");
    } finally {
      setNovoLoading(false);
    }
  };

  const checksForNovo = passwordChecks(novoSenha);
  const overlayClickNovo = () => { if (!novoLoading) setModalNovoOpen(false); };

  return (
    <div className="container">
      <Sidebar />
      <main className="func-main">
        <div className="func-header">
          <h2>Funcionários</h2>
          <button className="func-add-btn" onClick={handleAbrirNovo}>
            <span className="material-icons-sharp">person_add</span>
            Adicionar Funcionário
          </button>
        </div>

        <div className="func-cards">
          {funcionarios.map((f, idx) => (
            <div className="func-card" key={idx}>
              <div className="func-nome">
                <label style={{ fontWeight: 500, color: "#7d8da1", fontSize: "0.98rem" }}>Usuário</label>
                <input className="func-input" type="text" value={f.usuario} readOnly style={{ marginBottom: "0.7rem", background: "#f6f6f9" }} />

                <label style={{ fontWeight: 500, color: "#7d8da1", fontSize: "0.98rem" }}>Gênero</label>
                <input className="func-input" type="text" value={f.genero || ""} readOnly style={{ marginBottom: "0.7rem", background: "#f6f6f9" }} />

                <label style={{ fontWeight: 500, color: "#7d8da1", fontSize: "0.98rem" }}>E-mail</label>
                <input className="func-input" type="text" value={f.email || ""} readOnly style={{ marginBottom: "0.7rem", background: "#f6f6f9" }} />

                <label style={{ fontWeight: 500, color: "#7d8da1", fontSize: "0.98rem" }}>Senha</label>
                <input className="func-input" type="password" value={f.senha} readOnly style={{ background: "#f6f6f9" }} />
              </div>
            </div>
          ))}

          {funcionarios.length === 0 && <div className="func-empty">Nenhum funcionário cadastrado.</div>}
        </div>

        {modalNovoOpen && (
          <div className="func-modal-overlay" onClick={overlayClickNovo}>
            <div className="func-modal" onClick={(e) => e.stopPropagation()}>
              <h3>Novo Funcionário</h3>
              <form onSubmit={handleAdicionarFuncionario}>
                <label style={{ width: "100%", marginBottom: "0.5rem" }}>
                  Nome
                  <input type="text" className="func-input" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} placeholder="Nome do funcionário" autoFocus disabled={novoLoading} />
                </label>

                <label style={{ width: "100%", marginBottom: "0.5rem" }}>
                  Gênero
                  <select className="func-input" value={novoGenero} onChange={(e) => setNovoGenero(e.target.value)} disabled={novoLoading}>
                    <option value="">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                  </select>
                </label>

                <label style={{ width: "100%", marginBottom: "0.5rem" }}>
                  E-mail
                  <input type="email" className="func-input" value={novoEmail} onChange={(e) => setNovoEmail(e.target.value)} placeholder="email@exemplo.com" disabled={novoLoading} />
                </label>

                <label style={{ width: "100%", marginBottom: "0.25rem" }}>
                  Senha
                  <input type="password" className="func-input" value={novoSenha} onChange={(e) => setNovoSenha(e.target.value)} placeholder="Senha" disabled={novoLoading} />
                </label>

                <div style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                  <div style={{ marginBottom: "0.25rem", color: checksForNovo.length ? "#2b8a3e" : "#666" }}>• 8 caracteres ou mais</div>
                  <div style={{ marginBottom: "0.25rem", color: checksForNovo.upper && checksForNovo.lower ? "#2b8a3e" : "#666" }}>• Letra maiúscula e minúscula</div>
                  <div style={{ marginBottom: "0.25rem", color: checksForNovo.special ? "#2b8a3e" : "#666" }}>• Caractere especial</div>
                  <div style={{ marginBottom: "0.25rem", color: checksForNovo.number ? "#2b8a3e" : "#666" }}>• Número</div>
                </div>

                {erroNovo && <div className="func-erro">{erroNovo}</div>}

                {novoStatusOk !== null && (
                  <div style={{
                    padding: "0.5rem",
                    borderRadius: "6px",
                    marginBottom: "0.5rem",
                    color: novoStatusOk ? "#155724" : "#721c24",
                    background: novoStatusOk ? "#d4edda" : "#f8d7da",
                    border: novoStatusOk ? "1px solid #c3e6cb" : "1px solid #f5c6cb",
                  }}>
                    {novoStatusMsg}
                    {!novoStatusOk && <div style={{ marginTop: "0.25rem", fontSize: "0.85rem" }}>Tente novamente.</div>}
                  </div>
                )}

                <div className="func-modal-btns">
                  <button type="submit" className="func-btn salvar" disabled={novoLoading}>
                    {novoLoading ? "Enviando..." : "Adicionar"}
                  </button>
                  <button type="button" className="func-btn fechar" onClick={() => !novoLoading && setModalNovoOpen(false)} disabled={novoLoading}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
};

export default Funcionarios;
