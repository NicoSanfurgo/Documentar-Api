const express = require('express')
const getMessages = require('../controllers/messages')
const { Router } = express
const routerMessages = Router()

routerMessages.get('/:email?', getMessages)

module.exports = routerMessages
