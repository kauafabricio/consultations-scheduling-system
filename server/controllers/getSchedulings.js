import { Consults } from "../models/models.js";

export default async function getSchedulings(req, res) {
  const userCpf = req.headers.usercpf;
  const admin = req.headers.admin;

  if (userCpf) {

    try {
      const agendamentos = await Consults.find({ userCpf });
      if (agendamentos.length === 0) {
        res.json({ "notFound": "Não foi encontrado nenhum agendamento." });
      } else {
        res.json({ "agendamentos": agendamentos });
      }

    } catch (err) {
      res.status(500).json({ "error": "Erro interno do servidor" });
    }
  }

  if (admin) {
    try {
      const consults = await Consults.find();
      if (consults.length === 0) {
        res.json({ "notFound": "Não foi encontrado nenhum agendamento." });
      } else {
        res.json({ "consults": consults });
      }

    } catch (err) {
      res.status(500).json({ "error": "Erro interno do servidor" });
    }
  }
}