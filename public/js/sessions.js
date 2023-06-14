const spanName = document.getElementById('span-name')
const smallEmail = document.getElementById('small-email')
const logoAvatar = document.getElementById('logo-avatar')
const adminNavbar = document.getElementById('admin-navbar')
const hiddenAdmin = document.getElementById('hidden-admin')

let checkOutEmail = ''

async function logout() {
  sessionStorage.removeItem('personalData')

  Swal.fire({
    icon: 'success',
    title: `Te desloguaste correctamente ${checkOutEmail}`,
    showConfirmButton: false,
    timer: 2000,
  })

  setInterval(() => {
    window.location.href = '/logout'
  }, 2000)
}

;(async function start() {
  const dataIfLogged = await getData()

  if (!dataIfLogged) return (window.location.href = '/')

  sessionStorage.setItem('personalData', JSON.stringify(dataIfLogged))

  const { personName, email, avatar, role } = dataIfLogged

  spanName.innerText = personName
  smallEmail.innerText = email
  logoAvatar.src = avatar

  checkOutEmail = email

  userRole = role

  if (role === 'admin') {
    adminNavbar.innerHTML = `
      <li><a href="./ecommerce.html">Tienda</a></li>
      <li><a href="./productos.html">Productos</a></li>
      <li><a href="./carritos.html">Carritos</a></li>
      <li><a href="./orders.html">Ordenes</a></li>
      <li><a href="./admin-chat.html">Responder consultas</a></li>
    `
    if (hiddenAdmin) hiddenAdmin.style.display = 'none'
  }
})()
