import { User } from '../models/models.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import env from "../env.js"

export default async function postEntrar (req, res) {

  if (req.body) {
    const { registerName, registerCpf, registerPassword,
          registerRepeatPassword, loginCpf, loginPassword } = req.body
    // Verify if is a register //
  
    if(registerName || registerCpf || registerPassword || registerRepeatPassword) {

      // Verify if all forms are complete //
      if (!registerName || !registerCpf ||
        !registerPassword || !registerRepeatPassword) {
          res.status(400).json({error: 'Preencha todos os formulários para prosseguir com a operação.'})
        } else {
          // If yes
          const findUser = await User.findOne({cpf: registerCpf});
            if (findUser) {
              res.status(406).json({error: 'Já existe um usuário com esse CPF.'})
            } else {

              if (registerCpf.length == 11 && registerPassword === registerRepeatPassword) {
                // Encrypting the password //
      
                const salt = await bcrypt.genSalt(10)
                const hashPass = await bcrypt.hash(registerPassword, salt)
      
                // Create new user //
      
                try {
                  const newUser = await new User({
                    name: registerName,
                    cpf: registerCpf,
                    password: hashPass
                  });
                  await newUser.save()
                  res.status(201).json({ success: "Conta criada com sucesso!"})
                } catch (err) {
                  res.status(500).json({error: 'Ops! Aconteceu algum erro no servidor, tente novamente mais tarde.'})
                }
      
              } else {
                res.status(406).json({ error: 'Algo deu errado! Verifique se os campos do formulário estão preenchidos corretamente.'})
              }
            }
        }
    }

    // Verify if is a login //

    if (loginCpf || loginPassword) {

      if (loginCpf && loginPassword) {

        const user = await User.findOne({ cpf: loginCpf });

        if(user && bcrypt.compareSync(loginPassword, user.password)) {
          // User authenticated //
          if (user.name === "admin" && user.cpf == "11111111111") {
            const tokenAdmin = await jwt.sign({ adminId: user._id }, env.SECRET, { expiresIn: '10h' })
            res.json({"tokenAdmin": tokenAdmin, "adminId": user._id});
          } else {
            const token = await jwt.sign({ userId: user._id }, env.SECRET, { expiresIn: '1h' });
            res.json({"token": token, "userId": user._id});
          }

        } else {
          res.status(404).json({error: 'Erro de autenticação: os dados fornecidos não correspondem com os do banco de dados, verifique se estão corretos.'})
        }
        
      } else {
        res.status(400).json({error: 'Preencha todos os formulários para prosseguir com a operação.'})
      }
    }
    } else {
      res.status(400).json({error: 'Os dados não foram enviados, ou não foram enviados corretamente, por favor verifique os campos do formulário para prosseguir com a operação.'})
    }
    
}