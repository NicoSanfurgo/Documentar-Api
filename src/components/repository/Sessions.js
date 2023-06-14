const mongoose = require('mongoose')
const config = require('../../config/config')
const { SessModel } = require('../model/sessModel')
const { createHash } = require('../../utils/handlePass')
const handleSubmitMail = require('../../utils/mailOptions')
const { loggerError } = require('../../utils/logger')

mongoose.connect(
  config.mongoDB.host,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) loggerError.error(err)
  }
)

class SessionRepository {
  async findUser(user) {
    try {
      return await SessModel.findOne({ email: user })
    } catch (err) {
      loggerError.error(err)
    }
  }

  async createUser(user) {
    try {
      const isNotValidUser = await SessModel.findOne({ email: user.email })

      if (isNotValidUser) {
        loggerError.error(
          'Se ha intentado crear una cuenta con un email ya existente'
        )
        return { err: 'El usuario ya existe' }
      } else {
        user.password = createHash(user.password)
        user.role = 'user'
        const newUser = new SessModel(user)
        await newUser.save()

        const { personName, email, address, phone, age } = user

        const mailOptions = {
          from: 'Servidor Ecommerce',
          to: process.env.EMAIL,
          subject: 'Nuevo usuario registrado',
          html: `
                    <h1>¡Nuevo usuario registrado!</h1>
                    <p>Nombre: ${personName}</p>
                    <p>Email: ${email}</p>
                    <p>Dirección: ${address}</p>
                    <p>Teléfono: ${phone}</p>
                    <p>Edad: ${age}</p>`,
        }
        handleSubmitMail(mailOptions)
        return newUser
      }
    } catch (err) {
      loggerError.error(err)
    }
  }
}

module.exports = SessionRepository