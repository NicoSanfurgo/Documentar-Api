const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    personName: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: Number, required: true },
    avatar: { type: String, required: true },
    role: { type: String, required: true }
});

const SessModel = mongoose.model("accounts", Schema);

module.exports = { SessModel };