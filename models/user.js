var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var user = new Schema({
  //_id: mongoose.Schema.Types.ObjectId,  
  name: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, unique: true},
  status: {type: Number, required: true},  
  creation_date: {type: String},
}, {collection: 'users'});

module.exports = mongoose.model('user', user);