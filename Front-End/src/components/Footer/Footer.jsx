import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
           
            <div className={styles.subFooter}>
                <div className={styles.esquerda}>
                    <h2>EDIFÍCIO SEDE FIESP</h2>
                    <p>Av. Paulista, 1313, São Paulo/SP</p>
                    <p>CEP 01311-923</p>
                </div>

                 <div className={styles.direita}>
                <h2>CENTRAL DE RELACIONAMENTO</h2>
                <p>(11) 3322-0050 (Telefone/WhatsApp)</p>
                <p>0800-055-1000 (Interior de SP, somente telefone fixo)</p>
                </div>
            </div> 
            <div className={styles.container}>
                <p>&copy; 2026 Projeto Integrador. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;