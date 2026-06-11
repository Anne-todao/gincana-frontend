import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Turmas from './pages/Turmas/Turmas';
import Dashboard from './pages/Dashboard/Dashboard';
import Doacoes from './pages/Doacoes/Doacoes';




function App() {
  return (
    <BrowserRouter>
      <main style={{minHeight: '80vh', padding: '20px', backgroundColor: '#e6e6e6'}}>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/turmas" element={<Turmas />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doacoes" element={<Doacoes />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
export default App;
