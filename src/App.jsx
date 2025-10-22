import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Produtos from './pages/Produtos';
import Historico from './pages/Historico';
import Perfil from './pages/Perfil';
import LoginPage from './pages/LoginPage';
import Funcionarios from './pages/Funcionarios';

// Rota privada — só libera se tiver logado
const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas protegidas */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/produtos" 
          element={
            <PrivateRoute>
              <Produtos />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/historico" 
          element={
            <PrivateRoute>
              <Historico />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/funcionarios" 
          element={
            <PrivateRoute>
              <Funcionarios />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/perfil" 
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          } 
        />

        {/* Se for qualquer outra rota, manda pro login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
