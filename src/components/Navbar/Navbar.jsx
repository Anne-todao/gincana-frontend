import { Link } from 'react-router-dom';
import style from './Navbar.module.css';

function Navbar () {
  return (
    <nav className={style.navbar}>
      <div className={style.container}>
        
        <h1 className={style['nav-title']}>projeto Integrador</h1>

        <ul className={style['nav-links']}>
          <li><Link className={style['nav-link']} to="/">Home</Link></li>
          <li><Link className={style['nav-link']} to="/turmas">Turmas</Link></li>
          <li><Link className={style['nav-link']} to="/doacoes">Doações</Link></li>
          <li><Link className={style['nav-link']} to="/dashboard">Dashboard</Link></li>
          <li><Link className={style['nav-link']} to="/login">Login</Link></li>
        </ul>

      </div>
    <div className={style.subnavBackground}>
        <div className={style.container2}>
            <span>Gincana</span> 
        </div>
    </div>
    </nav>
  )
}   

export default Navbar;