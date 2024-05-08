import jwt from "jsonwebtoken"

export default async function getAdmin(req, res) {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader && authorizationHeader.startsWith('BearerAdmin ')) {
    const tokenAdmin = authorizationHeader.substring(12);
    try {
      const decoded = await jwt.verify(tokenAdmin, process.env.SECRET);
      if (decoded) {
        return res.status(200).json({"tokenAdminValid": true});
      } else {
        return res.json({ "tokenAdminInvalid": true });
      }
      } catch (error) {
        return res.status(500).json({ "error": error.message });
      }
    } else {
      res.status(401).json({ "error": "Acesso não autorizado." });
    }
}