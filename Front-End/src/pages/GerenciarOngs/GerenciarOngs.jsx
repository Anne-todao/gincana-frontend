import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './GerenciarOngs.module.css';
import Footer from '../../components/Footer/Footer';

const ongInicial = {
    nome: '',
    categoria: '',
    contato: '',
};

export default function GerenciarOngs() {
    const [form, setForm] = useState({ ...ongInicial });
    const [ongs, setOngs] = useState([
        {
            id: 1,
            nome: 'Casa da Esperança',
            categoria: 'Assistência Social',
            contato: '(11) 99999-0001',
        },
        {
            id: 2,
            nome: 'Projeto Vida Nova',
            categoria: 'Educação',
            contato: '(11) 99999-0002',
        },
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.nome.trim() || !form.categoria.trim() || !form.contato.trim()) {
            alert('Preencha todos os campos da ONG.');
            return;
        }

        const novaOng = {
            id: Date.now(),
            nome: form.nome.trim(),
            categoria: form.categoria.trim(),
            contato: form.contato.trim(),
        };

        setOngs((prev) => [novaOng, ...prev]);
        setForm({ ...ongInicial });
    };

    const removerOng = (id) => {
        setOngs((prev) => prev.filter((ong) => ong.id !== id));
    };

    return (
        <>
        <div className={styles.dashboardContainer}>
            <Navbar />
            <main className={styles.mainContent}>
                <header className={styles.headerPage}>
                    <h2>Gerenciar ONGs</h2>
                    <h5>Cadastre, consulte e organize as parcerias da gincana.</h5>
                </header>

                <section className={styles.cardsContainer}>
                    <div className={styles.card}>
                        <span className={styles.cardTitle}>Total de ONGs</span>
                        <strong className={styles.cardValue}>{ongs.length}</strong>
                        <span className={styles.cardSubtitle}>Cadastradas</span>
                    </div>

                  
                </section>

                <section className={styles.formSection}>
                    <h3>Cadastrar ONG</h3>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="nome">Nome da ONG</label>
                            <input
                                id="nome"
                                name="nome"
                                type="text"
                                placeholder="Ex: ONG Esperança"
                                value={form.nome}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="categoria">Categoria</label>
                            <input
                                id="categoria"
                                name="categoria"
                                type="text"
                                placeholder="Ex: Assistência Social"
                                value={form.categoria}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="contato">Contato</label>
                            <input
                                id="contato"
                                name="contato"
                                type="text"
                                placeholder="Ex: (11) 98888-7777"
                                value={form.contato}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className={styles.btnSalvar}>
                            Salvar ONG
                        </button>
                    </form>
                </section>

                <section className={styles.historicoSection}>
                    <div className={styles.historicoHeader}>
                        <button className={styles.btnHistorico}>Lista de ONGs</button>
                    </div>

                    <div className={styles.tableWrapper}>
                        <table className={styles.tabela}>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Categoria</th>
                                    <th>Contato</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ongs.map((ong) => (
                                    <tr key={ong.id} className={styles.row}>
                                        <td>{ong.nome}</td>
                                        <td>{ong.categoria}</td>
                                        <td>{ong.contato}</td>
                                        <td>
                                            <button
                                                className={styles.btnExcluir}
                                                onClick={() => removerOng(ong.id)}>
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
        <Footer />
        </>
    );
}