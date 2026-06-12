import { useState, useEffect } from 'react';
import styles from './Carrossel.module.css';
import image from '../../image/image.png';
import image1 from '../../image/image1.png';
import image2 from '../../image/image2.png';
import image3 from '../../image/image3.png';

const IMAGENS_CARROSSEL = [
  {
    id: 1,
    url:image,
    titulo: 'Gincana Solidária 2026',
    descricao: 'Ajude quem precisa.'
  },
  {
    id: 2,
    url: image1,
    titulo: 'Acompanhe as Turmas',
    description: 'Veja o progresso em tempo real no nosso dashboard.'
  },
  {
    id: 3,
    url: image2,
    titulo: 'Faça sua parte',
    descricao: 'Cada doação conta para transformar vidas.'
  },
  {
    id: 4,
    url: image3,
    titulo: 'Sua vez de agir.',
    descricao: 'Comece a ajudar hoje!'
  }
];

export default function Carrossel() {
  const [slideAtual, setSlideAtual] = useState(0);

  const proximoSlide = () => {
    setSlideAtual((prev) => (prev === IMAGENS_CARROSSEL.length - 1 ? 0 : prev + 1));
  };


  const slideAnterior = () => {
    setSlideAtual((prev) => (prev === 0 ? IMAGENS_CARROSSEL.length - 1 : prev - 1));
  };

  useEffect(() => {
    const intervalo = setInterval(proximoSlide, 4000);
    return () => clearInterval(intervalo); 
  }, [slideAtual]);

  return (
    <div className={styles.carrosselContainer}>

      <div 
        className={styles.carrosselTrack}
        style={{ transform: `translateX(-${slideAtual * 100}%)` }}
      >
        {IMAGENS_CARROSSEL.map((imagem) => (
          <div key={imagem.id} className={styles.slide}>
            <img src={imagem.url} alt={imagem.titulo} className={styles.imagem} />
            
   
            <div className={styles.legenda}>
              <h3>{imagem.titulo}</h3>
              <p>{imagem.descricao || imagem.description}</p>
            </div>
          </div>
        ))}
      </div>


      <button className={`${styles.botaoSetas} ${styles.setaEsquerda}`} onClick={slideAnterior}>
        &#10094;
      </button>
      <button className={`${styles.botaoSetas} ${styles.setaDireita}`} onClick={proximoSlide}>
        &#10095;
      </button>

      <div className={styles.indicadoresContainer}>
        {IMAGENS_CARROSSEL.map((_, index) => (
          <button
            key={index}
            className={`${styles.bolinha} ${slideAtual === index ? styles.bolinhaAtiva : ''}`}
            onClick={() => setSlideAtual(index)}
            aria-label={`Ir para o slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}