import Navbar from '../../components/Navbar/Navbar';
import styles from './SobreNos.module.css';
import Footer from '../../components/Footer/Footer';

export default function SobreNos() {
    return (
        <>
        <div className={styles.pageContainer}>
            <Navbar />
            <main className={styles.mainContent}>
                <section className={styles.heroSection}>
                    <div>
                        <p className={styles.sectionTag}>SOBRE NÓS</p>
                        <h1>Quem somos</h1>
                        <p className={styles.description}>
                            A Gincana Solidária é um projeto criado para unir estudantes,
                            professores e comunidade em torno de uma causa importante: transformar
                            doações em impacto real para quem mais precisa.
                        </p>
                    </div>
                </section>

                <section className={styles.infoGrid}>
                    <article className={styles.card}>
                        <h3>Nossa missão</h3>
                        <p>
                            Incentivar a participação coletiva, fortalecer o senso de
                            responsabilidade social e ampliar o alcance das ações beneficentes.
                        </p>
                    </article>

                    <article className={styles.card}>
                        <h3>Como atuamos</h3>
                        <p>
                            Organizamos campanhas, registramos doações e acompanhamos o progresso em
                            tempo real para que todos possam acompanhar o impacto gerado.
                        </p>
                    </article>

                    <article className={styles.card}>
                        <h3>Por que participar</h3>
                        <p>
                            Cada contribuição, por menor que seja, ajuda a transformar vidas e
                            mostra que a solidariedade pode ser uma força poderosa de mudança.
                        </p>
                    </article>
                </section>
            </main>
        </div>
        <Footer />
        </>
    );
}