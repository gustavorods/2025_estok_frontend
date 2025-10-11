import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import "./Historico.css";

// Mock de dados
const historicoMock = [
  {
    id: 1,
    nome: "Leite",
    tipo: "Bebida",
    marca: "Italac",
    validade: "2024-09-10",
    status: "saida",
    horario: "08:15:23",
    imagem: "../public/Leite.png",
    quantidade: 5,
  },
  {
    id: 2,
    nome: "Arroz Branco",
    tipo: "Grão",
    marca: "Tio João",
    validade: "2025-01-15",
    status: "entrada",
    horario: "09:30:12",
    imagem: "../public/Arroz.png",
    quantidade: 12,
  },
  {
    id: 3,
    nome: "Feijão Carioca",
    tipo: "Grão",
    marca: "Kicaldo",
    validade: "2024-12-01",
    status: "saida",
    horario: "10:05:44",
    imagem: "../public/Feijao.png",
    quantidade: 3,
  },
  {
    id: 4,
    nome: "Água Mineral",
    tipo: "Bebida",
    marca: "Crystal",
    validade: "2026-03-20",
    status: "entrada",
    horario: "11:20:05",
    imagem: "../public/Agua.png",
    quantidade: 20,
  },
  {
    id: 5,
    nome: "Iogurte Natural",
    tipo: "Laticínio",
    marca: "Nestlé",
    validade: "2024-07-22",
    status: "saida",
    horario: "12:10:55",
    imagem: "../public/Leite.png",
    quantidade: 2,
  },
  {
    id: 6,
    nome: "Pão de Forma",
    tipo: "Padaria",
    marca: "Wickbold",
    validade: "2024-06-30",
    status: "entrada",
    horario: "13:45:37",
    imagem: "../public/Leite.png",
    quantidade: 8,
  },
];

const PAGE_SIZE = 4;

const Historico = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("recentes");
  const [modalItem, setModalItem] = useState(null);

  // Filtro
  const filtered = historicoMock.filter(
    (item) =>
      item.nome.toLowerCase().includes(search.toLowerCase()) ||
      item.tipo.toLowerCase().includes(search.toLowerCase()) ||
      item.marca.toLowerCase().includes(search.toLowerCase()) ||
      item.validade.includes(search) ||
      item.status.toLowerCase().includes(search.toLowerCase()) ||
      item.horario.includes(search)
  );

  // Ordenação
  const sorted = [...filtered].sort((a, b) => {
    if (order === "recentes") return b.id - a.id;
    return a.id - b.id;
  });

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const pageData = sorted.slice(startIdx, endIdx);

  useEffect(() => {
    setPage(1);
  }, [search, order]);

  function formatValidade(dataStr) {
    if (!dataStr) return "";
    const [ano, mes, dia] = dataStr.split("-");
    return `${dia}-${mes}-${ano}`;
  }

  return (
    <div className="container">
      <Sidebar />
      <main>
        <div className="historico-header">
          <h2 className="historico-title">Histórico de Movimentações</h2>
          <div className="historico-actions">
            <input
              type="text"
              className="historico-search"
              placeholder="Buscar informações"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="historico-order"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="recentes">Mais recentes</option>
              <option value="antigos">Mais antigos</option>
            </select>
          </div>
        </div>

        <div className="historico-table-container">
          <table className="historico-table">
            <thead>
              <tr>
                <th className="produto-col">Produto</th>
                <th className="tipo-col hide-mobile">Tipo</th>
                <th className="marca-col hide-mobile">Marca</th>
                <th className="validade-col hide-mobile">Validade</th>
                <th className="quantidade-col">Qtde</th>
                <th className="status-col">Status</th>
                <th className="horario-col hide-mobile">Horário</th>
                <th className="detalhes-col show-mobile">Detalhes</th>
              </tr>
            </thead>

            <tbody>
              {pageData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="historico-empty">
                    Nenhum registro encontrado.
                  </td>
                </tr>
              ) : (
                pageData.map((item) => (
                  <tr key={item.id}>
                    <td className="produto-cell">
                      <div className="produto-cell-content">
                        <img
                          src={item.imagem}
                          alt={item.nome}
                          className="produto-miniatura"
                        />
                        <span className="produto-nome">{item.nome}</span>
                      </div>
                    </td>
                    <td className="tipo-cell hide-mobile">{item.tipo}</td>
                    <td className="marca-cell hide-mobile">{item.marca}</td>
                    <td className="validade-cell hide-mobile">
                      {formatValidade(item.validade)}
                    </td>
                    <td className="quantidade-cell">
                      <span className="quantidade-destaque">{item.quantidade}</span>
                    </td>
                    <td className="status-cell">
                      <span
                        className={`historico-arrow-icon ${
                          item.status === "saida" ? "saida" : "entrada"
                        }`}
                        title={item.status === "saida" ? "Saída" : "Entrada"}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.3rem",
                          fontSize: "1.5rem",
                          verticalAlign: "middle",
                        }}
                      >
                        <span className="material-icons-sharp">
                          {item.status === "saida"
                            ? "arrow_outward"
                            : "arrow_downward"}
                        </span>
                        <span style={{ fontSize: "1rem", fontWeight: 600 }}>
                          {item.status === "saida" ? "Saída" : "Entrada"}
                        </span>
                      </span>
                    </td>
                    <td className="horario-cell hide-mobile">{item.horario}</td>

                    {/* Botão de detalhes no mobile */}
                    <td className="detalhes-cell show-mobile">
                      <button
                        className="detalhes-btn"
                        onClick={() => setModalItem(item)}
                      >
                        <span className="material-icons-sharp">info</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="historico-pagination">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                className={`historico-page-btn${
                  page === idx + 1 ? " active" : ""
                }`}
                onClick={() => setPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* ===== Modal ===== */}
      {modalItem && (
        <div className="modal-overlay" onClick={() => setModalItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Detalhes do Produto</h3>
            <img
              src={modalItem.imagem}
              alt={modalItem.nome}
              className="modal-imagem"
            />
            <p><strong>Tipo:</strong> {modalItem.tipo}</p>
             <p><strong>Horário:</strong> {modalItem.horario}</p>
            <p><strong>Marca:</strong> {modalItem.marca}</p>
            <p><strong>Validade:</strong> {formatValidade(modalItem.validade)}</p>
            <button className="modal-fechar" onClick={() => setModalItem(null)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Historico;
