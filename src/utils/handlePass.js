const bCrypt = require('bcrypt')

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password)
}

module.exports = { createHash, isValidPassword }