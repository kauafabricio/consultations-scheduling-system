import Cookies from 'js-cookie';
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import logoPreto from '../../assets/imgs/logo-preto.png';
import styles from './admin.module.css';
import env from '../../env.js';

export default function Admin() {
  useEffect(() => {
    document.title = 'Clínica Harmonia | Admin';
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const tokenAdmin = await Cookies.get('tokenAdmin');
      if (tokenAdmin) {
        try {
          const response = await axios.get(`${env.urlServer}/admin`, {
            headers: {
              Authorization: `BearerAdmin ${tokenAdmin}`,
            },
          });
          if (response) {
            if (response.data.tokenAdminInvalid) {
              Cookies.remove('tokenAdmin');
              window.location.href = `${env.urlFront}/entrar`;
            }
          }
        } catch (err) {
          window.alert('Aconteceu um erro no servidor, tente novamente mais tarde.');
          window.location.href = `${env.urlFront}/entrar`;
        }
      } else {
        window.location.href = `${env.urlFront}/entrar`;
      }
    };

    fetchData();
  }, []);

  const [consultsAdmin, setConsultsAdmin] = useState([]);
  const [consultsFiltered, setConsultsFiltered] = useState([]);
  const [profissionalFilter, setProfissionalFilter] = useState('');
  const [specialityFilter, setSpecialityFilter] = useState('');
  const [consultsBoxClasses, setConsultsBoxClasses] = useState(styles.consultsAdminBox);
  const [selectDisabled, setSelectDisabled] = useState(true);
  const [profissionalsFilteredArray, setProfissionalsFilteredArray] = useState([]);

  useEffect(() => {
    const getConsults = async () => {
      try {
        const response = await axios.get(`${env.urlServer}/api/schedulings`, {
          headers: {
            admin: 'true',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        if (response) {
          response.data.consults ? setConsultsAdmin(response.data.consults)
            : setConsultsAdmin(response.data.notFound);
        }
      } catch (err) {
        window.alert(err);
      }
    };
    getConsults();
  }, []);

  useEffect(() => {
    setConsultsFiltered(consultsAdmin);
  }, [consultsAdmin]);

  const filterConsults = (e) => {
    e.preventDefault();
    if (selectDisabled) {
      if (specialityFilter === 'All') {
        setConsultsFiltered(consultsAdmin);
      } else {
        window.alert('Selecione uma opção para filtrar');
      }
    } else if (specialityFilter && profissionalFilter) {
      const filterConsultsAdminForProfissional = consultsAdmin.filter((consult) => consult.profissional === profissionalFilter);
      setConsultsFiltered(filterConsultsAdminForProfissional);
    }
    setConsultsBoxClasses(`${styles.consultsAdminBox} ${styles.consultsAnimation}`);
  };

  const profissionals = useMemo(() => [
    { name: 'Dra. Maria Carolina de Jesus', speciality: 'Clínica Geral' },
    { name: 'Dr. Nícolas Negromonte', speciality: 'Cardiologia' },
    { name: 'Dra. Josefa Maria dos Santos', speciality: 'Psiquiatria' },
    { name: 'Dra. Bruna Fontes de Arruda', speciality: 'Odontologia' },
    { name: 'Dr. Ailton Krenak', speciality: 'Psicologia' },
    { name: 'Dra. Fernanda Montenegro', speciality: 'Oncologia' },
    { name: 'Dra. Vera Lima', speciality: 'Dermatologia' },
    { name: 'Dr. Adam Grant', speciality: 'Clínica Geral' },
    { name: 'Dr. Mário Pereira', speciality: 'Fisioterapia' }], []);

  useEffect(() => {
    if (specialityFilter === 'All') {
      setSelectDisabled(true);
      setProfissionalFilter('');
    } else {
      const filteredProfissionals = profissionals.filter((obj) => obj.speciality === specialityFilter);
      if (filteredProfissionals.length > 0) {
        setProfissionalFilter(filteredProfissionals[0].name);
        setSelectDisabled(false);
      }
      setProfissionalsFilteredArray(filteredProfissionals);
    }
  }, [specialityFilter, profissionals]);

  async function removeConsult(id) {
    try {
      const response = await axios.delete(`${env.urlServer}/api/schedulings/${id}`);
      if (response) {
        window.alert(response.data.message);
        window.location.reload();
      }
    } catch (err) {
      window.alert(err.response.data.error);
    }
  }

  const logout = () => {
    Cookies.remove('tokenAdmin');
    window.location.href = `${env.urlFront}/entrar`;
  };
  return (
    <main className={styles.adminContainer}>
      <div className={styles.adminPainel}>
        <button onClick={logout} className={styles.logoutBtn}>Sair</button>
        <div className={styles.adminHeader}>
          <h1>Gerenciamento de Consultas</h1>
          <picture>
            <img src={logoPreto} alt="Logo da Clínica Harmonia" />
          </picture>
        </div>

        <div className={styles.filterAdmin}>
          <form onSubmit={filterConsults}>
            <select value={specialityFilter} onChange={(e) => setSpecialityFilter(e.target.value)} name="speciality">
              <option value="" disabled hidden selected>Especialidade</option>
              <option value="All">*</option>
              <option value="Clínica Geral">Clínica Geral</option>
              <option value="Cardiologia">Cardiologia</option>
              <option value="Psiquiatria">Psiquiatria</option>
              <option value="Psicologia">Psicologia</option>
              <option value="Fisioterapia">Fisioterapia</option>
              <option value="Odontologia">Odontologia</option>
              <option value="Oncologia">Oncologia</option>
              <option value="Dermatologia">Dermatologia</option>
            </select>
            <select disabled={selectDisabled} value={profissionalFilter} onChange={(e) => setProfissionalFilter(e.target.value)}>
              <option value="" disabled hidden selected>Profissional</option>
              {profissionalsFilteredArray.map((obj) => (
                <option value={obj.name}>{obj.name}</option>
              ))}

            </select>
            <button type="submit">Filtrar</button>
          </form>
        </div>

        <div className={styles.consultsAdmin}>
          {consultsFiltered.map((consults) => (
            <section className={consultsBoxClasses}>
              <div className={styles.consultsAdminInfo}>
                <p>
                  <span>Paciente: </span>
                  {consults.userName}
                </p>
                <p>
                  <span>Especialidade: </span>
                  {consults.speciality}
                </p>
                <p>
                  <span>Profissional: </span>
                  {consults.profissional}
                </p>
                <p>
                  <span>Data da consulta: </span>
                  {consults.consultDate}
                </p>
                <p>
                  <span>Horário: </span>
                  {consults.consultHour}
                </p>
              </div>
              <button onClick={() => removeConsult(consults._id)}>Remover consulta</button>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
