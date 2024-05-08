import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from './login.module.css';
import env from '../../env.js';

export default function Login() {
  useEffect(() => {
    document.title = 'Clínica Harmonia | Entrar';
  }, []);

  // GET PAGE //

  useEffect(() => {
    const fetchData = async () => {
      const token = await Cookies.get('token');
      const tokenAdmin = await Cookies.get('tokenAdmin');
      if (token) {
        try {
          const response = await axios.get(`${env.urlServer}/entrar`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200 && response.data.tokenValid) {
            window.location.href = `${env.urlFront}/painel`;
          }
          if (response.data.tokenInvalid) {
            Cookies.remove('token');
          }
        } catch (err) {
          window.alert(err.response.data.error);
        }
      } else if (tokenAdmin) {
        try {
          const response = await axios.get(`${env.urlServer}/entrar`, {
            headers: {
              Authorization: `BearerAdmin ${tokenAdmin}`,
            },
          });
          if (response.status === 200 && response.data.tokenAdminValid) {
            window.location.href = `${env.urlFront}/admin`;
          }
          if (response.data.tokenAdminInvalid) {
            Cookies.remove('tokenAdmin');
          }
        } catch (err) {
          window.alert(err.response.data.error);
        }
      }
    };

    fetchData();
  }, []);

  function showModal(msg) {
    setModalClasses(styles.modal);
    setMsgError(msg);
  }

  function closeModal() {
    setModalClasses(styles.Off);
    setMsgError('');
  }
  
  // Login & Register Animation //

  const [mainClasses, setMainClasses] = useState(`${styles.container} ${styles.containerBackground}`);

  const registerClicked = () => {
    setMainClasses(`${styles.container} ${styles.containerBackground} ${styles.registerController}`);
  };

  const loginClicked = () => {
    setMainClasses(`${styles.container} ${styles.containerBackground} ${styles.loginController}`);
  };

  // Form Code Login //

  const [loginCpf, setLoginCpf] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [msgError, setMsgError] = useState('');
  const [modalClasses, setModalClasses] = useState(styles.Off);

  async function sendFormLogin(event) {
    event.preventDefault();
    const formData = `loginCpf=${loginCpf}&loginPassword=${loginPassword}`;

    try {
      const response = await axios.post(`${env.urlServer}/entrar`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.data) {
        if (response.data.token) {
          await Cookies.set('token', response.data.token, { expires: 1 / 24 });
          window.location.href = `${env.urlFront}/painel`;
        } else if (response.data.tokenAdmin) {
          await Cookies.set('tokenAdmin', response.data.tokenAdmin, { expires: 10 / 24 });
          window.location.href = `${env.urlFront}/admin`;
        }
      }
    } catch (err) {
      showModal(err.response.data.error);
    }
  }

  // Form Register Login //

  const [registerName, setRegisterName] = useState('');
  const [registerCpf, setRegisterCpf] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerRepeatPassword, setRegisterRepeatPassword] = useState('');

  async function sendFormRegister(event) {
    event.preventDefault();
    const formData = `registerName=${registerName}&registerCpf=${registerCpf}&registerPassword=${registerPassword}&registerRepeatPassword=${registerRepeatPassword}`;

    try {
      const response = await axios.post(`${env.urlServer}/entrar`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.data) {
        showModal(response.data.success);
        setRegisterName('');
        setRegisterCpf('');
        setRegisterPassword('');
        setRegisterRepeatPassword('');
      }
    } catch (err) {
      showModal(err.response.data.error);
    }
  }

  return (
    <main className={mainClasses}>

      {/* POP-UP */}

      <div className={modalClasses}>
        <div>
          <p>{msgError}</p>
          <button title="Clique aqui para fechar o modal" onClick={closeModal}>Fechar</button>
        </div>
      </div>

      {/* LOGIN CONTAINER */}

      <div className={`${styles.loginContainer} ${styles.containerContent}`}>

        <div className={styles.darkColumn}>
          <h1>Criar uma conta</h1>
          <p>Você ainda não é registrado? Clique no botão abaixo para criar uma conta.</p>
          <button title="Clique aqui para preencher o formulário de cadastro de conta" className={`${styles.btn} ${styles.btnPrimary}`} onClick={registerClicked}>Registrar</button>
        </div>

        <div className={styles.lightColumn}>
          <h1>Login</h1>
          <p>Seu bem-estar começa aqui. Faça login e cuide da sua saúde conosco.</p>
          <form onSubmit={sendFormLogin} className={styles.form}>
            <label>
              <i className="fa fa-id-card" aria-hidden="true" />
              <input
                type="number"
                name="loginCpf"
                value={loginCpf}
                onChange={(event) => setLoginCpf(event.target.value)}
                placeholder="Digite seu CPF"
                required
              />
            </label>
            <label>
              <i className="fa fa-key" />
              <input
                type="password"
                name="loginPassword"
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.target.value)}
                placeholder="Digite sua senha"
                required
              />
            </label>
            <button title="Clique aqui para entrar na sua conta" type="submit" className={`${styles.btn} ${styles.btnSecond}`}>Entrar</button>
          </form>
          <a className={styles.backToHomePageLink} href='/'>Voltar à página inicial</a>
        </div>
      </div>

      {/* REGISTER CONTAINER */}

      <div className={`${styles.containerContent} ${styles.registerContainer}`}>
        <div className={styles.lightColumn}>
          <h1>Registrar</h1>
          <p>Registre-se conosco para uma jornada de cuidados personalizados e saúde completa.</p>
          <form onSubmit={sendFormRegister} className={styles.form}>
            <label>
              <i className="fa fa-user-circle" aria-hidden="true" />
              <input type="name" name="registerName" value={registerName} onChange={(event) => setRegisterName(event.target.value)} placeholder="Digite seu nome" required />
            </label>
            <label>
              <i className="fa fa-id-card" aria-hidden="true" />
              <input type="number" name="registerCpf" value={registerCpf} onChange={(event) => setRegisterCpf(event.target.value)} placeholder="Digite seu CPF" required />
            </label>
            <label>
              <i className="fa fa-key" />
              <input type="password" name="registerPassword" value={registerPassword} onChange={(event) => setRegisterPassword(event.target.value)} placeholder="Digite sua senha" required />
            </label>
            <label>
              <i className="fa fa-lock" aria-hidden="true" />
              <input type="password" name="registerRepeatPassword" value={registerRepeatPassword} onChange={(event) => setRegisterRepeatPassword(event.target.value)} placeholder="Repita sua senha" required />
            </label>
            <button title="Clique aqui para fazer o registro da sua conta" type="submit" className={`${styles.btn} ${styles.btnSecond}`}>Registrar</button>
          </form>
        </div>
        <div className={styles.darkColumn}>
          <h1>Já tenho uma conta</h1>
          <p>Caso já tenha uma conta registrada, entre com suas credenciais.</p>
          <button title="Clique aqui caso você já tenha uma conta" className={`${styles.btn} ${styles.btnPrimary}`} onClick={loginClicked}>Entrar</button>
        </div>
      </div>
    </main>
  );
}
