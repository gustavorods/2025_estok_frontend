import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Card from "../Card/Card";
import Footer from "../Footer";
import {
  HistoricoPrateleiraCard,
  MovimentoSkeleton,
  DemoHistorico,
} from "../HistoricoPrateleiraCard";
import ProdutosModal from "./ProdutosModal";
import "./Dashboard.css";

// Mock de produtos
const reposicao = [
  { id: 1, nome: "Leite Integral", categoria: "Bebidas", marca: "Italac" },
  { id: 2, nome: "Água Mineral", categoria: "Bebidas", marca: "Crystal" },
  { id: 3, nome: "Arroz Branco", categoria: "Grãos", marca: "Tio João" },
];

const criticos = [
  { id: 1, nome: "Feijão Carioca", categoria: "Grãos", marca: "Kicaldo" },
  { id: 2, nome: "Óleo de Soja", categoria: "Óleos", marca: "Liza" },
];

const vencidos = [
  {
    id: 1,
    nome: "Iogurte Natural",
    categoria: "Laticínios",
    marca: "Nestlé",
    validade: "10/06/2024",
  },
  {
    id: 2,
    nome: "Pão de Forma",
    categoria: "Padaria",
    marca: "Wickbold",
    validade: "09/06/2024",
  },
];

const modalTitles = {
  reposicao: "Produtos precisando de reposição",
  criticos: "Produtos com nível crítico de estoque",
  vencidos: "Produtos próximos do vencimento",
};

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(null);

  let modalProdutos = [];
  if (modalOpen === "reposicao") modalProdutos = reposicao;
  if (modalOpen === "criticos") modalProdutos = criticos;
  if (modalOpen === "vencidos") modalProdutos = vencidos;

  return (
    <>
      <div className="container">
        <Sidebar />
        <main>
          <h2>Dashboard</h2>
          <div className="insights">
            <Card
              icon="two_pager_store"
              value="12"
              title="Produtos precisando de reposição"
              buttonLabel="Ver produtos"
              className="reposicao"
              onButtonClick={() => setModalOpen("reposicao")}
            />
            <Card
              icon="two_pager_store"
              value="08"
              title="Produtos com nível crítico de estoque"
              buttonLabel="Ver produtos"
              className="atencao"
              onButtonClick={() => setModalOpen("criticos")}
            />
            <Card
              icon="two_pager_store"
              value="05"
              title="Produtos próximos do vencimento"
              buttonLabel="Ver validade"
              className="vencimento"
              onButtonClick={() => setModalOpen("vencidos")}
            />
          </div>
          <div className="mt-8 historico-margin-top">
            <h2 className="mb-4 font-bold text-lg">
              Histórico de Movimentações
            </h2>
            <HistoricoPrateleiraCard movimentos={DemoHistorico} />
          </div>
          
        </main>
        
      </div>
      <Footer></Footer>
      <ProdutosModal
        open={!!modalOpen}
        onClose={() => setModalOpen(null)}
        title={modalTitles[modalOpen]}
        produtos={modalProdutos}
        tipo={modalOpen}
      />
    </>
  );
};

export default Dashboard;

