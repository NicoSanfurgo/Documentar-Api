const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    timestamp: { type: String, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    codigo: { type: String, required: true },
    foto: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true }, 
    categoria: { type: String, required: true },
});

const ProductosModel = mongoose.model("productos", Schema);

module.exports = { ProductosModel };