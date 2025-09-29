import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Produtos from './pages/Produtos';
import Historico from './pages/Historico';
import Perfil from './pages/Perfil';
import LoginPage from './pages/LoginPage';
import Funcionarios from './pages/Funcionarios';

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
        <Route path="/perfil" element={<Perfil />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
