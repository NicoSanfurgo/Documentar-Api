const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  email: { type: String, required: true },
  tipo: { type: String, required: true },
  timestamp: { type: String, required: true },
  mensaje: { type: String, required: true },
})

const MensajesModel = mongoose.model('mensajes', Schema)

module.exports = { MensajesModel }
