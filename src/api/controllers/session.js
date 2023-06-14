const { loggerError } = require('../../utils/logger')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const generateToken = (user) => {
  const token = jwt.sign({ data: user }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })
  return token
}

const mainRoute = async (req, res) => {
  req.session.email = req.user.email
  req.session.avatar = req.user.avatar
  req.session.personName = req.user.personName
  req.session.phone = req.user.phone
  req.session.role = req.user.role
  req.session.address = req.user.address

  const token = generateToken(req.user)
  req.session.token = token

  res.redirect('/pages/ecommerce.html')
}

const loginRoute = passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/pages/login-error.html',
  passReqToCallback: true,
})

const registerRoute = passport.authenticate('singup', {
  successRedirect: '/',
  failureRedirect: '/pages/register-error.html',
  passReqToCallback: true,
})

const logoutRoute = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      loggerError.error(err)
      return next(err)
    }

    req.session.destroy()
    res.redirect('/')
  })
}

const getNameRoute = async (req, res) => {
  res.send({
    email: req.session.email,
    avatar: req.session.avatar,
    personName: req.session.personName,
    phone: req.session.phone,
    role: req.session.role,
    token: req.session.token,
    address: req.session.address,
  })
}

module.exports = {
  mainRoute,
  loginRoute,
  registerRoute,
  logoutRoute,
  getNameRoute,
}
