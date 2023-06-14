const mongoose = require('mongoose')
const { ProductosModel } = require('../../model/productosModel')
const { loggerError } = require('../../../utils/logger')
const {
  ProductMongoDto,
  ProductNormaliceIdDto,
} = require('../../dto/ProductDTO')

mongoose.connect(
  process.env.DB_URL_MONGO,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) loggerError.error(err)
  }
)

class ProductMongo {
  async getById(id) {
    try {
      const product = await ProductosModel.findById(id)
      const normalicedIdProduct = new ProductNormaliceIdDto(product)

      return normalicedIdProduct
    } catch (error) {
      return { error: 'Producto no encontrado' }
    }
  }

  async getByCategory(category) {
    try {
      const allProducts = await this.getAll()

      const productsByCategory = allProducts.filter(
        (product) => product.categoria.toLowerCase() == category.toLowerCase()
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
      const newProduct = new ProductosModel(new ProductMongoDto(product))

      await newProduct.save()

      return { message: `Producto ${product.nombre} guardado!` }
    } catch (err) {
      return { error: 'Producto no guardado, faltan datos' }
    }
  }

  async updateById(id, newData) {
    try {
      const allProducts = await this.getAll()
      const targetProduct = allProducts.find((prod) => prod.id == id)

      if (!targetProduct) return { error: 'Producto no encontrado' }

      await ProductosModel.updateOne({ _id: id }, newData)

      return { message: `Producto id: ${id} actualizado` }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async deleteById(id) {
    try {
      const allProducts = await this.getAll()
      const targetProduct = allProducts.find((prod) => prod.id == id)

      if (!targetProduct) return { error: 'Producto no encontrado' }

      await ProductosModel.deleteOne({ _id: id })

      return { message: `Producto id: ${id} eliminado` }
    } catch (error) {
      loggerError.error(error)
    }
  }

  async getAll() {
    try {
      const allProducts = await ProductosModel.find()

      const normalicedIdProducts = allProducts.map(
        (product) => new ProductNormaliceIdDto(product)
      )

      return normalicedIdProducts
    } catch (error) {
      loggerError.error(error)
    }
  }
}

module.exports = ProductMongo
