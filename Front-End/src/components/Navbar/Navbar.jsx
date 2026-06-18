import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Navbar.module.css';

function Navbar () {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      
      <button className={style.menuButton} onClick={toggleMenu}>
        {isOpen ? '✕' : '☰'} 
      </button>

      <nav className={`${style.navbar} ${isOpen ? style.open : ''}`}>
        <div className={style.container}>
          <h1 className={style['nav-title']}>Projeto Integrador</h1>

          <ul className={style['nav-links']}>
            <li><Link className={style['nav-link']} to="/" onClick={toggleMenu}>Início</Link></li>
            <li><Link className={style['nav-link']} to="/turmas" onClick={toggleMenu}>Turmas</Link></li>
            <li><Link className={style['nav-link']} to="/doacoes" onClick={toggleMenu}>Doações</Link></li>
            <li><Link className={style['nav-link']} to="/dashboard" onClick={toggleMenu}>Dashboard</Link></li>
            <li><Link className={style['nav-link']} to="/login" onClick={toggleMenu}>Login</Link></li>
            <li><Link className={style['nav-link']} to="/gerenciarOngs" onClick={toggleMenu}>Gerenciar</Link></li>
            <li><Link className={style['nav-link']} to="/sobreNos" onClick={toggleMenu}>Sobre Nós</Link></li>
            <li><Link className={style['nav-link']} to="/configuracoes" onClick={toggleMenu}>Configurações</Link></li>

          </ul>
        </div>

        <div className={style.subnavBackground}>
          <div className={style.container2}>
              <span>Gincana 2026</span> 
          </div>
        </div>
      </nav>


      {isOpen && <div className={style.overlay} onClick={toggleMenu}></div>}
    </>
  )
}   

export default Navbar;