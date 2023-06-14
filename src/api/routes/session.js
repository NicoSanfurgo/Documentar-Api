const express = require('express')
const { Router } = express
const {
  mainRoute,
  loginRoute,
  registerRoute,
  logoutRoute,
  getNameRoute,
} = require('../controllers/session')

const redirectMiddleware = require('../middlewares/redirectMiddleware')
const isLoggedMiddleware = require('../middlewares/isLoggedMiddleware')
const routerSessions = Router()

routerSessions.get('/', redirectMiddleware, mainRoute)
routerSessions.post('/login', loginRoute)
routerSessions.post('/register', registerRoute)
routerSessions.get('/logout', logoutRoute)
routerSessions.get('/get-data', isLoggedMiddleware, getNameRoute)

module.exports = routerSessions
