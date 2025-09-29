import React from "react";
import "./HistoricoPrateleiraCard.css";

// Skeleton loader para os cards
export const MovimentoSkeleton = () => (
  <div className="historico-card movimento-skeleton">
    <div className="historico-img-skeleton" />
    <div className="historico-info-skeleton">
      <div className="historico-line-skeleton short" />
      <div className="historico-line-skeleton medium" />
      <div className="historico-line-skeleton long" />
    </div>
    <div className="historico-arrow-skeleton" />
  </div>
);

// Card de histórico de prateleira
export const HistoricoPrateleiraCard = ({ movimentos }) => {
  if (!movimentos || movimentos.length === 0) {
    return (
      <div className="historico-card historico-card-empty">
        Nenhuma movimentação encontrada
      </div>
    );
  }

  return (
    <div className="historico-scroll-container">
      <div className="historico-list">
        {movimentos.map((mov) => {
          const isSaida = mov.tipo === "saida";
          return (
            <div key={mov.id} className="historico-card">
              <img
                src={mov.imagem}
                alt={mov.produto}
                className="historico-img"
              />
              <div className="historico-info">
                <span className="historico-produto">{mov.produto}</span>
                <span className="historico-categoria-marca">
                  {mov.categoria} &middot; {mov.marca}
                </span>
              </div>
              <div className="historico-arrow">
                <span
                  className={`material-icons-sharp historico-arrow-icon ${
                    isSaida ? "saida" : "entrada"
                  }`}
                >
                  {isSaida ? "arrow_downward" : "arrow_upward"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Mock de dados para demonstração
export const DemoHistorico = [
  {
    id: 1,
    produto: "Leite Integral",
    categoria: "Bebidas",
    marca: "Italac",
    tipo: "saida",
    imagem: "../public/Leite.png",
  },
  {
    id: 2,
    produto: "Água Mineral",
    categoria: "Bebidas",
    marca: "Crystal",
    tipo: "entrada",
    imagem: "../public/Agua.png",
  },
  {
    id: 3,
    produto: "Arroz Branco",
    categoria: "Grãos",
    marca: "Tio João",
    tipo: "saida",
    imagem: "../public/Arroz.png",
  },
  {
    id: 4,
    produto: "Feijão Carioca",
    categoria: "Grãos",
    marca: "Kicaldo",
    tipo: "entrada",
    imagem: "../public/Feijao.png",
  },
  {
    id: 5,
    produto: "Leite Integral",
    categoria: "Bebidas",
    marca: "Italac",
    tipo: "saida",
    imagem: "../public/Leite.png",
  },
];


