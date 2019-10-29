const mongoose = require('mongoose');

const baseUrl = 'localhost:27017';

const db = mongoose.createConnection('mongodb://' + baseUrl + '/blog', {
  useNewUrlParser: true ,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

mongoose.Promise = Promise;

module.exports = {
  db,
  Schema
}