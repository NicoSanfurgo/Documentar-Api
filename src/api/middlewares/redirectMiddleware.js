const redirectMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/pages/login.html')
    }
}

module.exports = redirectMiddleware