const MessageRepository = require('../../components/repository/MessageRepository')

const handleMessages = new MessageRepository()

const getMessages = async (req, res) => {
  const email = req.params.email

  if (email) {
    const messages = await handleMessages.getByMail(email)
    res.json(messages)
  } else {
    const messages = await handleMessages.getAll()
    res.json(messages)
  }
}

module.exports = getMessages
