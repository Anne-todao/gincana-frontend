import { useEffect, useState } from 'react';
import { cadastrarTurma, listarTurmas } from '../../services/api';
import BotaoGincana from '../../components/BotaoGincana/BotaoGincana';
import styles from './Turma.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

export default function Turmas() {
    const [turmas, setTurmas] = useState([]);
    const [, setNomeTurma] = useState('');
    const [cursoIdentificacao, setCursoIdentificacao] = useState('');
    const [moduloSerie, setModuloSerie] = useState('');
    const [periodo, setPeriodo] = useState('');

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
                nome_curso: cursoIdentificacao,
                modulo_serie: moduloSerie,
                periodo: periodo,
            });

            setTurmas((turmasAtuais) => [...turmasAtuais, turmaCriada]);

            setNomeTurma('');
            setCursoIdentificacao('');
            setModuloSerie('');
            setPeriodo('');

            alert('Turma cadastrada com sucesso! 🎉');
        } catch (error) {
            alert('Erro ao cadastrar a turma. 😢');
            console.error(error);
        }
    };

    return (
        <>
            <div className={styles.pageBackground}>
                <Navbar />
                <main className={styles.contentContainer}>
                    <div className={styles.headerSection}>
                        <h1 className={styles.title}>Gestão de Turmas</h1>
                        <p className={styles.sectionTag}>PAINEL ADMINISTRATIVO</p>
                    </div>

                    <section className={styles.formSection}>
                        <h2>Cadastrar Nova Turma</h2>
                        <p className={styles.subtext}>
                            Insira os dados abaixo para homologar uma nova equipa na gincana.
                        </p>

                        <form onSubmit={CadastrarTurma} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="cursoIdentificacao">Nome do Curso</label>
                                <input
                                    type="text"
                                    id="cursoIdentificacao"
                                    placeholder="Ex: Desenvolvimento de Sistemas"
                                    value={cursoIdentificacao}
                                    onChange={(e) => setCursoIdentificacao(e.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="moduloSerie">Módulo / Série</label>
                                <input
                                    type="text"
                                    id="moduloSerie"
                                    placeholder="Ex: 3º Ano T DS"
                                    value={moduloSerie}
                                    onChange={(e) => setModuloSerie(e.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="periodo">Período</label>
                                <input
                                    type="text"
                                    id="periodo"
                                    placeholder="Ex: Tarde"
                                    value={periodo}
                                    onChange={(e) => setPeriodo(e.target.value)}
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
                                <p>
                                    Nenhuma turma cadastrada ainda. As turmas aparecem aqui assim
                                    que forem carregadas da API.
                                </p>
                            </div>
                        ) : (
                            <table className={styles.turmasTable}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome do Curso</th>
                                        <th>Módulo / Série</th>
                                        <th>Período</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {turmas.map((turma) => (
                                        <tr key={turma.id_turma}>
                                            <td>
                                                <strong>#{turma.id_turma}</strong>
                                            </td>
                                            <td>{turma.nome_curso}</td>
                                            <td>{turma.modulo_serie}</td>
                                            <td>{turma.periodo}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </section>
                </main>
            </div>
            <Footer />
        </>
    );
}
