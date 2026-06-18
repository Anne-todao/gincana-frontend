import Navbar from "../../components/Navbar/Navbar";
import styles from "./Inicial.module.css";
import Carrossel from "../../components/Carrossel/Carrossel";
import Footer from "../../components/Footer/Footer"

import { TbTargetArrow } from "react-icons/tb";
import { FaRegClock } from "react-icons/fa6";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";


export default function Inicial() {
  return (
    <>
     
      <div className={styles.containerHead}>  
        <Navbar />
         <p>Sistema Gincana Solidária (SGS)</p>
         <p className={styles.subtext}>Cada pacote de fralda doado transforma vida.</p>
      </div>
      <div className={styles.layout}>
        <Carrossel />
      </div>

      <div className={styles.body}>

        <div className={styles.Missao}>
         <h1 className={styles.tittleMissao}>
          <TbTargetArrow />
            Missao
          </h1>
          <p className={styles.TextMissao}>
            Organizar uma gincana solidária na qual a participação dos competidores esteja 
            vinculado à doações a ongs, incentivando a solidariedade e o apoio.
          </p>
        </div>


        <div className={styles.Func}>
          <h1 className={styles.Tittlefunc}>
            <FaRegClock />
            Funcionamento
          </h1>
          <ul className={styles.listfunc}>
            <li>Cada atividade ou jogo da gincana possuirá uma pontuação específica.</li>
            <li>Os Participantes poderão aumentar sua pontuação por meioi daa doação de quantidade adicionais de fraldas.</li>
            <li>A pontuação total será composta pelos resultados obtidos nas ativudades e pelas doações realizadas.</li>
          </ul>
        </div>
        
        <div className={styles.dest}>
          <h1 className={styles.TitleDest}>
          <FaHandHoldingHeart />
          Destinação das Doações
          </h1>
          <p className={styles.Textdest}>
            Organizar uma gincana solidária na qual a paticipação dos competidores esteja
            vinculada à doação de uma quantidade de uma unidade por aluno de fraldas,
            incentivando a solidariedade e o apoio.
          </p>
        </div>

        <div className={styles.resp}>
          <h1 className={styles.TittleResp}>
            <FaBox />
              As doações serão recebidas por:
              </h1>
            <ul className={styles.ListResp}>
              <li>Rogério</li>
              <li>Luciana</li>
            </ul>
        </div>

      <div className={styles.Entre}>
        <h1 className={styles.TittleEntre}>
      <TbTruckDelivery />
      Local de Entrega
        </h1>
        <p className={styles.TextEntre}>
          As fraldas deverão ser entregues no SENAI Valinhos
        </p>
      </div>

      </div>

      <Footer />
   
    </>
  );
}