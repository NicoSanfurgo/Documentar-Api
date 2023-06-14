const socket = io()

const newMsgForm = document.getElementById('chat-form')
const personalData = JSON.parse(sessionStorage.getItem('personalData'))
const listUsers = document.getElementById('listUsers')

const currentUser = { email: personalData.email, role: personalData.role }

let userSelected
let listOfUsers = []

socket.emit('userIdReceived', currentUser)

socket.on('listOfUsers', (data) => {
  if (listOfUsers.length !== data.length) {
    listUsers.innerHTML = ''

    userSelected = data[0]
    listOfUsers = data

    newMsgForm.chatMessage.disabled = false
    newMsgForm.chatMessageButton.disabled = false
    newMsgForm.chatMessageButton.style.backgroundColor = 'white'

    data.forEach((user) => {
      listUsers.innerHTML += `<option value="${user}">${user}</option>`
    })
  } else if (data.length === 0) {
    listUsers.innerHTML =
      '<option value="Todavía no se enviaron mensajes">Todavía no se enviaron mensajes</option>'

      newMsgForm.chatMessage.disabled = true
      newMsgForm.chatMessageButton.disabled = true
      newMsgForm.chatMessageButton.style.backgroundColor = 'gray'
  }
})

listUsers.addEventListener('change', async (e) => {
  userSelected = e.target.value

  socket.emit('changeUser', userSelected)
})

newMsgForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const data = {
    email: userSelected,
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
    const { email, tipo, timestamp, mensaje } = message

    const date = new Date(parseInt(timestamp)).toLocaleString('es-AR')

    const role = tipo === 'admin' ? 'is-admin' : ''
    const sender = tipo === 'admin' ? 'Admin' : email

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
