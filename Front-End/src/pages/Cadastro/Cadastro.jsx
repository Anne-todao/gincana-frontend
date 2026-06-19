import styles from './Cadastro.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { api } from '../../services/api'; // Importando a API configurada

export default function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nome, setNome] = useState('');
    const [turma, setTurma] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validação básica local
        if (!email.trim() || !password.trim() || !nome.trim()) {
            setErro('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        try {
            setErro('');
            setSucesso('');

            // Faz a requisição POST para o back-end na rota /api/usuarios
            // Enviando os dados no corpo que a sua 'userController' espera: nome, email, senha
            const resposta = await api.post('/usuarios', {
                nome: nome.trim(),
                email: email.trim(),
                senha: password,
            });

            if (resposta.status === 201) {
                setSucesso('Cadastro realizado com sucesso! Redirecionando...');

                // Limpa os inputs
                setNome('');
                setEmail('');
                setTurma('');
                setPassword('');

                // Aguarda 2 segundos para o usuário ver a mensagem de sucesso e vai para o login
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (err) {
            console.error('Erro ao cadastrar usuário:', err);
            // Captura o erro vindo da controller (ex: 'E-mail já cadastrado')
            setErro(
                err.response?.data?.error ||
                    err.response?.data?.mensagem ||
                    'Erro ao realizar o cadastro. Tente novamente.',
            );
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
                        <p>Crie sua conta</p>

                        <div className={styles.loginContainer}>
                            <form className={styles.loginForm} onSubmit={handleSubmit}>
                                {erro && (
                                    <p
                                        className={styles.errorMessage}
                                        style={{ color: 'red', fontWeight: 'bold' }}>
                                        {erro}
                                    </p>
                                )}
                                {sucesso && (
                                    <p
                                        className={styles.successMessage}
                                        style={{ color: 'green', fontWeight: 'bold' }}>
                                        {sucesso}
                                    </p>
                                )}

                                <input
                                    type="text"
                                    placeholder="Nome Completo"
                                    className={styles.loginInput}
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                />

                                <input
                                    type="email"
                                    placeholder="Email"
                                    className={styles.loginInput}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder="Turma (Opcional)"
                                    className={styles.loginInput}
                                    value={turma}
                                    onChange={(e) => setTurma(e.target.value)}
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
                                    Cadastrar
                                </button>
                            </form>

                            <div className={styles.registerLink}>
                                <span>Já tem uma conta? </span>
                                <Link to="/login" className={styles.registerAnchor}>
                                    Faça login
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
