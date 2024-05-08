import React from 'react';
import styles from './homecontent.module.css';
import psiquiatriaIcon from '../../assets/imgs/psiquiatria-icon.png';
import cardiologiaIcon from '../../assets/imgs/cardiologia-icon.png';
import psicologiaIcon from '../../assets/imgs/psicologia-icon.png';
import clinicageralIcon from '../../assets/imgs/clinica-geral-icon.png';
import dermatologiaIcon from '../../assets/imgs/dermatologia-icon.png';
import oncologiaIcon from '../../assets/imgs/oncologia-icon.png';
import fisioterapiaIcon from '../../assets/imgs/fisioterapia-icon.png';
import odontologiaIcon from '../../assets/imgs/odontologia-icon.png';
import logoBranco from '../../assets/imgs/logo-branco.png';
import schedulingImg from '../../assets/imgs/scheduling-img.png';

export default function HomeContent() {
  return (
    <>

      <section className={styles.firstSectionHome}>
        <div className={styles.sectionText}>
          <h1>Harmonize sua Saúde com a Clínica Harmonia</h1>
          <p>Aqui, sua saúde está em boas mãos. Nossos profissionais altamente qualificados estão prontos para cuidar de você com dedicação e expertise.</p>
          <button><a href="/entrar">Agende sua consulta agora</a></button>
        </div>
      </section>

      {/* SERVICE SECTION */}
      <section id="especialidades" className={styles.serviceSection}>
        <h1>Somos uma clínica médica especializada em diversas áreas da saúde</h1>
        <div className={styles.serviceSectionGrid}>
          <div className={styles.specialityBox}>
            <img src={psiquiatriaIcon} alt="Psiquiatria" />
            <p>Psiquiatria</p>
          </div>
          <div className={styles.specialityBox}>
            <img src={clinicageralIcon} alt="Clínica Geral" />
            <p>Clínica Geral</p>
          </div>
          <div className={styles.specialityBox}>
            <img src={odontologiaIcon} alt="Odontologia" />
            <p>Odontologia</p>
          </div>
          <div className={styles.specialityBox}>
            <img src={psicologiaIcon} alt="Psicologia" />
            <p>Psicologia</p>
          </div>
          <div className={styles.specialityBox}>
            <img src={oncologiaIcon} alt="Oncologia" />
            <p>Oncologia</p>
          </div>
          <div className={styles.specialityBox}>
            <img src={fisioterapiaIcon} alt="Fisioterapia" />
            <p>Fisioterapia</p>
          </div>
          <div className={styles.specialityBox}>
            <img src={cardiologiaIcon} alt="Cardiologia" />
            <p>Cardiologia</p>
          </div>
          <div id='sobrenos' className={styles.specialityBox}>
            <img src={dermatologiaIcon} alt="Dermatologia" />
            <p>Dermatologia</p>
          </div>

        </div>

      </section>

      {/* THIRD SECTION */}

      <section className={styles.thirdSection}>
        <div className={styles.thirdSectionImage}>
          <img src={logoBranco} alt="logo" />
        </div>
        <div className={styles.thirdSectionText}>
          <h1>
            Estamos a mais de 13 anos
            {' '}
            <span>transformando</span>
            {' '}
            vidas
          </h1>
          <p>Fundada em 16 de dezembro de 2010, a Clínica Harmonia tem como missão promover o equilíbrio e o bem-estar dos pacientes. Nossa história começou quando a Dra. Carolina de Jesus alugou uma casa em Olinda com o objetivo de montar seu próprio consultório de Psiquiatria. Logo, outros colegas de Pernambuco se juntaram, e assim nasceu a Clínica Harmonia. Priorizamos um atendimento médico acessível, humanizado e cientificamente comprovado.</p>
        </div>
      </section>

      {/* SCHEDULING SECTION */}

      <section className={styles.schedulingSection}>

        <h1>Agendamento Online</h1>
        <h2>Agendamento 24 horas por dia</h2>
        <p>Agendamento 100% digital com poucos cliques.</p>
        <button><a href='entrar'>Agendar consulta</a></button>
        <picture>
          <img src={schedulingImg} alt="agendamento online" />
        </picture>

      </section>
    </>
  );
}
