import { useEffect, useState } from 'react';
import { cadastrarTurma, listarTurmas } from '../../services/api';
import BotaoGincana from '../../components/BotaoGincana/BotaoGincana';
import styles from './Turma.module.css';
import Navbar from '../../components/Navbar/Navbar';

export default function Turmas() {
  const [turmas, setTurmas] = useState([]);
  const [nomeTurma, setNomeTurma] = useState('');
  const [cursoIdentificacao, setCursoIdentificacao] = useState('');

  useEffect(() => {
    const carregarTurmas = async () => {
      try {
        const turmasCadastradas = await listarTurmas();
        setTurmas(turmasCadastradas);
      } catch (error) {
        console.error('Erro ao carregar as turmas:', error);
      }
    };

    carregarTurmas();
  }, []);

const CadastrarTurma = async (e) => {
    e.preventDefault();

    try {
      const turmaCriada = await cadastrarTurma({
        nome: nomeTurma,
        curso: cursoIdentificacao
      });

      setTurmas((turmasAtuais) => [...turmasAtuais, turmaCriada]);
      
      setNomeTurma('');
      setCursoIdentificacao('');

      alert('Turma cadastrada com sucesso! 🎉');
      
    } catch (error) {
      alert('Erro ao cadastrar a turma. 😢');
      console.error(error);
    }
  };

  return (
    <div className={styles.pageBackground}>
      <Navbar />
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
              <p>Nenhuma turma cadastrada ainda. As turmas aparecem aqui assim que forem carregadas da API.</p>
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

