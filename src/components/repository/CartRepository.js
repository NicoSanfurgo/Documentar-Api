const { loggerError, loggerBuy } = require('../../utils/logger')
const handleSubmitMail = require('../../utils/mailOptions')
const ContenedorOrdenes = require('./OrderRepository')
const OrderRepository = new ContenedorOrdenes()

const {
  handleSubmitWhatsapp,
  handleSubmitSMS,
} = require('../../utils/twilioOptions')

const { handleCarts } = require('../factory/Factory')

class CartRepository {
  async getProducts(id) {
    try {
      const cart = await handleCarts.getProducts(id)

      if (!cart) return { error: 'carrito no encontrado' }

      const productsInCart = cart.productos

      if (productsInCart.length === 0)
        return { message: `El carrito ID: ${id} no tiene productos todavía` }

      return productsInCart
    } catch (err) {
      return { error: 'carrito no encontrado' }
    }
  }

  async createCart(email, address) {
    try {
      const result = await handleCarts.createCart(email, address)

      return {
        message: `Se creó correctamente el carrito!`,
        id: result,
      }
    } catch (err) {
      loggerError.error(err)
    }
  }

  async addProductToCart(id, product) {
    try {
      return await handleCarts.addProductToCart(id, product)
    } catch (err) {
      return { error: 'Carrito no encontrado!' }
    }
  }

  async buyCart(buyInfo) {
    try {
      const { cart, email, personName, phone } = buyInfo

      const targetCart = await this.getProducts(cart)

      if (!Array.isArray(targetCart)) return { error: 'No hay productos en el carrito' }

      const productsName = targetCart.map((element) => element.nombre)
      const totalPrice = targetCart.reduce(
        (acc, element) => acc + parseInt(element.precio) * element.cantidad,
        0
      )

      const orderConfirm = await OrderRepository.createOrder(targetCart, email, totalPrice)

      if (orderConfirm.error) return { error: orderConfirm.error }

      this.deleteCart(cart)

      const mailOptions = {
        from: 'Servidor Ecommerce',
        to: process.env.EMAIL,
        subject: `Nuevo pedido recibido de ${personName}`,
        html: `
                    <h1>Nueva compra!</h1>
                    <p>Se compraron los siguientes productos</p>
                    <ul>
                        ${productsName
                          .map((element) => `<li>${element}</li>`)
                          .join('')}
                    </ul>
                    <p>Por un total de: $${totalPrice}</p>
                    <p>El pedido es a nombre de ${personName}</p>
                    <p>El email de contacto es: ${email}</p>
                    `,
      }

      const whatsappMsg = `Nueva compra!\n\nSe compraron los siguientes productos:\n${productsName
        .map((element) => `◆ ${element}`)
        .join(
          '\n'
        )}\n\nPor un total de: $${totalPrice}\n\nEl pedido es a nombre de ${personName} y su email es ${email}`

      const smsMsg = `Hola ${personName}! Te confirmamos que se recibió tu pedido correctamente. En breve nos comunicaremos con vos para coordinar la entrega. Gracias por elegirnos!`

      handleSubmitMail(mailOptions)
      handleSubmitWhatsapp(whatsappMsg)
      handleSubmitSMS(smsMsg, phone)

      loggerBuy.trace(
        `Se compraron los productos: ${productsName.join(
          ', '
        )} por un total de: $${totalPrice}`
      )

      return {
        message: `Se compraron los productos: ${productsName.join(
          ', '
        )} por un total de: $${totalPrice}`,
      }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async deleteProductFromCart(id, productId) {
    try {
      return await handleCarts.deleteProductFromCart(id, productId)
    } catch (err) {
      return { error: 'Carrito no encontrado!' }
    }
  }

  async deleteCart(id) {
    try {
      return await handleCarts.deleteCart(id)
    } catch (err) {
      return { error: 'carrito no encontrado' }
    }
  }

  async getAll() {
    try {
      return await handleCarts.getAll()
    } catch (error) {
      loggerError.error(error)
    }
  }
}

module.exports = CartRepository
