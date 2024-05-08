import React from 'react';
import styles from './homefooter.module.css';
import logoPreto from '../../assets/imgs/logo-preto.png';

export default function HomeFooter() {
  return (
    <footer id='contato' className={styles.footer}>
      <div className={styles.footerMiniBox}>
        <picture>
          <img src={logoPreto} alt="Logo da Clínica Harmonia" />
          <h1>Clínica Harmonia</h1>
        </picture>
        <ul>
          <li>
            <a target="_blank" href="entrar">Agendar</a>
          </li>
          <li>
            <a href="#especialidades">Especialidades</a>
          </li>
          <li>
            <a href="#sobrenos">Sobre nós</a>
          </li>
          <li>
            <a target="_blank" href="entrar">Politica de Privacidade</a>
          </li>
          <li>
            <a target="_blank" href="entrar">Politica de Cookies</a>
          </li>
        </ul>
      </div>
      <div>
        <picture>
          <img src={logoPreto} alt="Logo da Clínica Harmonia" />
          <h1>Entre em contato</h1>
        </picture>
        <div className={styles.contato}>
          <p>
            <i className="fa fa-envelope" aria-hidden="true" />
            {' '}
            kauafabriiciio@gmail.com
          </p>
          <p>
            <i className="fa fa-mobile" aria-hidden="true" />
            {' '}
            (81) 9 9951-7869
          </p>
          <a target="_blank" rel="noreferrer" href="https://github.com/kauafabricio">GitHub</a>
        </div>

      </div>

      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63216.38616232279!2d-34.91322792637757!3d-7.996444260343014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab17fa77c07f29%3A0x78d856ff05dd791!2sOlinda%2C%20PE!5e0!3m2!1spt-BR!2sbr!4v1713726949327!5m2!1spt-BR!2sbr" width="350" height="250" title="Localização da clínica harmonia, Olinda-PE" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    </footer>
  );
}
