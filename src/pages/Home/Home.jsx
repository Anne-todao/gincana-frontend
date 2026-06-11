import styles from "./Home.module.css";
import { Link } from 'react-router-dom';


export default function App() {
  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.senaiBadge}>SENAI</div>

        <div className={styles.leftContent}>
          <h1>Gincana Solidária</h1>
          <h2>2026</h2>
        </div>
      </div>

      {/* Lado direito */}
      <div className={styles.rightPanel}>
        <div className={styles.loginBox}>
          <h1>BEM-VINDO</h1>
          <p>Acesse sua conta</p>

          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Senha" />

          <Link to="/">
          <button type="button" className={styles.loginButton}>Entrar</button>
        </Link>

          <div className={styles.quickAccess}>
            <h3>Acesso rápido</h3>

            <button className={styles.quickBtn}>Professor</button>
            <button className={styles.quickBtn}>Aluno</button>
          </div>
        </div>
      </div>
    </div>
  );
}