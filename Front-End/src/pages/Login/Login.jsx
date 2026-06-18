import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { api } from '../../services/api';

export default function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email.trim() || !password.trim()) {
            setErro('Por favor, preencha todos os campos antes de entrar.');
            return;
        }

        try {
            setErro('');

            // Faz a requisição de login enviando as credenciais para o back-end
            const resposta = await api.post('/usuarios/login', { email, senha: password });

            // Salva os dados do usuário (incluindo o id_usuario real) no localStorage
            localStorage.setItem('usuarioLogado', JSON.stringify(resposta.data));

            navigate('/');
        } catch (err) {
            console.error('Erro ao fazer login:', err);
            setErro(err.response?.data?.mensagem || 'E-mail ou senha incorretos.');
        }
    };

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.leftPanel}>
                    <div className={styles.senaiBadge}>SENAI</div>

                    <div className={styles.leftContent}>
                        <h1>Gincana Solidária</h1>
                        <h2>2026</h2>
                    </div>

                    <div className={styles.desc}>
                        <p>
                            CADA PACOTE DE FRAUDA DOADA TRASNFORMA VIDAS. ACOMPANHE EM TEMPO REAL O
                            PROGRESSO DA SUA TURMA E AJUDE A ALCANÇAR A META!
                        </p>
                    </div>
                </div>

                <div className={styles.rightPanel}>
                    <div className={styles.loginBox}>
                        <h1>BEM-VINDO</h1>
                        <p>Acesse sua conta</p>

                        <div className={styles.loginContainer}>
                            <form className={styles.loginForm} onSubmit={handleSubmit}>
                                {erro && (
                                    <p className={styles.errorMessage} style={{ color: 'red' }}>
                                        {erro}
                                    </p>
                                )}

                                <input
                                    type="email"
                                    placeholder="Email"
                                    className={styles.loginInput}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <input
                                    type="password"
                                    placeholder="Senha"
                                    className={styles.loginInput}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <button type="submit" className={styles.loginButton}>
                                    Entrar
                                </button>
                            </form>

                            <div className={styles.registerLink}>
                                <span>Não tem uma conta? </span>
                                <Link to="/cadastro" className={styles.registerAnchor}>
                                    Cadastre-se
                                </Link>
                                <br />
                            </div>

                            <div className={styles.spanFin}>
                                <span>Apenas para coordenadores</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
