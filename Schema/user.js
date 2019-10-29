const { Schema, db } = require('./config');

const UserSchema = new Schema({
  username: String,
  password: String,
  role: {
    type: String,
    default: '用户'
  },
  avatar: {
    type: String,
    default: ''
  }
}) 


module.exports = UserSchema