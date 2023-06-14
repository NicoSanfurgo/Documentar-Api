const productsContainer = document.getElementById('products-container')
const createProductForm = document.getElementById('create-product-form')
const updateProductForm = document.getElementById('update-product-form')
const deleteProductForm = document.getElementById('delete-product-form')
const deleteId = document.getElementById('deleteId')

let userRole = ''

createProductForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const body = {
    nombre: e.target.prodName.value,
    descripcion: e.target.description.value,
    codigo: e.target.code.value,
    foto: e.target.photo.value,
    precio: e.target.price.value,
    stock: e.target.stock.value,
    categoria: e.target.category.value,
  }

  const personalData = sessionStorage.getItem('personalData')
  token = JSON.parse(personalData).token

  let res = await fetch('/api/productos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  if (data.error) {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: data.error,
    })
  }

  Swal.fire({
    icon: 'success',
    title: 'Carga exitosa',
    text: data.message,
    showConfirmButton: false,
    timer: 1500,
  })

  createProductForm.reset()
  productsContainer.innerHTML = ''
  init()
})

updateProductForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const personalData = sessionStorage.getItem('personalData')
  token = JSON.parse(personalData).token

  const body = {
    nombre: e.target.updateName.value,
    descripcion: e.target.updateDescription.value,
    codigo: e.target.updateCode.value,
    foto: e.target.updatePhoto.value,
    precio: e.target.updatePrice.value,
    stock: e.target.updateStock.value,
    categoria: e.target.updateCategory.value,
  }

  const productId = e.target.id.value

  let res = await fetch(`/api/productos/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  if (data.hasOwnProperty('error'))
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: data.error,
      showConfirmButton: false,
      timer: 1500,
    })

  updateProductForm.reset()
  productsContainer.innerHTML = ''

  Swal.fire({
    icon: 'success',
    title: 'Actualización exitosa',
    text: data.message,
    showConfirmButton: false,
    timer: 1500,
  })

  init()
})

deleteProductForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const personalData = sessionStorage.getItem('personalData')
  token = JSON.parse(personalData).token

  const productID = e.target.deleteId.value

  let res = await fetch(`/api/productos/${productID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })

  const data = await res.json()

  if (data.hasOwnProperty('error'))
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: data.error,
      showConfirmButton: false,
      timer: 1500,
    })

  deleteProductForm.reset()
  productsContainer.innerHTML = ''

  Swal.fire({
    icon: 'success',
    title: 'Eliminación exitosa',
    text: data.message,
    showConfirmButton: false,
    timer: 1500,
  })

  init()
})

deleteId.addEventListener('click', () => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  })

  Toast.fire({
    icon: 'warning',
    title: 'Cuidado, esto borrará el producto',
  })
})

async function init() {
  try {
    const products = await getProducts()
    renderProducts(products)
  } catch (error) {
    console.log(error)
  }
}

init()

async function getProducts() {
  try {
    const response = await fetch('/api/productos/')
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

function renderProducts(products) {
  products.forEach((product) => {
    const productCard = document.createElement('tr')
    productCard.innerHTML = `
            <td>${product.id}</td>
            <td>${product.nombre}</td>
            <td class="hide-mobile">${product.codigo}</td>
            <td class="hide-mobile">${product.precio}</td>
            <td class="hide-mobile">${product.stock}</td>
            <td class="hide-mobile"><img src="${product.foto}" alt="${product.nombre}" width="100px"></td>
            <td class="hide-mobile">${product.timestamp}</td>
            <td class="hide-mobile">${product.categoria}</td>
            <td class='hide-mobile'>${product.descripcion}</td>
        `
    productsContainer.appendChild(productCard)
  })
}
