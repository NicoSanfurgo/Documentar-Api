const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  productos: { type: Array, required: true },
  timestamp: { type: String, required: true },
  estado: { type: String, required: true },
  email: { type: String, required: true },
  total: { type: Number, required: true },
})

const OrdenesModel = mongoose.model('ordenes', Schema)

module.exports = { OrdenesModel }
