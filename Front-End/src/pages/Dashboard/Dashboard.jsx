import { useState, useEffect } from 'react';
import { buscarRanking } from '../../services/api'; 
import styles from './Dashboard.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

export default function Dashboard() {
    const [ranking, setRanking] = useState([]);
    const [arrecadado, setArrecadado] = useState(0);
    const [metaGlobal] = useState(1000); 
    const [turmaLider, setTurmaLider] = useState('Carregando...');

    const percentualProgresso = metaGlobal > 0 ? Math.min((arrecadado / metaGlobal) * 100, 100) : 0;

    useEffect(() => {
        async function carregarDadosDoDashboard() {
            try {
                const rankingCarregado = await buscarRanking();
                setRanking(rankingCarregado);

                if (rankingCarregado && rankingCarregado.length > 0) {
                    const totalFraldas = rankingCarregado.reduce((acc, equipe) => acc + (equipe.fraldas || 0), 0);
                    setArrecadado(totalFraldas);
                    setTurmaLider(rankingCarregado[0].turma || 'Nenhuma');
                }
            } catch (erro) {
                console.error('Ops! Erro ao carregar os dados do painel:', erro);
            }
        }
        carregarDadosDoDashboard();
    }, []);

    const obterClassePosicao = (index) => {
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
                    <p className={styles.pageSubtitle}>Sistema de acompanhamento em tempo real.</p>
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
                            <span className={styles.cardValue}>{turmaLider}</span>
                        </div>
                    </article>
                </section>

                <section className={styles.progressSection}>
                    <h2 className={styles.sectionTitle}>Progresso da Gincana</h2>
                    <p className={styles.sectionSubtitle}>Rumo à meta de {metaGlobal} pacotes.</p>
                    <div className={styles.progressBarContainer}>
                        <div
                            className={styles.progressBarFill}
                            style={{ width: `${percentualProgresso}%` }}
                        ></div>
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
                            <div className={styles.celulaHeader}>Fraldas (PC)</div>
                            <div className={styles.celulaHeader}>Total de Pontos</div>
                            <div className={styles.celulaHeader}>Pts Jogos</div>
                            <div className={styles.celulaHeader}>Pts Fraldas</div>
                        </div>

                        <div className={styles.corpoLista}>
                            {ranking.length > 0 ? (
                                ranking.map((equipe, index) => (
                                    <div className={styles.linha} key={equipe.id || index}>
                                        <div className={styles.celula}>
                                            <span className={`${styles.badgePosicao} ${obterClassePosicao(index)}`}>
                                                {index + 1}º Lugar
                                            </span>
                                        </div>
                                        <div className={styles.celula}>
                                            {equipe.turma || 'Turma Sem Nome'}
                                        </div>
                                        <div className={styles.celula}>{equipe.fraldas || 0}</div>
                                        <div className={styles.celula}>
                                            <strong>{equipe.totalPontos || 0}</strong>
                                        </div>
                                        <div className={styles.celula}>{equipe.ptsJogos || 0}</div>
                                        <div className={styles.celula}>
                                            {equipe.ptsFraldas || 0}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className={styles.linhaVazia}>Carregando o ranking...</div>
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