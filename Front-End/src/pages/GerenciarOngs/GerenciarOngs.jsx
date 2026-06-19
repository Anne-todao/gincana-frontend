import { useState, useEffect, useCallback } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './GerenciarOngs.module.css';
import Footer from '../../components/Footer/Footer';
import { listarOngs, criarOng, excluirOng } from '../../services/api';

const ongInicial = {
    nome: '',
    categoria: '',
    contato: '',
};

export default function GerenciarOngs() {
    const [form, setForm] = useState({ ...ongInicial });
    const [ongs, setOngs] = useState([]); // Começa vazio, pois os dados vêm do banco

    // Memoriza a função de busca de dados para evitar re-renderizações e erros de loop
    const carregarOngs = useCallback(async () => {
        try {
            const dados = await listarOngs();
            setOngs(dados || []);
        } catch (err) {
            console.error('Erro ao buscar ONGs do servidor:', err);
        }
    }, []);

    // Executa a busca assim que o componente é montado na tela
    useEffect(() => {
        let ativo = true;

        const inicializar = async () => {
            if (ativo) {
                await carregarOngs();
            }
        };

        inicializar();

        return () => {
            ativo = false;
        };
    }, [carregarOngs]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.nome.trim() || !form.categoria.trim() || !form.contato.trim()) {
            alert('Preencha todos os campos da ONG.');
            return;
        }

        const novaOng = {
            nome: form.nome.trim(),
            categoria: form.categoria.trim(),
            contato: form.contato.trim(),
        };

        try {
            // Envia os dados para o back-end
            await criarOng(novaOng);

            // Limpa o formulário e atualiza a tabela imediatamente
            setForm({ ...ongInicial });
            await carregarOngs();
            alert('ONG cadastrada com sucesso!');
        } catch (err) {
            console.error('Erro ao salvar ONG:', err);
            alert(
                err.response?.data?.error || 'Erro ao conectar com o servidor para salvar a ONG.',
            );
        }
    };

    const removerOng = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir esta parceria de ONG?')) return;

        try {
            // Remove do back-end passando o ID correspondente
            await excluirOng(id);
            // Atualiza os dados locais
            await carregarOngs();
        } catch (err) {
            console.error('Erro ao deletar ONG:', err);
            alert('Erro ao deletar a ONG selecionada.');
        }
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
                                    required
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
                                    required
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
                                    required
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
                                    {ongs.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className={styles.noData}
                                                style={{ textAlign: 'center', padding: '15px' }}>
                                                Nenhuma ONG cadastrada no sistema.
                                            </td>
                                        </tr>
                                    ) : (
                                        ongs.map((ong) => (
                                            // 🔄 Atualizado para usar ong.id_ong que vem direto do seu Model (SELECT id_ong...)
                                            <tr key={ong.id_ong} className={styles.row}>
                                                {/* 🔄 Atualizado de ong.nome para ong.nome_ong */}
                                                <td>{ong.nome_ong}</td>
                                                <td>{ong.categoria}</td>
                                                <td>{ong.contato}</td>
                                                <td>
                                                    <button
                                                        className={styles.btnExcluir}
                                                        onClick={() => removerOng(ong.id_ong)}>
                                                        Excluir
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
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
