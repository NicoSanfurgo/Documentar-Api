const dialog = document.getElementById('dialog')
const openDialogBtn = document.getElementById('openDialogBtn')
const closeDialogBtn = document.getElementById('closeDialogBtn')
const cartContainer = document.getElementById('cartContainer')
const totalPriceContainer = document.getElementById('dialogTotalPrice')
const buyBtn = document.querySelector('.buy-cart')

openDialogBtn.addEventListener('click', async () => {
  dialog.showModal()

  const products = await getProducts(cartId)

  if (products.length === 0)
    return (cartContainer.innerHTML = 'No hay productos')

  cartContainer.innerHTML = ''

  const total = products.reduce((acc, product) => {
    return acc + product.precio * product.cantidad
  }, 0)

  totalPriceContainer.innerHTML = `
          <hr>
          <p class="dialog__total-price">Total: ${total}</p>
          <hr>`

  products.forEach((product) => {
    const { id, nombre, foto, cantidad } = product

    cartContainer.innerHTML += `
        <div data-id='${id}' class='cart-row'>
            <img src="${foto}" alt="${nombre}" width="50px">
            <h5>${nombre} x ${cantidad}</h5>
            <i class="fa-solid fa-trash">
        </div>`
  })

  const deleteBtn = document.querySelectorAll('.fa-trash')

  deleteBtn.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const productId = btn.parentElement.getAttribute('data-id')
      const res = await deleteProductFromCart(productId)

      resetAll()
      if (res.hasOwnProperty('error')) return

      btn.parentElement.remove()

      if (cartContainer.children.length === 0)
        cartContainer.innerHTML = 'No hay productos'
    })
  })
})

buyBtn.addEventListener('click', async (e) => {
  e.preventDefault()

  const userData = JSON.parse(sessionStorage.getItem('personalData'))

  const { personName, email, phone } = userData

  const res = await fetch('/api/carrito/confirmar-compra', {
    method: 'POST',
    body: JSON.stringify({
      cart: cartId,
      email,
      personName,
      phone,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await res.json()

  resetAll()

  if (data.hasOwnProperty('error'))
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: data.error,
      showConfirmButton: false,
      timer: 1500,
    })

  Swal.fire({
    icon: 'success',
    title: 'Compra realizada',
    html: `${data.message} <br><br><br> Te llegará un Whatsapp con el detalle de tu compra`,
    showConfirmButton: true,
    timer: 5500,
  })

  init()
})

closeDialogBtn.addEventListener('click', () => {
  resetAll()
})

async function getProducts(cartId) {
  let res = await fetch(`/api/carrito/${cartId}/productos`)

  let data = await res.json()

  if (data.hasOwnProperty('message')) return []

  if (data.hasOwnProperty('error')) {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: data.error,
      showConfirmButton: false,
      timer: 1500,
    })
  }

  return data
}

async function deleteProductFromCart(productId) {
  let res = await fetch(`/api/carrito/${cartId}/productos/${productId}`, {
    method: 'DELETE',
  })

  resetAll()

  const data = await res.json()

  if (data.hasOwnProperty('error')) {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: data.error,
      showConfirmButton: false,
      timer: 1500,
    })
  }

  Swal.fire({
    icon: 'success',
    title: 'Producto eliminado',
    text: data.message,
    showConfirmButton: false,
    timer: 1500,
  })

  return data
}

function resetAll() {
  cartContainer.innerHTML = ''
  totalPriceContainer.innerHTML = ''
  dialog.close()
}
