const { loggerError } = require('../../../utils/logger')
const { CartFirebaseDto } = require('../../dto/CartDTO')

class CartFirebase {
  constructor(db) {
    this.db = db
  }

  async getProducts(id) {
    try {
      const cartsCollection = this.db.collection('carritos')
      const querySnapshot = await cartsCollection.get()
      const allCarts = querySnapshot.docs.map((doc) => doc.data())

      return allCarts.find((cart) => cart.id === id)
    } catch (error) {
      loggerError.error(error)
    }
  }

  async createCart(email, address) {
    try {
      const cartsCollection = this.db.collection('carritos')

      const newCart = new CartFirebaseDto(email, address)

      await cartsCollection.add({ ...newCart })

      return newCart.id
    } catch (error) {
      loggerError.error(error)
    }
  }

  async addProductToCart(id, product) {
    try {
      const cartsCollection = this.db.collection('carritos')
      const querySnapshot = await cartsCollection.get()
      const allCarts = querySnapshot.docs.map((doc) => doc.data())

      const targetCart = allCarts.find((cart) => cart.id == id)

      if (!targetCart) return { error: 'Carrito no encontrado' }

      const cartId = querySnapshot.docs.find((doc) => doc.data().id == id).id

      const products = targetCart.productos
      const targetProduct = products.find((prod) => prod.id == product.id)

      if (targetProduct) {
        targetProduct.cantidad += 1
      } else {
        product.cantidad = 1
        products.push(product)
      }

      if (targetProduct?.cantidad > targetProduct?.stock) {
        return { error: 'Ya tienes la cantidad máxima para esta unidad según su stock' }
      }

      await cartsCollection.doc(cartId).update({ productos: products })

      return {
        message: `Se agregó el producto: '${product.nombre}' al carrito`,
      }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async deleteProductFromCart(id, productId) {
    try {
      const cartsCollection = this.db.collection('carritos')
      const querySnapshot = await cartsCollection.get()
      const allCarts = querySnapshot.docs.map((doc) => doc.data())

      const targetCart = allCarts.find((cart) => cart.id == id)

      if (!targetCart) return { error: 'Carrito no encontrado!' }

      const cartId = querySnapshot.docs.find((doc) => doc.data().id == id).id

      const products = targetCart.productos

      const targetProduct = products.find((prod) => prod.id == productId)

      if (!targetProduct)
        return { error: `Ese producto no se encuentra en el carrito ID: ${id}` }

      const filteredProducts = products.filter((prod) => prod.id != productId)

      await cartsCollection.doc(cartId).update({ productos: filteredProducts })

      return {
        message: `Se eliminó el producto: '${targetProduct.nombre}' del carrito`,
      }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async deleteCart(id) {
    try {
      const cartsCollection = this.db.collection('carritos')
      const querySnapshot = await cartsCollection.get()
      const allCarts = querySnapshot.docs.map((doc) => doc.data())

      const cart = allCarts.find((cart) => cart.id == id)

      if (!cart) return { error: 'Carrito no encontrado' }

      const cartId = querySnapshot.docs.find((doc) => doc.data().id == id).id

      await cartsCollection.doc(cartId).delete()

      return { message: `Se eliminó el carrito ID: ${id}` }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async getAll() {
    try {
      const cartsCollection = this.db.collection('carritos')
      const querySnapshot = await cartsCollection.get()
      const allCarts = querySnapshot.docs.map((doc) => doc.data())

      return allCarts
    } catch (error) {
      loggerError.error(error)
    }
  }
}

module.exports = CartFirebase
