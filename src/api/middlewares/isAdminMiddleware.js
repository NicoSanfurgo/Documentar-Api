const jwt = require('jsonwebtoken')
const { loggerWarn } = require('../../utils/logger')

const isAdminMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).send({
      error: 'No se proporcionó un token de autenticación',
    })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.data.role === 'admin') {
      req.user = decoded
      next()
    } else {
      loggerWarn.warn(
        `Un usuario sin los permisos suficientes intentó hacer una transacción en la ruta '${req.path}' método '${req.method}'`
      )
      res.status(403).send({
        error: 'No tiene los permisos suficientes para realizar esta acción',
      })
    }
  } catch (err) {
    loggerWarn.error(`Error al verificar el token de autenticación: ${err}`)
    res.status(401).send({ error: 'Token de autenticación inválido' })
  }
}

module.exports = isAdminMiddleware
