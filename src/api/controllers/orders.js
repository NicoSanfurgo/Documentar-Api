const OrderRepository = require('../../components/repository/OrderRepository')
const handleOrders = new OrderRepository()

const getOrders = async (req, res) => {
  const { id } = req.params

  if (id) {
    const result = await handleOrders.getOrderById(id)
    res.json(result)
  } else {
    const orders = await handleOrders.getOrders()
    res.json(orders)
  }
}

const markOrderAsCompleted = async (req, res) => {
  const { id } = req.params
  const result = await handleOrders.markOrderAsCompleted(id)
  res.json(result)
}

module.exports = {
  getOrders,
  markOrderAsCompleted,
}
