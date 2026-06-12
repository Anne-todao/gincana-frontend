import Navbar from "../../components/Navbar/Navbar";
import styles from "./Inicial.module.css";
import Carrossel from "../../components/Carrossel/Carrossel";


export default function Inicial() {
  return (
    <>
     
      <div className={styles.containerHead}>  
        <Navbar />
         <p>Entenda o projeto</p>
      </div>

    
      <div className={styles.layout}>
        <Carrossel />
      </div>

   *     
    </>
  );
}