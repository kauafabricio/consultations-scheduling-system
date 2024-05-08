import jwt from "jsonwebtoken"
import { User } from "../models/models.js"

export default async function getPainel(req, res) {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.substring(7); // Remove o "Bearer " do início do token //
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      if (decoded) {
        // Se o token for válido //
        const user = await User.findOne({ _id: decoded.userId })
        return res.status(200).json({"id": user._id, "name": user.name, "cpf": user.cpf });
      } else {
        // Se o token for inválido //
        return res.json({ "tokenInvalid": true });
      }
    } catch (error) {
      return res.status(500).json({ "error": error.message });
    }
  } else {
    // Token não fornecido //
    res.status(401).json({ "error": "Token de autorização não fornecido" });
  }
}