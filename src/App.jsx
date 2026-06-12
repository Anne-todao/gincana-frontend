import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Inicial from './pages/Inicial/Inicial';
import Turmas from './pages/Turmas/Turmas';
import Dashboard from './pages/Dashboard/Dashboard';
import Doacoes from './pages/Doacoes/Doacoes';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';




function App() {
  return (

    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Inicial />} />
        <Route path="/turmas" element={<Turmas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doacoes" element={<Doacoes />} />
        <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
    </BrowserRouter>
  );
}
export default App;
