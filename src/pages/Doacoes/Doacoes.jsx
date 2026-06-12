import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from '../Doacoes/Doacoes.module.css';

function Doacoes() {
  const [turma, setTurma] = useState('');
  const [fraldas, setFraldas] = useState('');
  const [listaDoacoes, setListaDoacoes] = useState([]);

  const Salvar = (e) => {
    e.preventDefault();
    if (!turma) {
      alert('Por favor, selecione a turma!');
      return;
    }
    if (!fraldas) {
      alert('Por favor, insira a quantidade!');
      return;
    }

    const dataAtual = new Date().toLocaleDateString('pt-BR');

    const usuarioLogado = 'Prof Admin'; 

    const novaDoacao = {
      id: Date.now(),
      turma: turma,
      quantidade: parseInt(fraldas, 10),
      validade: dataAtual,       
      responsavel: usuarioLogado 
    };

    setListaDoacoes([...listaDoacoes, novaDoacao]);

    setTurma('');
    setFraldas('');
  };

  const deletarDoacao = (id) => {
    setListaDoacoes(listaDoacoes.filter(doacao => doacao.id !== id));
   };

  return (
    <div className={styles.layout}>
    <div className={styles.dashboardContainer}>
      <Navbar />
      <main className={styles.mainContent}>

        <header className={styles.headerPage}>
          <h2>Gerenciar Doações</h2>
          <h5>Gerencie, crie, remova, e edite doações.</h5>
        </header>

        <section className={styles.cardsContainer}>
          <div className={styles.card}>
            <span className={styles.cardTitle}>Registro Hoje</span>
            <strong className={styles.cardValue}>{listaDoacoes.length}</strong>
            <span className={styles.cardSubtitle}>Doações</span>
          </div>

          <div className={styles.card}>
            <span className={styles.cardTitle}>Total</span>
            <strong className={styles.cardValue}>
              {listaDoacoes.reduce((acc, curr) => acc + curr.quantidade, 0)}
            </strong>
            <span className={styles.cardSubtitle}>Fraldas</span>
          </div>
        </section>

        <section className={styles.formSection}>
          <h3>Registrar Doação</h3>
          
          <form onSubmit={Salvar} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="turma">Turma</label>
              <select 
                id="turma" 
                value={turma} 
                onChange={(e) => setTurma(e.target.value)}
                required
              >
                <option value="" disabled>Selecionar uma turma</option>
                <option value="2TDS">2TDS</option>
                <option value="1TDS">1TDS</option>
                <option value="3TDS">3TDS</option>
              </select>
            </div>      

            <div className={styles.inputGroup}>
              <label htmlFor="fraldas">Quantidade</label>
              <input 
                id="fraldas"
                type="number" 
                value={fraldas} 
                onChange={(e) => setFraldas(e.target.value)}
                placeholder="ex: 45"
                min="1"
                step="1"
                required
              />
            </div>
          </form>
        </section>

        <section className={styles.historicoSection}>

          <div className={styles.historicoHeader}>
            <button className={styles.btnHistorico}>Histórico de Doações</button>
            <button className={styles.btnFiltrar}>Filtrar por turma...</button>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.tabela}>
              <thead>
                <tr>
                  <th>Turma</th>
                  <th>Quantidade</th>
                  <th>Validade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {listaDoacoes.length === 0 ? (
                  <tr>
                    <td colSpan="4" className={styles.noData}>Nenhuma doação registrada ainda.</td>
                  </tr>
                ) : (
                  listaDoacoes.map((item) => (
                    <tr key={item.id} className={styles.row}>
                      <td>{item.turma}</td>
                      <td>{item.quantidade}</td>
                      <td>{item.validade}</td> 
                      <td>
                        <div className={styles.acoesCell}>
                          <span>{item.responsavel}</span>
                          <button 
                            className={styles.btnExcluir} 
                            onClick={() => deletarDoacao(item.id)}
                          >
                            EXCLUIR
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </section>

        <button type="submit" onClick={Salvar} className={styles.btnSalvar}>Salvar</button>

      </main>
    </div>
    </div>
  );
}

export default Doacoes;