const { loggerError } = require('../../../utils/logger')
const { MessageFirebaseDto } = require('../../dto/MessageDTO')

let instance = null

class MessageFirebase {
  constructor(db) {
    this.db = db
  }

  async save(msg) {
    try {
      const message = new MessageFirebaseDto(msg)

      await this.db.collection('mensajes').add({ ...message })
      return { message: 'Mensaje guardado!' }
    } catch (err) {
      loggerError.error(err)
      return { error: 'Error al guardar el mensaje' }
    }
  }

  async getByMail(email) {
    try {
      const messageCollection = this.db.collection('mensajes')
      const querySnapshot = await messageCollection.get()
      const allMessages = querySnapshot.docs.map((doc) => doc.data())

      const targetMessages = allMessages.filter(
        (message) => message.email === email
      )

      if (targetMessages.length === 0)
        return { error: 'No se encontraron mensajes de ese usuario' }

      return targetMessages
    } catch (err) {
      loggerError.error(err)
    }
  }

  async getAll() {
    try {
      const messageCollection = this.db.collection('mensajes')
      const querySnapshot = await messageCollection.get()
      const allMessages = querySnapshot.docs.map((doc) => doc.data())

      return allMessages
    } catch (err) {
      loggerError.error(err)
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
    } catch (err) {
      loggerError.error(err)
    }
  }

  static getInstance() {
    if (!instance) {
      instance = new MessageFirebase()
    }
    return instance
  }
}

module.exports = MessageFirebase
