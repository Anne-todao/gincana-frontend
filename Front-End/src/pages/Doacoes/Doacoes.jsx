import { useState, useEffect, useCallback } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from '../Doacoes/Doacoes.module.css';
import Footer from '../../components/Footer/Footer';
import { listarTurmas, listarDoacoes, criarDoacao, excluirDoacao } from '../../services/api';

function Doacoes() {
    const [idTurma, setIdTurma] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [listaDoacoes, setListaDoacoes] = useState([]);
    const [turmasCadastradas, setTurmasCadastradas] = useState([]);

    const carregarDados = useCallback(async () => {
        try {
            const [turmasData, doacoesData] = await Promise.all([listarTurmas(), listarDoacoes()]);
            setTurmasCadastradas(turmasData || []);
            setListaDoacoes(doacoesData || []);
        } catch (err) {
            console.error('Erro ao buscar dados do servidor:', err);
        }
    }, []);

    useEffect(() => {
        let ativo = true;

        const inicializar = async () => {
            if (ativo) {
                await carregarDados();
            }
        };

        inicializar();

        return () => {
            ativo = false;
        };
    }, [carregarDados]);

    const Salvar = async (e) => {
        e.preventDefault();

        if (!idTurma) {
            alert('Por favor, selecione a turma!');
            return;
        }
        if (!quantidade || Number(quantidade) <= 0) {
            alert('Por favor, insira uma quantidade válida!');
            return;
        }

        // 🔍 Busca direta e segura do ID do usuário logado
        const usuarioData = localStorage.getItem('usuarioLogado');
        const usuarioObj = usuarioData ? JSON.parse(usuarioData) : null;
        const idUsuarioLogado = usuarioObj?.id_usuario || usuarioObj?.id || usuarioObj?.usuario?.id;

        const novaDoacao = {
            id_turma: Number(idTurma),
            id_usuario: Number(idUsuarioLogado),
            quantidade: Number(quantidade),
        };

        try {
            await criarDoacao(novaDoacao);
            setIdTurma('');
            setQuantidade('');
            await carregarDados();
            alert('Doação registrada com sucesso!');
        } catch (err) {
            console.error('Erro ao salvar doação:', err);
            alert(
                err.response?.data?.error ||
                    'Erro ao salvar doação. Verifique a conexão ou os dados enviados.',
            );
        }
    };
    const deletarDoacao = async (id_doacoes) => {
        if (!window.confirm('Tem certeza que deseja excluir esta doação?')) return;

        try {
            await excluirDoacao(id_doacoes);
            await carregarDados();
            alert('Doação excluída com sucesso!');
        } catch (err) {
            console.error('Erro ao deletar doação:', err);
            alert('Erro ao deletar doação.');
        }
    };

    return (
        <>
            <div className={styles.dashboardContainer}>
                <Navbar />
                <main className={styles.mainContent}>
                    <header className={styles.headerPage}>
                        <h2 className={styles.pageTitle}>Gerenciar Doações</h2>
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
                                {listaDoacoes.reduce(
                                    (acc, curr) => acc + Number(curr.quantidade || 0),
                                    0,
                                )}
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
                                    value={idTurma}
                                    onChange={(e) => setIdTurma(e.target.value)}
                                    required>
                                    <option value="" disabled>
                                        Selecionar uma turma
                                    </option>
                                    {turmasCadastradas.map((t) => (
                                        <option key={t.id_turma} value={t.id_turma}>
                                            {t.modulo_serie} {t.nome_curso} ({t.periodo})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="fraldas">Quantidade</label>
                                <input
                                    id="fraldas"
                                    type="number"
                                    value={quantidade}
                                    onChange={(e) => setQuantidade(e.target.value)}
                                    placeholder="ex: 45"
                                    min="1"
                                    step="1"
                                    required
                                />
                            </div>

                            <button type="submit" className={styles.btnSalvar}>
                                Salvar
                            </button>
                        </form>
                    </section>

                    <section className={styles.historicoSection}>
                        <div className={styles.historicoHeader}>
                            <button className={styles.btnHistorico}>Histórico de Doações</button>
                        </div>

                        <div className={styles.tableWrapper}>
                            <table className={styles.tabela}>
                                <thead>
                                    <tr>
                                        <th>Turma</th>
                                        <th>Quantidade</th>
                                        <th>Data Registro</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaDoacoes.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className={styles.noData}
                                                style={{ textAlign: 'center', padding: '15px' }}>
                                                Nenhuma doação registrada ainda.
                                            </td>
                                        </tr>
                                    ) : (
                                        listaDoacoes.map((item, index) => {
                                            let classePosicao = styles.rowCinza;
                                            if (index === 0) classePosicao = styles.rowPrimeiro;
                                            if (index === 1) classePosicao = styles.rowSegundo;
                                            if (index === 2) classePosicao = styles.rowTerceiro;

                                            const dataFormatada = item.data_registro
                                                ? new Date(item.data_registro).toLocaleDateString(
                                                      'pt-BR',
                                                  )
                                                : item.criado_em
                                                  ? new Date(item.criado_em).toLocaleDateString(
                                                        'pt-BR',
                                                    )
                                                  : '---';

                                            return (
                                                <tr
                                                    key={item.id_doacoes || index}
                                                    className={`${styles.row} ${classePosicao}`}>
                                                    <td>
                                                        {item.nome_curso
                                                            ? `${item.modulo_serie} ${item.nome_curso}`
                                                            : `ID Turma: ${item.id_turma}`}
                                                    </td>
                                                    <td>{item.quantidade}</td>
                                                    <td>{dataFormatada}</td>
                                                    <td>
                                                        <div className={styles.acoesCell}>
                                                            <button
                                                                className={styles.btnExcluir}
                                                                onClick={() =>
                                                                    deletarDoacao(item.id_doacoes)
                                                                }>
                                                                EXCLUIR
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
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

export default Doacoes;
