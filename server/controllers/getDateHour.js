import { Schedule } from "../models/models.js";

export default async function getDateHour(req, res) {
  // Filtering Date and Hour of the Profissional //

  try {
    const findProfissional = await Schedule.find()
    res.json({"dateHour": findProfissional})
  } catch(err) {
    res.status(500).json({"error": "Internal server error"})
  }
}