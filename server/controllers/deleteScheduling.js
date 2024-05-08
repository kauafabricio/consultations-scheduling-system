import { Consults } from "../models/models.js";

export default async function deleteScheduling(req, res) {
  const id = req.params.id;

  if (id) {
    try {
      await Consults.deleteOne({_id: id})
      res.json({ "message": 'Agendamento cancelado com sucesso' });
    } catch(err) {
      res.status(500).json({ "error": 'Erro interno do servidor' });
    }
  }
}