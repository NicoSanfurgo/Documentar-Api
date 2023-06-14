const { loggerError } = require('../../utils/logger')
const { handleMessages } = require('../../components/factory/Factory')

class MessageRepository {
  async save(msg) {
    try {
      return await handleMessages.save(msg)
    } catch (err) {
      loggerError.error(err)
    }
  }

  async getByMail(email) {
    try {
      return await handleMessages.getByMail(email)
    } catch (err) {
      loggerError.error(err)
    }
  }

  async getAll() {
    try {
      return await handleMessages.getAll()
    } catch (err) {
      loggerError.error(err)
    }
  }

  async getUniqueUsers() {
    try {
      return await handleMessages.getUniqueUsers()
    } catch (err) {
      loggerError.error(err)
    }
  }
}

module.exports = MessageRepository
