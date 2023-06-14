const isLoggedMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(401).json({ error: -1, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizada` })
    }
}

module.exports = isLoggedMiddleware