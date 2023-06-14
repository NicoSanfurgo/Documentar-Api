const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./src/config/config')
const { logger, loggerWarn } = require('./src/utils/logger')
const chat = require('./src/utils/chatSocket')
const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')
const routerProducts = require('./src/api/routes/products')
const routerCarts = require('./src/api/routes/carts')
const routerOrders = require('./src/api/routes/orders')
const routerSessions = require('./src/api/routes/session')
const routerMessages = require('./src/api/routes/messages')
const passport = require('./src/utils/passport')
const cluster = require('cluster')
const cpuQuantity = require('os').cpus().length
const MODE = process.env.MODE

if (MODE === 'cluster' && cluster.isMaster) {
  logger.info(`Master ${process.pid} is running in ${MODE} mode`)
  logger.info(`Numero de procesadores: ${cpuQuantity}`)

  for (let i = 0; i < cpuQuantity; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker) => {
    loggerWarn.warn(
      `worker ${worker.process.pid} died, ${new Date().toLocaleString()}`
    )
    cluster.fork()
  })
} else {

  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static('public'))

  const session = require('express-session')

  app.use(session(config.sessionConfig))

  app.use(passport.initialize())
  app.use(passport.session())

  const httpServer = new HttpServer(app);
  const io = new Socket(httpServer);

  chat.listen(io);

  app.use('/api/productos', routerProducts)
  app.use('/api/carrito', routerCarts)
  app.use('/api/ordenes', routerOrders)
  app.use('/api/mensajes', routerMessages)
  app.use('/', routerSessions)

  app.use((req, res) => {
    res.status(404).json({
      error: -2,
      descripcion: `ruta '${req.path}' método '${req.method}' no implementada`,
    })
  })

  const server = httpServer.listen(config.port, () =>
    logger.info(
      `Servidor http escuchando en el puerto ${server.address().port}`
    )
  )
  server.on('error', (error) => logger.error(`Error en servidor ${error}`))
}