import styles from './BotaoGincana.module.css';

// Passamos { texto, tipo } como argumentos (Desestruturação de Props)
function BotaoGincana({ texto, tipo = 'button' }) {
  return (
    <button 
      type={tipo} 
      className={styles.botaoGincana}
    >
      {texto}
    </button>
  );
}

export default BotaoGincana;