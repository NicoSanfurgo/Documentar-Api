const tableBody = document.querySelector('#orders-table-body')
const isAdminTh = document.querySelectorAll('.show-or-hide')
const ordersForm = document.querySelector('#ordersForm')

ordersForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const id = e.target.searchInput.value

  if (!id) {
    return Swal.fire({
      icon: 'warning',
      title: 'Atención!...',
      text: 'Debes ingresar un ID',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  const targetOrder = await getOrders(id)
  targetOrder && renderProducts([targetOrder])
})

function isAdmin() {
  const user = JSON.parse(sessionStorage.getItem('personalData'))
  return user.role === 'admin'
}

function renderProducts(data) {
  let html = ''

  if (isAdmin()) {
    isAdminTh.forEach((th) => {
      th.classList.remove('show-or-hide')
    })
  }

  data.forEach((order) => {
    const products = order.productos
      .map((product) => {
        return `${product.nombre} (${product.cantidad} u.)`
      })
      .join(', ')

    const date = new Date(parseInt(order.timestamp)).toLocaleString()

    html += `
        <tr data-id='${order.numeroDeOrden}'>
            <td>${order.numeroDeOrden}</td>
            <td class="hide-mobile">${date}</td>
            <td class="hide-mobile">${products}</td>
            <td class="hide-mobile">${order.estado}</td>
            <td class="hide-mobile">$${order.total}</td>
            ${
              isAdmin()
                ? `<td>${order.email}</td>
            <td class='mark-checked pointer' title='Esto marcará el pedido como "Entregado"'>✅</td>`
                : ''
            }
        </tr>
        `
  })

  tableBody.innerHTML = html

  const markChecked = document.querySelectorAll('.mark-checked')

  markChecked.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const orderId = btn.parentElement.getAttribute('data-id')

      const token = JSON.parse(sessionStorage.getItem('personalData')).token

      const res = await fetch(`/api/ordenes/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()

      if (data.hasOwnProperty('error')) {
        return Swal.fire({
          icon: 'warning',
          title: 'Atención!...',
          text: data.error,
          showConfirmButton: false,
          timer: 1500,
        })
      }

      Swal.fire({
        icon: 'success',
        title: 'Orden marcada como entregada',
        showConfirmButton: false,
        timer: 1500,
      })

      init()
    })
  })
}

async function getOrders(id) {
  try {
    if (id) {
      const res = await fetch(`/api/ordenes/${id}`)
      const data = await res.json()

      if (data.hasOwnProperty('error')) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.error,
          showConfirmButton: false,
          timer: 1500,
        })
        return null
      }

      return data
    }

    const res = await fetch('/api/ordenes')
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

    return data
  } catch (error) {
    console.log(error)
  }
}

async function dataToDisplay() {
  try {
    const orders = await getOrders()
    const user = JSON.parse(sessionStorage.getItem('personalData'))

    if (isAdmin()) {
      return orders
    } else {
      return orders.filter((order) => order.email === user.email)
    }
  } catch (error) {
    console.log(error)
  }
}

async function init() {
  try {
    const orders = await dataToDisplay()

    renderProducts(orders)
  } catch (error) {
    console.log(error)
  }
}

init()
