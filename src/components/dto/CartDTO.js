const uniqid = require('uniqid')

class CartMongoDto {
  constructor(email, address) {
    this.timestamp = Date.now();
    this.productos = [];
    this.email = email;
    this.direccion = address;
  }
}

class CartFirebaseDto {
  constructor(email, address) {
    this.id = uniqid();
    this.timestamp = Date.now();
    this.productos = [];
    this.email = email;
    this.direccion = address;
  }
}

class CartNormaliceIdDto {
  constructor(cart) {
    this.id = cart._id;
    this.timestamp = cart.timestamp;
    this.productos = cart.productos;
    this.email = cart.email;
    this.direccion = cart.direccion;
  }
}

module.exports = { CartMongoDto, CartFirebaseDto, CartNormaliceIdDto }
