import { User } from '../models/models.js'
import bcrypt from 'bcrypt'

export default async function refreshPass(req, res) {
  const { userCpf, oldPassword, newPassword } = req.body

  const user = await User.findOne({cpf: userCpf})
  if (bcrypt.compareSync(oldPassword, user.password)) {
    try {
      const salt = await bcrypt.genSalt(10)
      const hashPass = await bcrypt.hash(newPassword, salt)
      const updatePass = await User.updateOne({cpf: userCpf}, {password: hashPass})
      res.json({"success": "Dados atualizados com sucesso!"})
    } catch (err) {
      res.json({"error": "Aconteceu algum erro no servidor, tente novamente mais tarde."})
    }
  } else {
    res.json({"error": "A senha antiga não é compatível com a sua senha. Tente novamente!"})
  }

}