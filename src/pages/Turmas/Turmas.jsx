import { useState } from 'react';
import BotaoGincana from '../../components/BotaoGincana/BotaoGincana';
import styles from './Turma.module.css';

function Turmas() {
  const [turmas, setTurmas] = useState([]);
  const [nomeTurma, setNomeTurma] = useState('');
  const [cursoIdentificacao, setCursoIdentificacao] = useState('');

  const CadastrarTurma = (e) => {
    e.preventDefault();

    const novaTurma = {
      id: Math.floor(Math.random() * 900) + 100,
      nome: nomeTurma,
      curso: cursoIdentificacao
    };
    setTurmas([...turmas, novaTurma]);
    setNomeTurma('');
    setCursoIdentificacao('');
  };

  return (
    <div className={styles.pageBackground}>
      
      <main className={styles.contentContainer}>
        <div className={styles.headerSection}>
          <p className={styles.sectionTag}>PAINEL ADMINISTRATIVO</p>
          <h1 className={styles.title}>Gestão de Turmas</h1>
        </div>


        <section className={styles.formSection}>
          <h2>Cadastrar Nova Turma</h2>
          <p className={styles.subtext}>Insira os dados abaixo para homologar uma nova equipa na gincana.</p>
          
          <form onSubmit={CadastrarTurma} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="nomeTurma">Nome da Turma</label>
              <input 
                type="text" 
                id="nomeTurma" 
                placeholder="Ex: 3º Ano T DS" 
                value={nomeTurma}
                onChange={(e) => setNomeTurma(e.target.value)}
                required 
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="cursoIdentificacao">Curso / Identificação</label>
              <input 
                type="text" 
                id="cursoIdentificacao" 
                placeholder="Ex: Desenvolvimento de Sistemas" 
                value={cursoIdentificacao}
                onChange={(e) => setCursoIdentificacao(e.target.value)}
                required 
              />
            </div>

            <div className={styles.buttonWrapper}>
              <BotaoGincana texto="Salvar Turma" tipo="submit" />
            </div>
          </form>
        </section>

       
        <section className={styles.tableSection}>
            <h2>Turmas Ativas na Gincana</h2>
            {turmas.length === 0 ? (
            <div className={styles.emptyState}>
                <p>Nenhuma turma cadastrada ainda. O cliente verá as turmas aqui assim que preencher o formulário acima!</p>
            </div>
        ) : (
            <table className={styles.turmasTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome da Turma</th>
                        <th>Curso / Período</th>
                    </tr>
                </thead>
                    <tbody>
                        {turmas.map((turma) => (
                        <tr key={turma.id}>
                            <td><strong>#{turma.id}</strong></td>
                            <td>{turma.nome}</td>
                            <td>{turma.curso}</td>
                        </tr>
                        ))}
                    </tbody>
            </table>
            )}
                </section>
            </main>
            </div>
        );
    }

export default Turmas;