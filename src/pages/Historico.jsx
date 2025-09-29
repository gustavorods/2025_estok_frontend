import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import "./Historico.css";

// Novo mock com campos separados
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

  // Filtragem atualizada para os novos campos
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

  // Atualiza página ao buscar/ordenar
  React.useEffect(() => {
    setPage(1);
  }, [search, order]);

  // Função para formatar data para dd-mm-yyyy
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
              placeholder="Buscar produto, tipo, marca, validade, status ou horário..."
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
                <th className="tipo-col">Tipo</th>
                <th className="marca-col">Marca</th>
                <th className="validade-col">Validade</th>
                <th className="quantidade-col">Qtde</th>
                <th className="status-col">Status</th>
                <th className="horario-col">Horário</th>
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="historico-empty"
                  >
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
                    <td className="tipo-cell">{item.tipo}</td>
                    <td className="marca-cell">{item.marca}</td>
                    <td className="validade-cell">
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
                    <td className="horario-cell">{item.horario}</td>
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
    </div>
  );
};

export default Historico;