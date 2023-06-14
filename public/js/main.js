const productsContainer = document.getElementById("products-container");
const categorySelect = document.getElementById("category");

let cartId;
let btnArr = document.querySelectorAll(".add-cart-btn") || [];

categorySelect.addEventListener("change", async (e) => {
  const category = e.target.value;

  if (category === "Todos") {
    init();
  } else {
    const response = await fetch(`/api/productos/categoria/${category}`);
    const products = await response.json();

    if (products.message) {
      productsContainer.innerHTML = `<h2>${products.message}</h2>`;
    } else {
      renderProducts(products);
    }
  }
  enableBtns();
});

function renderProducts(products) {
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const { nombre, precio, descripcion, foto, stock, id, categoria } = product;

    productsContainer.innerHTML += `
        <div class="card">
        <div class="card__body">
          <div class="half">
            <div class="featured_text">
              <h3>${nombre}</h3>
              <p class="price">$${precio}</p>
            </div>
            <div class="image">
              <img src="${foto}" alt="">
            </div>
          </div>
          <div class="half">
            <div class="description">
              <p>${descripcion}</p>
            </div>
            <span class="stock"><i class="fa fa-pen"></i> In stock - ${stock} u.</span>
            <span class="category">${categoria}</span>
          </div>
        </div>
        <div class="card__footer">
          <div class="action">
          <button type="button" id="${id}" class="add-cart-btn">Agregar a carrito</button>
          </div>
        </div>
      </div>
        `;
  });
}

function enableBtns() {
  btnArr = document.querySelectorAll(".add-cart-btn");

  btnArr.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = e.target.id;
      addProductToCart(productId);
    });
  });
}

async function addProductToCart(productId) {
  let res = await fetch(`/api/carrito/${cartId}/productos/${productId}`, {
    method: "POST",
  });

  const data = await res.json();

  if (data.hasOwnProperty("error")) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: data.error,
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    Swal.fire({
      icon: "success",
      title: "Producto agregado",
      text: data.message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

async function init() {
  const res = await fetch("/api/carrito");
  const allCart = await res.json();

  const data = await getData();
  userMail = data.email;

  const userCart = allCart.find((cart) => cart.email === userMail);

  if (userCart) {
    cartId = userCart.id;
    localStorage.setItem("cartId", cartId);
  } else {
    const { email, address } = await getData();

    let res = await fetch("/api/carrito", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        address,
      }),
    });

    let data = await res.json();
    cartId = data.id;

    localStorage.setItem("cartId", cartId);
  }
  const response = await fetch("/api/productos/");
  const products = await response.json();

  renderProducts(products);
  enableBtns();
}

init();
