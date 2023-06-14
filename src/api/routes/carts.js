const express = require('express')

const {
  createCart,
  addProductToCart,
  buyCart,
  deleteCart,
  deleteProductFromCart,
  getAllCarts,
  getProductsFromCart,
} = require('../controllers/cart')

const { Router } = express
const routerCarts = Router()

routerCarts.get('/', getAllCarts)

routerCarts.get('/:id/productos', getProductsFromCart)

routerCarts.post('/', createCart)

routerCarts.post('/:id/productos/:productId', addProductToCart)

routerCarts.post('/confirmar-compra', buyCart)

routerCarts.delete('/:id', deleteCart)

routerCarts.delete('/:id/productos/:productId', deleteProductFromCart)

module.exports = routerCarts
