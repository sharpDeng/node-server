const { db } =  require('../Schema/config')
const UserSchema = require('../Schema/user.js')

const user = db.model('users', UserSchema)

module.exports = user