import jwt from "jsonwebtoken"

export default async function getEntrar(req, res) {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.substring(7); // Remove o "Bearer " do início do token //
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);

      if (decoded) {
        // Se o token for válido //
        return res.status(200).json({"tokenValid": true});
      } else {
        // Se o token for inválido //
        return res.json({ "tokenInvalid": true });
      }
    } catch (error) {
      return res.status(500).json({ "error": error.message });
    }
  } else if (authorizationHeader && authorizationHeader.startsWith('BearerAdmin ')) {
    const tokenAdmin = authorizationHeader.substring(12);
    try {
      const decoded = await jwt.verify(tokenAdmin, process.env.SECRET);
      
      if (decoded) {
        return res.status(200).json({"tokenAdminValid": true});
      } else {
        return res.json({"tokenAdminInvalid": true})
      }
    } catch (err) {
      return res.status(500).json({"error": error.message})
    }
  } else {
    res.status(401).json({"error": "Acesso não autorizado."})
  }
}
