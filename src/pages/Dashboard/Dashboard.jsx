
import styles from './Dashboard.module.css';
import Navbar from '../../components/Navbar/Navbar';

export default function Dashboard() {
    return (
        <div>
             <Navbar />
        <div className={styles.container}>
           
            <h1>Dashboard da Gincana</h1>

            <section>
                <h2>Progresso da Meta de Doações</h2>
                <p>Arrecadado: R$ 2.500,00 de R$ 5.000,00 (50%)</p>

                <div className={styles.barraFundo}>
                    <div className={styles.barraProgresso} style={{ width: '50%' }}>
                        50%
                    </div>
                </div>
            </section>

            <br />

            <section>
                <h2>Ranking das Turmas</h2>

                <table className={styles.tabela}>
                    <thead>
                        <tr>
                            <th>Posição</th>
                            <th>Turma</th>
                            <th>Pontuação</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1º</td>
                            <td>1TDS - "Desenvolvimento de Sistemas"</td>
                            <td>1.500 pts</td>
                        </tr>
                        <tr>
                            <td>2º</td>
                            <td>2TDS - "Desenvolvimento de Sistemas"</td>
                            <td>1.250 pts</td>
                        </tr>
                        <tr>
                            <td>3º</td>
                            <td>3TDS - "Desenvolvimento de Sistemas"</td>
                            <td>980 pts</td>
                        </tr>
                        <tr>
                            <td>4º</td>
                            <td>4TDS - "Desenvolvimento de Sistemas"</td>
                            <td>800 pts</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
        </div>
    );
}
