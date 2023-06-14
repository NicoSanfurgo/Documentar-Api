const mongoose = require('mongoose')
const { MensajesModel } = require('../../model/messagesModel')
const { loggerError } = require('../../../utils/logger')

const {
  MessageMongoDto,
  MessageNormaliceIdDto,
} = require('../../dto/MessageDTO')

mongoose.connect(
  process.env.DB_URL_MONGO,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log(err)
  }
)

let instance = null

class MessageMongo {
  async save(msg) {
    try {
      const message = new MessageMongoDto(msg)
      const newMessage = new MensajesModel(message)
      await newMessage.save()

      return { message: 'Se guardó correctamente el mensaje' }
    } catch (err) {
      loggerError.error(err)
    }
  }

  async getByMail(email) {
    try {
      const messages = await MensajesModel.find({ email: email })

      if (messages.length === 0) {
        return { error: 'No se encontraron mensajes de ese usuario' }
      }

      const messagesNormalice = messages.map((msg) => {
        return new MessageNormaliceIdDto(msg)
      })

      return messagesNormalice
    } catch (error) {
      loggerError.error(error)
    }
  }

  async getAll() {
    try {
      const messages = await MensajesModel.find({})

      const messagesNormalice = messages.map((msg) => {
        return new MessageNormaliceIdDto(msg)
      })

      return messagesNormalice
    } catch (error) {
      loggerError.error(error)
    }
  }

  async getUniqueUsers() {
    try {
      const messages = await this.getAll()

      const uniqueUsers = messages.map((msg) => {
        return msg.email
      })

      const uniqueUsersSet = [...new Set(uniqueUsers)]

      return uniqueUsersSet
    } catch (error) {
      loggerError.error(error)
    }
  }

  static getInstance() {
    if (!instance) {
      instance = new MessageMongo()
    }
    return instance
  }
}

module.exports = MessageMongo
