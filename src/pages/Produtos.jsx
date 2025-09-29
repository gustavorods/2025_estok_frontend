import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import "./Produtos.css";

// Mock de produtos
const produtos = [
  {
    id: 1,
    nome: "Leite",
    categoria: "Desnatado",
    marca: "Italac",
    imagem: "../public/Leite.png",
    quantidade: 3,
    vencido: true,
    critico: true,
  },
  {
    id: 2,
    nome: "Água Mineral",
    categoria: "Sem gás",
    marca: "Crystal",
    imagem: "../public/Agua.png",
    quantidade: 8,
    vencido: false,
    critico: true,
  },
  {
    id: 3,
    nome: "Arroz Branco",
    categoria: "Tipo 1",
    marca: "Tio João",
    imagem: "../public/Arroz.png",
    quantidade: 2,
    vencido: true,
    critico: false,
  },
  {
    id: 4,
    nome: "Feijão Carioca",
    categoria: "Tipo 1",
    marca: "Kicaldo",
    imagem: "../public/Feijao.png",
    quantidade: 5,
    vencido: false,
    critico: true,
  },
  {
    id: 5,
    nome: "Iogurte Natural",
    categoria: "Integral",
    marca: "Nestlé",
    imagem: "../public/Leite.png",
    quantidade: 1,
    vencido: true,
    critico: true,
  },
  {
    id: 6,
    nome: "Pão de Forma",
    categoria: "Integral",
    marca: "Wickbold",
    imagem: "../public/Leite.png",
    quantidade: 4,
    vencido: false,
    critico: true,
  },
];

const Produtos = () => {
  return (
    <div className="container">
      <Sidebar />
      <main>
        <h2 className="produtos-title">Produtos</h2>
        <div className="produtos-grid">
          {produtos.map((p) => (
            <div key={p.id} className="produto-card">
              <div className="produto-img-container">
                <img src={p.imagem} alt={p.nome} className="produto-img" />
              </div>
              <div className="produto-info">
                <div className="produto-nome">{p.nome}</div>
                <div className="produto-categoria">Categoria: {p.categoria}</div>
                <div className="produto-marca">Marca: {p.marca}</div>
                <div className="produto-status">
                  {p.vencido && (
                    <span className="produto-status-btn vencido">Produto vencido</span>
                  )}
                  {p.critico && (
                    <span className="produto-status-btn critico">Nível crítico</span>
                  )}
                </div>
              </div>
              <div className="produto-quantidade">{p.quantidade}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Produtos;
