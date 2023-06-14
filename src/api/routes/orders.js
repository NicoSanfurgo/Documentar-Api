const express = require('express')
const isAdminMiddleware = require('../middlewares/isAdminMiddleware')
const { getOrders, markOrderAsCompleted } = require('../controllers/orders')
const { Router } = express
const routerOrders = Router()

routerOrders.get('/:id?', getOrders)

routerOrders.put('/:id', isAdminMiddleware, markOrderAsCompleted)

module.exports = routerOrders