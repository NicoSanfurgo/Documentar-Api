const admin = require('firebase-admin')
const config = require('../../config/config')
const { logger } = require('../../utils/logger')

let handleProducts
let handleCarts
let handleOrders
let handleMessages

switch (process.env.PERS) {
  case 'mongo':
    const ContenedorProductosMongo = require('../dao/products/ProductMongo')
    const ContenedorCarritosMongo = require('../dao/carts/CartMongo')
    const ContenedorOrdenesMongo = require('../dao/orders/OrderMongo')
    const ConetenerMensajesMongo = require('../dao/messages/MessageMongo')

    logger.info('Using Mongo')

    handleProducts = new ContenedorProductosMongo()
    handleCarts = new ContenedorCarritosMongo()
    handleOrders = new ContenedorOrdenesMongo()
    handleMessages = new ConetenerMensajesMongo()

    break
  case 'firebase':
    admin.initializeApp({
      credential: admin.credential.cert(config.firebase),
    })

    const db = admin.firestore()

    const ContenedorProductosFb = require('../dao/products/ProductFirebase')
    const ContenedorCarritosFb = require('../dao/carts/CartFirebase')
    const ContenedorOrdenesFb = require('../dao/orders/OrderFirebase')
    const ContenedorMensajesFb = require('../dao/messages/MessageFirebase')

    logger.info('Using Firebase')

    handleProducts = new ContenedorProductosFb(db)
    handleCarts = new ContenedorCarritosFb(db)
    handleOrders = new ContenedorOrdenesFb(db)
    handleMessages = new ContenedorMensajesFb(db)

    break

  default:
    const ContenedorProductosDefault = require('../dao/products/ProductMongo')
    const ContenedorCarritosDefault = require('../dao/carts/CartMongo')
    const ContenedorOrdenesDefault = require('../dao/orders/OrderMongo')
    const ContenedorMensajesDefault = require('../dao/messages/MessageMongo')

    logger.info('Using Mongo by default mode')

    handleProducts = new ContenedorProductosDefault()
    handleCarts = new ContenedorCarritosDefault()
    handleOrders = new ContenedorOrdenesDefault()
    handleMessages = new ContenedorMensajesDefault()

    break
}

module.exports = { handleProducts, handleCarts, handleOrders, handleMessages }
