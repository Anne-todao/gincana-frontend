import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './Configuracoes.module.css';
import Footer from '../../components/Footer/Footer'

export default function Configuracoes() {
    const [meta, setMeta] = useState('1000');
    const [atual, setAtual] = useState('200');
    const [prazo, setPrazo] = useState('31/12/2026');
    const [descricao, setDescricao] = useState('Meta oficial da gincana solidária');

    const metaNumerica = Number(meta) || 1;
    const atualNumerica = Number(atual) || 0;
    const porcentagem = Math.min(100, Math.round((atualNumerica / metaNumerica) * 100));
    const restante = Math.max(0, metaNumerica - atualNumerica);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Meta configurada com sucesso: ${meta} pacotes até ${prazo}`);
    };

    return (
        <>
        <div className={styles.pageContainer}>
            <Navbar />
            <main className={styles.mainContent}>
                <header className={styles.headerPage}>
                    <p className={styles.sectionTag}>CONFIGURAÇÕES</p>
                    <h1>Configuração da Gincana</h1>
                </header>

                <section className={styles.summaryCards}>
                    <div className={styles.card}>
                        <span className={styles.cardLabel}>Meta atual</span>
                        <strong>{meta} pacotes</strong>
                    </div>
                    <div className={styles.card}>
                        <span className={styles.cardLabel}>Progresso</span>
                        <strong>{porcentagem}%</strong>
                    </div>
                    <div className={styles.card}>
                        <span className={styles.cardLabel}>Prazo</span>
                        <strong>{prazo}</strong>
                    </div>
                </section>

                <section className={styles.progressSection}>
                    <div className={styles.progressHeader}>
                        <div>
                            <p className={styles.progressLabel}>Progresso da meta</p>
                            <h3>
                                {atualNumerica} / {metaNumerica} pacotes
                            </h3>
                        </div>
                        <span className={styles.progressPercent}>{porcentagem}%</span>
                    </div>

                    <div className={styles.progressBarContainer}>
                        <div
                            className={styles.progressBarFill}
                            style={{ width: `${porcentagem}%` }}
                        />
                    </div>

                    <div className={styles.progressFooter}>
                        <span>{restante} pacotes restantes</span>
                        <span>{porcentagem >= 100 ? 'Meta atingida!' : 'Em andamento'}</span>
                    </div>
                </section>

                <section className={styles.formSection}>
                    <h2>Estabelecer Meta</h2>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="meta">Quantidade da Meta</label>
                            <input
                                id="meta"
                                type="number"
                                min="1"
                                value={meta}
                                onChange={(e) => setMeta(e.target.value)}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="atual">Pacotes arrecadados</label>
                            <input
                                id="atual"
                                type="number"
                                min="0"
                                value={atual}
                                onChange={(e) => setAtual(e.target.value)}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="prazo">Prazo Final</label>
                            <input
                                id="prazo"
                                type="text"
                                value={prazo}
                                onChange={(e) => setPrazo(e.target.value)}
                            />
                        </div>

                        <div className={styles.inputGroupFull}>
                            <label htmlFor="descricao">Descrição da Meta</label>
                            <textarea
                                id="descricao"
                                rows="4"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                        </div>

                        <button type="submit" className={styles.btnSalvar}>
                            Salvar Configuração
                        </button>
                    </form>
                </section>
            </main>
        </div>
        <Footer />
        </>
    );
}
