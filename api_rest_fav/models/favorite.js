'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema_favorite = new Schema({
  activity: String,
  created_at: Date,
  due_date_at: Date,
  activity_checked: Boolean
});
module.exports = mongoose.model('favoriteModel', schema_favorite, 'favorite_task');
