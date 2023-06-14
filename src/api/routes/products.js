const express = require('express')
const isAdminMiddleware = require('../middlewares/isAdminMiddleware')
const {
  getProducts,
  getProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products')

const { Router } = express
const routerProducts = Router()
routerProducts.get('/:id?', getProducts)
routerProducts.get('/categoria/:category', getProductsByCategory)
routerProducts.post('/', isAdminMiddleware, addProduct)
routerProducts.put('/:id', isAdminMiddleware, updateProduct)
routerProducts.delete('/:id', isAdminMiddleware, deleteProduct)

module.exports = routerProducts