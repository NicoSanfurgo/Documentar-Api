const { ProductFirebaseDto } = require('../../dto/ProductDTO')
const { loggerError } = require('../../../utils/logger')

class ProductFirebase {
  constructor(db) {
    this.db = db
  }

  async getById(id) {
    try {
      const productsCollection = this.db.collection('productos')
      const querySnapshot = await productsCollection.get()
      const allProducts = querySnapshot.docs.map((doc) => doc.data())

      const targetProduct = allProducts.find((prod) => prod.id == id)

      if (!targetProduct) return { error: 'producto no encontrado' }

      return targetProduct
    } catch (error) {
      loggerError.error(error)
    }
  }

  async getByCategory(category) {
    try {
      const productsCollection = this.db.collection('productos')
      const querySnapshot = await productsCollection.get()

      const allProducts = querySnapshot.docs.map((doc) => doc.data())

      const productsByCategory = allProducts.filter(
        (prod) => prod.categoria.toLowerCase() == category.toLowerCase()
      )

      if (productsByCategory.length == 0)
        return { message: 'No hay productos en esta categoría' }

      return productsByCategory
    } catch (error) {
      loggerError.error(error)
    }
  }

  async save(product) {
    try {
      const productsCollection = this.db.collection('productos')

      const newProduct = new ProductFirebaseDto(product)

      await productsCollection.add({ ...newProduct })

      return {
        message: `Producto ${newProduct.nombre} guardado con el id ${newProduct.id}`,
      }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async updateById(id, newData) {
    try {
      const productsCollection = this.db.collection('productos')
      const querySnapshot = await productsCollection.get()

      const allProducts = querySnapshot.docs.map((doc) => doc.data())
      const targetProduct = allProducts.find((prod) => prod.id == id)

      if (!targetProduct) return { error: 'Producto no encontrado' }

      const productId = querySnapshot.docs.find((doc) => doc.data().id == id).id

      await productsCollection.doc(productId).update(newData)

      return { message: `Producto id: ${id} actualizado` }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async deleteById(id) {
    try {
      const productsCollection = this.db.collection('productos')
      const querySnapshot = await productsCollection.get()
      const allProducts = querySnapshot.docs.map((doc) => doc.data())

      const targetProduct = allProducts.find((prod) => prod.id == id)

      if (!targetProduct) return { error: 'Producto no encontrado' }

      const productId = querySnapshot.docs.find((doc) => doc.data().id == id).id

      await productsCollection.doc(productId).delete()

      return { message: `Producto id: ${id} eliminado` }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async getAll() {
    try {
      const productsCollection = this.db.collection('productos')
      const querySnapshot = await productsCollection.get()
      const allProducts = querySnapshot.docs.map((doc) => doc.data())

      return allProducts
    } catch (error) {
      loggerError.error(error)
    }
  }
}

module.exports = ProductFirebase
