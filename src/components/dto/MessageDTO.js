const uniqid = require('uniqid')

class MessageMongoDto {
  constructor(msg) {
    this.email = msg.email
    this.tipo = msg.tipo
    this.timestamp = Date.now()
    this.mensaje = msg.mensaje
  }
}

class MessageFirebaseDto {
  constructor(msg) {
    this.id = uniqid()
    this.email = msg.email
    this.tipo = msg.tipo
    this.timestamp = Date.now()
    this.mensaje = msg.mensaje
  }
}

class MessageNormaliceIdDto {
  constructor(msg) {
    this.id = msg._id
    this.email = msg.email
    this.tipo = msg.tipo
    this.timestamp = msg.timestamp
    this.mensaje = msg.mensaje
  }
}

module.exports = { MessageMongoDto, MessageFirebaseDto, MessageNormaliceIdDto }
