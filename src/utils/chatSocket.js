const MessageRepository = require('../components/repository/MessageRepository')
const handleMsg = new MessageRepository()
const user = []

const listen = (io) => {
  io.on('connection', async (socket) => {
    socket.on('userIdReceived', async (data) => {
      user.push({ data, socketId: socket.id })

      data.role === 'admin'
        ? socket.emit('mensajes', await handleMsg.getAll())
        : socket.emit('mensajes', await handleMsg.getByMail(data.email))

      const uniqueUsers = await handleMsg.getUniqueUsers()
      socket.emit('listOfUsers', uniqueUsers)
    })

    socket.on('changeUser', async (data) => {
      const msgs = await handleMsg.getByMail(data)

      socket.emit('mensajes', msgs)
    })

    socket.on('new-message', async (msj) => {
      await handleMsg.save(msj)
      const admin = user.find((user) => user.data.role === 'admin')
      const thisUser = user.find((user) => user.data.email == msj.email)
      const userMsg = await handleMsg.getByMail(msj.email)

      socket.broadcast.to(admin?.socketId).emit('mensajes', userMsg)
      socket.broadcast.to(thisUser?.socketId).emit('mensajes', userMsg)
      socket.emit('mensajes', userMsg)

      const uniqueUsers = await handleMsg.getUniqueUsers()
      io.sockets.emit('listOfUsers', uniqueUsers)
    })
  })
}

module.exports = { listen }
