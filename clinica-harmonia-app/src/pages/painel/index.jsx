import styles from "./painel.module.css"
import axios from "axios"
import logoPreto from "../../assets/imgs/logo-preto.png"
import React, { useState, useEffect } from "react"
import Cookies from "js-cookie"
import env from "../../env"

export default function Painel() {

  const api = axios.create({
    baseURL: env.urlServer
  });

  useEffect(() => {
    document.title = 'Clínica Harmonia | Painel';
  }, []);

   const [userName, setUserName] = useState('')
   const [userCpf, setUserCpf] = useState('')

  
   // Verify if the user have the token to access //

   useEffect(() => {

    const fetchData = async () => {
      const token = await Cookies.get('token');
      if (token) {
        try {
          const response = await api.get('/painel', {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json;charset=utf-8',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }
          });
          if (response.status === 200 && response.data.name) {
            setUserName(response.data.name);
            setUserCpf(response.data.cpf);
          }
          if (response.data.tokenInvalid) {
            Cookies.remove('token')
            window.location.href = `${env.urlFront}/entrar`
          }
          
        } catch (err) {
          window.alert(`Aconteceu um erro no servidor, tente novamente mais tarde.`)
          window.location.href = `${env.urlFront}/entrar`;
        }
      } else {
        window.location.href = `${env.urlFront}/entrar`;
      }
    };

    fetchData();
  }, []);

  // Layout States //

  const [schedulingClasses, setSchedulingClasses] = useState(styles.Off);
  const [optionsClasses, setOptionsClasses] = useState(styles.optionsPainel);
  const [painelClasses, setPainelClasses] = useState(styles.painelContent);
  const [refreshClasses, setRefreshClasses] = useState(styles.Off);
  const [chooseHourClasses, setChooseHourClasses] = useState(styles.Off)
  const [msgPopUp, setMsgPopUp] = useState('');
  const [popUpPainelClasses, setPopUpPainelClasses] = useState(styles.Off);
  const [cancelSchedulingClasses, setCancelSchedulingClasses] = useState(styles.Off);

  async function openSchedulingPainel () {
    setOptionsClasses(styles.Off)
    setPainelClasses(styles.painelScale)
    setSchedulingClasses(styles.schedulingPainel)

    if (avaiableDateHour.length === 0) {
      try {
        const response = await api.get('/api/datehour', {
          headers: {
            Accept: 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
          }
        });
  
        if (response) {
          setAvaiableDateHour(response.data.dateHour);
        }
      } catch (err) {
        err.response ?
        showPopUp(err.response.data.error)
      : showPopUp(err.message || "Aconteceu algum erro no servidor.")
      console.log(err)
      }
    }
  }

  function closeScheduling () {
    setOptionsClasses(styles.optionsPainel)
    setSchedulingClasses(styles.Off)
    setPainelClasses(styles.painelContent)
  }

  function openRefreshPass () {
    setOptionsClasses(styles.Off)
    setPainelClasses(styles.painelScale)
    setRefreshClasses(styles.refreshPass)
  }

  function closeRefreshPass () {
    setOptionsClasses(styles.optionsPainel)
    setRefreshClasses(styles.Off)
    setPainelClasses(styles.painelContent)
  }

  async function openCancelScheduling() {
    setCancelSchedulingClasses(styles.cancelScheduling)
    setPainelClasses(styles.painelScale)
    setOptionsClasses(styles.Off)
    
    try {
      const response = await api.get('/api/schedulings', {
        headers: {
          'usercpf': `${userCpf}`,
          Accept: 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'      
        }
      })
      if (response) {
        if(response.data.agendamentos){
          setSchedulings(response.data.agendamentos)
          setSchedulingBoxes(styles.schedulingBoxes);
        } else {
          setSchedulings(response.data.notFound);
          setSchedulingBoxes(styles.notFound)
        }
      }
    } catch (err) {
      setSchedulings(err)
    }
  }

  function closeCancelScheduling() {
    setCancelSchedulingClasses(styles.Off);
    setOptionsClasses(styles.optionsPainel);
    setPainelClasses(styles.painelContent);
  }

  const logout = () => {
    Cookies.remove('token')
    window.location.href = `${env.urlFront}/entrar`
  }

  // Scheduling Codes //

  const profissionals = [
  { name: 'Dra. Maria Carolina de Jesus', speciality: 'Clínica Geral'},
  { name: 'Dr. Nícolas Negromonte', speciality: 'Cardiologia'},
  { name: 'Dra. Josefa Maria dos Santos', speciality: 'Psiquiatria'},
  { name: 'Dra. Bruna Fontes de Arruda', speciality: 'Odontologia'},
  { name: 'Dr. Ailton Krenak', speciality: 'Psicologia'},
  { name: 'Dra. Fernanda Montenegro', speciality: 'Oncologia'},
  { name: 'Dra. Vera Lima', speciality: 'Dermatologia'},
  { name: 'Dr. Adam Grant', speciality: 'Clínica Geral'},
  { name: 'Dr. Mário Pereira', speciality: 'Fisioterapia'}];


  // Scheduling States //

  const [dateConsult, setDateConsult] = useState('')
  const [selectedProfissional, setSelectedProfissional] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [avaiableDateHour, setAvaiableDateHour] = useState([])
  const [profissionalsFiltered, setProfissionalsFiltered] = useState([])
  const [avaiableDates, setAvaiableDates] = useState([])
  const [avaiableHours, setAvaiableHours] = useState([])

  function chooseHour (event) {
    event.preventDefault();
    setSchedulingClasses(styles.Off);
    setChooseHourClasses(styles.chooseHour);
  }

  function backScheduling() {
    setSchedulingClasses(styles.schedulingPainel)
    setChooseHourClasses(styles.Off)
  }

  function showPopUp(msg) {
    setPopUpPainelClasses(styles.popUpPainel)
    setMsgPopUp(msg)
  }

  function closePopUp() {
    if (msgPopUp === "Consulta foi agendada com sucesso!" || msgPopUp === "Você já agendou uma consulta com o(a) profissional, verifique em 'Cancelar Agendamento'.") {
      window.location.href = `${env.urlFront}/painel`
      setPopUpPainelClasses(styles.Off)
      setMsgPopUp('')
      setAvaiableDates([])
      setAvaiableHours([])
      setDateConsult('')
      setSelectedHour('')
      setSelectedProfissional('')
      setSpeciality('')
    } else if (msgPopUp === "Não foi possível agendar, esse horário se encontra cheio. Tente outro!") {
      backScheduling()
      setPopUpPainelClasses(styles.Off)
      setMsgPopUp('')
      setAvaiableDates([])
      setAvaiableHours([])
      setDateConsult('')
      setSelectedHour('')
      setSelectedProfissional('')
      setSpeciality('')
    } else {
      setPopUpPainelClasses(styles.Off)
      setMsgPopUp('')
    }
  }

  // Scheduling Handles and Hooks //

  useEffect(() => {
    if (avaiableDateHour.length > 0) {
      const profissionalSelected = avaiableDateHour.filter((obj) => obj.profissionalName === selectedProfissional)
      if (profissionalSelected.length > 0) {
        setAvaiableDates(profissionalSelected[0].date)
        setAvaiableHours(profissionalSelected[0].hours)
      }
    }
  }, [selectedProfissional, avaiableDateHour]);

  function handleSpeciality(event) {
    setSpeciality(event.target.value);
    const filteredProfissionals = profissionals.filter(
      (profissionalFilter) => profissionalFilter.speciality === event.target.value)
    
    if (filteredProfissionals.length > 0) {
      setSelectedProfissional(filteredProfissionals[0]?.name);
      setAvaiableDates([])
      setAvaiableHours([])
      setDateConsult('')
      setSelectedHour('')
    }
    setProfissionalsFiltered(filteredProfissionals)
  }


  // Send Consult //

  async function sendConsult(event) {

    event.preventDefault()
    if (speciality && selectedProfissional && dateConsult && selectedHour && userCpf && userName) {
      const formData = `speciality=${speciality}&profissional=${selectedProfissional}&date=${dateConsult}&hour=${selectedHour}&userCpf=${userCpf}&userName=${userName}`

      try {
        
        const response = await api.post('/painel', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
          }
        })
        
        if (response) {
          if (response.data.success) {
            showPopUp(response.data.success)
          } else{
            showPopUp(response.data.msg)
          }
        }

      } catch (err) {
        err.response ?
        showPopUp(err.response.data.error)
        : showPopUp(err.message || "Aconteceu algum erro no servidor.")
        console.log(err)
      }
    } else {
      showPopUp('Selecione todos os campos do formulário para prosseguir com a operação.')
    }

  }

  // Refresh Data Codes //

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');

  async function sendPassToRefresh(event) {
    event.preventDefault();

    if (oldPassword && newPassword && repeatNewPassword) {

      if (oldPassword !== newPassword) {
        if (newPassword === repeatNewPassword) {
        
          const formData = `userCpf=${userCpf}&oldPassword=${oldPassword}&newPassword=${newPassword}&repeatNewPassword=${repeatNewPassword}`
  
          try {
            const response = await api.put('/refresh-pass', formData, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
              }
            })
  
            if (response) {
              response.data.success ? showPopUp(response.data.success) : showPopUp(response.data.error)
            }
          } catch (err) {
            err.response ?
              showPopUp(err.response.data.error)
            : showPopUp(err.message || "Aconteceu algum erro no servidor.")
            console.log(err)
          }
        } else {
          showPopUp('A senha está incorreta, digite novamente para prosseguir com a operação.')
        }
      } else {
        showPopUp('Não foi possível alterar, a nova senha digitada por você é igual à atual.');
      }
    } else {
      showPopUp('Preencha todos os campos disponíveis para prosseguir com a operação.')
    }
  }

  // Cancel Scheduling States //

  const [schedulings, setSchedulings] = useState([])
  const [selectedScheduling, setSelectedScheduling] = useState('')
  const [schedulingBoxes, setSchedulingBoxes] = useState('')

  async function cancelScheduling() {

    if (selectedScheduling) {
      try {
        const response = await api.delete(`/api/schedulings/${selectedScheduling}`, {
          headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
          }})
        if (response) {
          showPopUp(response.data.message)
        }
      } catch (err) {
        err.response ?
        showPopUp(err.response.data.error)
          : showPopUp(err.message || "Aconteceu algum erro no servidor.")
          console.log(err)
      }
    } else {
      showPopUp("Selecione a consulta para prosseguir com a operação.")
    }
  }

  return(
    <>
      <main className={styles.containerPainel}>

        {/* POP-UP */}

        <div className={popUpPainelClasses}>
            <div>
            <p>{msgPopUp}</p>
            <button title="Clique aqui para fechar o modal" onClick={closePopUp}>Fechar</button>
          </div>
        </div>

        <div className={painelClasses}>

          
          {/* PAINEL OPTIONS */}

          <div className={optionsClasses}>

            <button title="Clique aqui para sair da sua conta" onClick={logout} className={styles.btnLogout}>Sair</button>
            <div className={styles.optionsHeader}>
              <h1>Olá, {userName ? userName.split(' ')[0] : null}</h1>
              <picture>
                <img src={logoPreto} alt="Logo da Clínica Harmonia" />
              </picture>
            </div>
            <p>Tenha controle total sobre suas consultas. Agende, cancele e reagende quando precisar.</p>

            <div className={`${styles.optionsBtns} ${styles.btnPainel} ${styles.btnPainelPrimary}`}>
              <button title="Clique aqui para abrir a área de agendamento de consultas" onClick={openSchedulingPainel}>Agendar consulta</button>
              <button title="Clique aqui para abrir a área de cancelamento de consultas" onClick={openCancelScheduling}>Cancelar agendamento</button>
              <button title="Clique aqui para abrir a área de alterar a senha" onClick={openRefreshPass}>Alterar senha</button>
            </div>
          </div>

          {/* PAINEL SCHEDULING */}

          <div className={schedulingClasses}>
            <button title="Clique aqui para voltar ao menu" onClick={closeScheduling} className={styles.backButton}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
            <h1>Agendamento</h1>
            <p>Nossa clínica oferece um ambiente tranquilo e acolhedor para nossos pacientes.</p>
            <form onSubmit={chooseHour} className={`${styles.btnPainel} ${styles.btnPainelSecond}`}>
                <select value={speciality} onChange={handleSpeciality} name="Especialidade" required={true}>
                    <option value="" disabled hidden selected>Especialidade</option>
                    <option value="Clínica Geral">Clínica Geral</option>
                    <option value="Cardiologia">Cardiologia</option>
                    <option value="Psiquiatria">Psiquiatria</option>
                    <option value="Psicologia">Psicologia</option>
                    <option value="Fisioterapia">Fisioterapia</option>
                    <option value="Odontologia">Odontologia</option>
                    <option value="Oncologia">Oncologia</option>
                    <option value="Dermatologia">Dermatologia</option>
                </select>

                <select name="Profissional" value={selectedProfissional} onChange={(event) =>     setSelectedProfissional(event.target.value)} required={true}>
                    <option value="" disabled hidden selected>Profissional</option>

                    {profissionalsFiltered.map((profissional, index) => (
                        <option key={index} value={profissional.name}>{profissional.name}</option>
                      ))}
                </select>

                <select name="Data da consulta" value={dateConsult} onChange={(event) => setDateConsult(event.target.value)} required={true}>

                  <option value="" disabled hidden selected>Data da consulta</option>

                  {avaiableDates.map((date, index) => (
                    <option key={index} value={date}>{date}</option>
                  ))}

                </select>

                <button title="Clique aqui para escolher o horário da consulta" type="submit">Escolher horário</button>
            </form>
          </div>

          {/* CHOOSE HOUR */}

          <div className={chooseHourClasses}>
            <button title="Clique aqui para voltar" onClick={backScheduling} className={styles.backButton}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
            <h1>Qual é o melhor horário para você?</h1>
            <form onSubmit={sendConsult} className={`${styles.btnPainel} ${styles.btnPainelSecond}`}>

                <div className={styles.gridBoxes}>
                  {avaiableHours.map((hour, index) => (
                  <div className={styles.hourBox}>
                    <p><span>Horário: </span><br></br>{hour}</p>
                    <input key={index} name="options" type="radio" value={hour} checked={selectedHour === hour} onChange={(event) => setSelectedHour(event.target.value)}/>
                </div>
                ))}
                </div>
        
              <button title="Clique aqui para agendar sua consulta" type='submit'>Agendar Consulta</button>
            </form>
          </div> 

        {/* CANCEL SCHEDULING */}

        <div className={cancelSchedulingClasses}>
            <button title="Clique aqui para voltar ao menu" onClick={closeCancelScheduling} className={styles.backButton}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
            <h1>Cancelar agendamento</h1>
            <form className={`${styles.btnPainel} ${styles.btnPainelSecond}`}>
            <div className={schedulingBoxes}>
            {typeof schedulings[0] === "string" ? (
                <p>{schedulings}</p>
                
            ) : (
                schedulings.map((agendamento) => (
                    <section key={agendamento._id}>
                        <div className={styles.schedulingsInfo}>
                            <p><span>Especialidade: </span>{agendamento.speciality}</p>
                            <p><span>Profissional: </span>{agendamento.profissional}</p>
                            <p><span>Data da consulta: </span>{agendamento.consultDate}</p>
                            <p><span>Horário: </span>{agendamento.consultHour}</p>
                        </div>
                        <input type="radio" value={agendamento._id} checked={agendamento._id === selectedScheduling} onChange={() => setSelectedScheduling(agendamento._id)} />
                    </section>
                ))
            )}
            </div>
            <button title="Clique aqui para cancelar seu agendamento" onClick={cancelScheduling}>Cancelar agendamento</button>
            </form>
        </div>

          {/* REFRESH PASS */}

          <div className={refreshClasses}>
            <button title="Clique aqui para voltar ao menu" onClick={closeRefreshPass} className={styles.backButton}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
            <h1>Alterar senha</h1>
            <p>Usamos criptografia para proteger a sua senha.</p>
            <form onSubmit={sendPassToRefresh} className={`${styles.btnPainel} ${styles.btnPainelSecond}`}>
                    <div className={styles.refreshInput}>
                        <label htmlFor="cpf-control">CPF</label>
                        <input value={userCpf} name="cpf" id="cpf-control" type="number" readOnly />
                    </div>
                    <div className={styles.refreshInput}>
                        <label htmlFor="name-control">Nome</label>
                        <input value={userName} name="name" id="name-control" type="text" readOnly/>
                    </div>
                    <div className={styles.refreshInput}>
                        <label htmlFor="oldpassword">Senha antiga</label>
                        <input value={oldPassword} onChange={(event) => setOldPassword(event.target.value)} name="oldpassword" id="oldpassword" type="password"/>
                    </div>
                    <div className={styles.refreshInput}>
                        <label htmlFor="newpassword">Nova senha</label>
                        <input value={newPassword} onChange={(event) => setNewPassword(event.target.value)} name="newpassword" id="newpassword" type="password"/>
                    </div>
                    <div className={styles.refreshInput}>
                        <label htmlFor="repeatnewpassword">Confirmação de senha</label>
                        <input value={repeatNewPassword} onChange={(event) => setRepeatNewPassword(event.target.value)} name="repeatnewpassword" id="repeatnewpassword" type="password"/>
                    </div>
                    <button title="Clique aqui para atualizar sua senha" type="submit">Atualizar senha</button>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}