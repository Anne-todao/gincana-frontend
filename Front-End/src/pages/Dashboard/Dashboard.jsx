import { useState, useEffect } from 'react';
import { buscarRanking } from '../../services/api';
import styles from './Dashboard.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

export default function Dashboard() {
    const [ranking, setRanking] = useState([]);
    const [arrecadado, setArrecadado] = useState(0);
    const [metaGlobal] = useState(1000);
    const [turmaLider, setTurmaLider] = useState('Nenhuma doação');
    const [carregando, setCarregando] = useState(true);

    const percentualProgresso = metaGlobal > 0 ? Math.min((arrecadado / metaGlobal) * 100, 100) : 0;

    useEffect(() => {
        async function carregarDadosDoDashboard() {
            try {
                setCarregando(true);
                let respostaAPI = await buscarRanking();

                // CRÍTICO 1: Se a API trouxer os dados envelopados (ex: respostaAPI.rows ou respostaAPI.data), nós extraímos o array
                if (respostaAPI && !Array.isArray(respostaAPI)) {
                    respostaAPI =
                        respostaAPI.rows || respostaAPI.data || respostaAPI.resultado || [];
                }

                const dadosValidos = Array.isArray(respostaAPI) ? respostaAPI : [];

                // CRÍTICO 2: Normaliza o objeto para garantir que o JavaScript leia tanto propriedades minúsculas quanto maiúsculas (comum no Postgres/Oracle)
                const dadosNormalizados = dadosValidos.map((item) => ({
                    id_turma: item.id_turma || item.ID_TURMA,
                    nome_curso: item.nome_curso || item.NOME_CURSO,
                    modulo_serie: item.modulo_serie || item.MODULO_SERIE,
                    quantidade: Number(item.quantidade ?? item.QUANTIDADE ?? 0),
                    porcentagem: item.porcentagem || item.PORCENTAGEM || 0,
                    classificacao: item.classificacao || item.CLASSIFICACAO || 1,
                }));

                setRanking(dadosNormalizados);

                if (dadosNormalizados.length > 0) {
                    const totalFraldas = dadosNormalizados.reduce(
                        (acc, equipe) => acc + equipe.quantidade,
                        0,
                    );
                    setArrecadado(totalFraldas);

                    const lider = dadosNormalizados[0];
                    if (lider.quantidade > 0) {
                        setTurmaLider(`${lider.modulo_serie} ${lider.nome_curso}`);
                    } else {
                        setTurmaLider('Nenhuma doação');
                    }
                } else {
                    setTurmaLider('Nenhuma doação');
                }
            } catch (erro) {
                console.error('Ops! Erro ao carregar os dados do painel:', erro);
                setTurmaLider('Erro ao carregar');
            } finally {
                setCarregando(false);
            }
        }
        carregarDadosDoDashboard();
    }, []);

    const obtenerClassePosicao = (index) => {
        if (index === 0) return styles.badgeOuro;
        if (index === 1) return styles.badgePrata;
        if (index === 2) return styles.badgeBronze;
        return styles.badgeNormal;
    };

    return (
        <>
            <div className={styles.dashboardContainer}>
                <Navbar />

                <main className={styles.mainContent}>
                    <header className={styles.header}>
                        <h1 className={styles.pageTitle}>Dashboard Estratégico</h1>
                        <p className={styles.pageSubtitle}>
                            Sistema de acompanhamento em tempo real.
                        </p>
                    </header>

                    <section className={styles.cardsContainer}>
                        <article className={styles.card}>
                            <div className={`${styles.cardIcon} ${styles.iconPink}`}>📦</div>
                            <div className={styles.cardInfo}>
                                <span className={styles.cardLabel}>Pacotes Arrecadados</span>
                                <span className={styles.cardValue}>
                                    {arrecadado} <small>Pacotes</small>
                                </span>
                            </div>
                        </article>

                        <article className={styles.card}>
                            <div className={`${styles.cardIcon} ${styles.iconYellow}`}>🏆</div>
                            <div className={styles.cardInfo}>
                                <span className={styles.cardLabel}>Meta Global</span>
                                <span className={styles.cardValue}>
                                    {metaGlobal} <small>Pacotes</small>
                                </span>
                            </div>
                        </article>

                        <article className={`${styles.card} ${styles.cardGreen}`}>
                            <div className={styles.cardIcon}>🚀</div>
                            <div className={styles.cardInfo}>
                                <span className={styles.cardLabel}>Turma Líder</span>
                                <span className={styles.cardValue}>
                                    {carregando ? 'Carregando...' : turmaLider}
                                </span>
                            </div>
                        </article>
                    </section>

                    <section className={styles.progressSection}>
                        <h2 className={styles.sectionTitle}>Progresso da Gincana</h2>
                        <p className={styles.sectionSubtitle}>
                            Rumo à meta de {metaGlobal} pacotes.
                        </p>
                        <div className={styles.progressBarContainer}>
                            <div
                                className={styles.progressBarFill}
                                style={{ width: `${percentualProgresso}%` }}></div>
                        </div>
                    </section>

                    <section className={styles.rankingSection}>
                        <h3 className={styles.rankingTitle}>
                            <span className={styles.rankingIcon}>📊</span>
                            <span>Ranking Oficial</span>
                        </h3>

                        <div className={styles.tabelaCustomizada}>
                            <div className={styles.cabecalho}>
                                <div className={styles.celulaHeader}>Posição</div>
                                <div className={styles.celulaHeader}>Turma</div>
                                <div className={styles.celulaHeader}>Fraldas (Arrecadadas)</div>
                                <div className={styles.celulaHeader}>Porcentagem Geral</div>
                            </div>

                            <div className={styles.corpoLista}>
                                {carregando ? (
                                    <div className={styles.linhaVazia}>Carregando o ranking...</div>
                                ) : ranking.length > 0 ? (
                                    ranking.map((equipe, index) => (
                                        <div
                                            className={styles.linha}
                                            key={equipe.id_turma || index}>
                                            <div className={styles.celula}>
                                                <span
                                                    className={`${styles.badgePosicao} ${obtenerClassePosicao(index)}`}>
                                                    {equipe.classificacao}º Lugar
                                                </span>
                                            </div>
                                            <div className={styles.celula}>
                                                {equipe.nome_curso
                                                    ? `${equipe.modulo_serie} ${equipe.nome_curso}`
                                                    : 'Turma Sem Nome'}
                                            </div>
                                            <div className={styles.celula}>{equipe.quantidade}</div>
                                            <div className={styles.celula}>
                                                <strong>{equipe.porcentagem}%</strong>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.linhaVazia}>
                                        Nenhuma doação registrada no sistema.
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </>
    );
}
