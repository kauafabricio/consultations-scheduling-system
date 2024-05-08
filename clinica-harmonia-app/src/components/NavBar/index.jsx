import React, { useState } from 'react';
import styles from './navbar.module.css';
import logoBranco from '../../assets/imgs/logo-branco.png';
import logoPreto from '../../assets/imgs/logo-preto.png';

function NavBar() {

  const [navBar, setNavBar] = useState(styles.nav)
  const [navLogo, setNavLogo] = useState(logoBranco)

  window.addEventListener('scroll', () => {
    const positionScroll = window.scrollY;

    if (positionScroll > 5) {
      setNavBar(`${styles.nav} ${styles.navRefresh}`)
      setNavLogo(logoPreto)
    } else {
      setNavBar(styles.nav)
      setNavLogo(logoBranco)
    }
  });

  return (
    <nav className={navBar}>
      <div>
        <picture>
          <img src={navLogo} alt="Logo da Clínica Harmonia é um símbolo de árvore preta minimalista com fundo branco" />
        </picture>
      </div>
      <ul>
        <li>
          <a href="#sobrenos">Sobre nós</a>
        </li>
        <li>
          <a href="#contato">Contato</a>
        </li>
        <a target='_blank' href="/entrar">Agendar</a>

      </ul>

    </nav>
  );
}

export default NavBar;
