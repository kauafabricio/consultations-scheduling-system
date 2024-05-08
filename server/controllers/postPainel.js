import { Consults } from "../models/models.js"

export default async function postPainel(req, res) {
  const { speciality, profissional, date, hour, userCpf, userName } = req.body

  // Scheduling new consult //
  if (speciality && profissional && date && hour && userCpf && userName) {
     
    const numberDocs= await Consults.countDocuments({profissional, consultDate: date, consultHour: hour})
    const alreadyScheduled = await Consults.findOne({profissional, userName})

    if (!alreadyScheduled) {
      if (numberDocs < 3) {

        const newConsult = await new Consults({
          userCpf,
          userName,
          speciality,
          profissional,
          consultDate: date,
          consultHour: hour
        })
        await newConsult.save()
        res.json({"success": 'Consulta foi agendada com sucesso!'})
  
      } else {
        res.json({"msg": "Não foi possível agendar, esse horário se encontra cheio. Tente outro!"})
      }
    } else {
      res.json({"msg": "Você já agendou uma consulta com o(a) profissional, verifique em 'Cancelar Agendamento'."})
    }
  }
}