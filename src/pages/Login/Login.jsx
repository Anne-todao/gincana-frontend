import styles from './Login.module.css';
import { Link } from 'react-router-dom';

function Login (){
    return (
        <div className={styles.loginContainer}>
            <h1 className={styles.loginTitle}>Login</h1>
            <form className={styles.loginForm}>
               <input type="email" placeholder="Email" className={styles.loginInput} />
               <input type="password" placeholder="Password" className={styles.loginInput} />
                <Link to="/home">
          <button type="button" className={styles.loginButton}>Entrar</button>
        </Link>
            </form>

            <div className={styles.registerLink}>
                <span>Não tem uma conta?</span>
                <a href="/register" className={styles.registerAnchor}>Cadastra-se</a>
            </div>
        </div>
        

    );
}

export default Login;