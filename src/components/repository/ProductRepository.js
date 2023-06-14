const { loggerError } = require('../../utils/logger')
const { handleProducts } = require('../factory/Factory')

class ProductRepository {
  async getById(id) {
    try {
      const product = await handleProducts.getById(id)

      if (!product) return { error: 'Producto no encontrado' }

      return product
    } catch (error) {
      return { error: 'Producto no encontrado' }
    }
  }

  async getByCategory(category) {
    try {
      return await handleProducts.getByCategory(category)
    } catch (error) {
      loggerError.error(error)
    }
  }

  async save(product) {
    try {
      return await handleProducts.save(product)
    } catch (err) {
      loggerError.error(err)
    }
  }

  async updateById(id, newData) {
    try {
      return await handleProducts.updateById(id, newData)
    } catch (error) {
      loggerError.error(error)
    }
  }

  async deleteById(id) {
    try {
      return await handleProducts.deleteById(id)
    } catch (error) {
      loggerError.error(error)
    }
  }

  async getAll() {
    try {
      return await handleProducts.getAll()
    } catch (error) {
      loggerError.error(error)
    }
  }
}

module.exports = ProductRepository
