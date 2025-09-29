import React from "react";
import "./ProdutosModal.css";

const ProdutosModal = ({ open, onClose, title, produtos = [], tipo }) => {
  if (!open) return null;

  return (
    <div className="produtos-modal-overlay">
      <div className="produtos-modal">
        <button className="produtos-modal-close" onClick={onClose}>
          ×
        </button>
        <h2 className="produtos-modal-title">{title}</h2>
        <div className="produtos-modal-list">
          {produtos.length === 0 ? (
            <div className="produtos-modal-empty">Nenhum produto encontrado.</div>
          ) : (
            produtos.map((p) => (
              <div key={p.id} className="produtos-modal-card">
                <div className="produtos-modal-nome">{p.nome}</div>
                <div className="produtos-modal-info">
                  <span>{p.categoria}</span> &middot; <span>{p.marca}</span>
                  {tipo === "vencidos" && p.validade && (
                    <>
                      &nbsp;|&nbsp;
                      <span className="produtos-modal-validade">
                        Validade: {p.validade}
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProdutosModal;
