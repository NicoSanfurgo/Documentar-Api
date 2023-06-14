const socket = io()

const newMsgForm = document.getElementById('chat-form')
const personalData = JSON.parse(sessionStorage.getItem('personalData'))

const currentUser = { email: personalData.email, role: personalData.role }

socket.emit('userIdReceived', currentUser)

newMsgForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const data = {
    email: personalData.email,
    tipo: personalData.role,
    mensaje: e.target.chatMessage.value,
  }

  socket.emit('new-message', data)

  e.target.chatMessage.value = ''

  e.target.chatMessage.focus()
})

socket.on('mensajes', (data) => {
  const chatContainer = document.getElementById('messages')
  if (data.length === 0) {
    chatContainer.style.display = 'none'
    return
  } else {
    chatContainer.style.display = 'flex'
  }

  chatContainer.innerHTML = ''

  data.reverse()

  data.forEach((message) => {
    const { tipo, timestamp, mensaje } = message

    const date = new Date(parseInt(timestamp)).toLocaleString('es-AR')

    const role = tipo === 'admin' ? 'is-admin' : ''
    const sender = tipo === 'admin' ? 'Admin' : 'Yo'

    chatContainer.innerHTML += `
            <div class="message-container ${role}">
                <div class="message-container__child">
                    <div>
                        <p class="message-user" title='${tipo}'>${sender}</p>
                        <p class="message-text">${mensaje}</p>
                    </div>
                </div>
                <p class="message-email">${date}</p>
            </div>
        `
  })
})
