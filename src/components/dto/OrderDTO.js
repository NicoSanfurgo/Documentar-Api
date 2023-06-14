const uniqid = require('uniqid')

class OrderFirebaseDto {
  constructor(cart, email, totalPrice) {
    this.numeroDeOrden = uniqid()
    this.timestamp = Date.now()
    this.productos = cart
    this.estado = 'Generada'
    this.email = email
    this.total = totalPrice
  }
}

class OrderMongoDto {
  constructor(cart, email, totalPrice) {
    this.timestamp = Date.now()
    this.productos = cart
    this.estado = 'Generada'
    this.email = email
    this.total = totalPrice
  }
}

class OrderNormaliceIdDto {
  constructor(order) {
    this.numeroDeOrden = order._id.toString()
    this.timestamp = order.timestamp
    this.productos = order.productos
    this.estado = order.estado
    this.email = order.email
    this.total = order.total
  }
}

module.exports = { OrderFirebaseDto, OrderMongoDto, OrderNormaliceIdDto }
