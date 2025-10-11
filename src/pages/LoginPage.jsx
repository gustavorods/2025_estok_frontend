import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

 const handleSubmit = (e) => {
  e.preventDefault();
  if (!usuario || !senha) {
    setErro("Preencha usuário e senha.");
    return;
  }

  // Exemplo simples (coloca tuas credenciais fixas ou fakes por enquanto)
  if (usuario === "admin" && senha === "1234") {
    localStorage.setItem("isLoggedIn", "true");
    navigate("/dashboard");
  } else {
    setErro("Usuário ou senha incorretos.");
  }
};


  return (
    <div className="login-bg">
      <div className="login-header">
        <span className="login-logo-box">
          <img src="public/estok-logo.png" alt="Logo Estok" className="login-logo-img" />
        </span>
        <span className="login-app-name">ESTOK</span>
      </div>
      <div className="login-card">
        <h2 className="login-title">Entrar</h2>
        <p className="login-subtitle">É bom te ver novamente!</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="login-input"
            placeholder="Digite seu usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            autoComplete="username"
          />
          <input
            type="password"
            className="login-input"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoComplete="current-password"
          />
          {erro && <div className="login-erro">{erro}</div>}
          <button type="submit" className="login-btn">
            Entrar
          </button>
        </form>
        <a href="#" className="login-link">
          Esqueceu sua senha?
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
