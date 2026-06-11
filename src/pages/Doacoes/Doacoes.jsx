import { useState } from 'react';

function Doacoes() {
  const [turma, setTurma] = useState('');
  const [fraldas, setFraldas] = useState('');

  const Salvar = (e) => {
    e.preventDefault();
    console.log({ turma, fraldas });

  };

  return (
    <form onSubmit={Salvar} >
      <div>
        <label htmlFor="turma">Turma:</label>
        <select 
          id="turma" 
          value={turma} 
          onChange={(e) => setTurma(e.target.value)}
          required
        >
          <option value="" disabled>Selecione uma turma</option>
        </select>
      </div>

      <div>
        <label htmlFor="fraldas">Número de Fraldas:</label>
        <input 
          id="fraldas"
          type="number" 
          value={fraldas} 
          onChange={(e) => setFraldas(e.target.value)}
          placeholder="Ex: 10"
          min="0"
          step="0.1"
          required
        />
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}

export default Doacoes;