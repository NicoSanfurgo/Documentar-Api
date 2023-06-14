const { loggerError } = require('../../utils/logger')
const { handleOrders } = require('../factory/Factory')

class OrderRepository {
  async getOrders() {
    try {
      return await handleOrders.getOrders()
    } catch (err) {
      loggerError.error(err)
    }
  }

  async getOrderById(id) {
    try {
      return await handleOrders.getOrderById(id)
    } catch (err) {
      loggerError.error(err)
    }
  }

  async createOrder(products, email, totalPrice) {
    try {
      return await handleOrders.createOrder(products, email, totalPrice)
    } catch (err) {
      loggerError.error(err)
    }
  }

  async markOrderAsCompleted(id) {
    try {
      return await handleOrders.markOrderAsCompleted(id)
    } catch (err) {
      loggerError.error(err)
    }
  }
}

module.exports = OrderRepository
