const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    timestamp: { type: String, required: true },
    productos: { type: Array, required: true },
    email: { type: String, required: true },
    direccion: { type: String, required: true },
});

const CarritosModel = mongoose.model("carritos", Schema);

module.exports = { CarritosModel };