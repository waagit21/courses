const user = require('../../../models/user');
var endecode = require('../../../config/endecode');
var utils = require('../../../config/utils');
var dateFormat = require("dateformat");
//var functions = require('../../../config/functions');
//var moment = require('moment');

exports.getWebUsers = (req,res) => user.find().lean().then(function(doc) {
  doc.forEach(item => { 
    //item.created = functions.formatDateTime(item.created);
    item.creation_date = dateFormat(new Date(item.creation_date * 1000), "dd mmm, yyyy hh:MM:ss TT");
    //item.creation_date = moment(new Date(item.creation_date * 1000)).format('DD MMM, yyyy hh:mm:ss A');
    item.webid = endecode.encryptstr(item._id);
  }); 
  return doc;
}).catch(function(err) {
  utils.logException(err,req,"getWebUsers.getWebUsers");
  return null;
});

exports.getWebOnlyUser = (req,res) => user.findOne({_id: endecode.decryptstr(req.usrid)}).lean().then(function(doc) {
  doc.admid = req.usrid;
  return doc;
}).catch(function(err) {
  utils.logException(err,req,"getWebUsers.getWebOnlyUser");
  return null;
});

exports.getWebByUsername = (req,res) => user.findOne({username: req}).lean().then(function(doc) {
  return endecode.encryptstr(doc._id);
}).catch(function(err) {
  utils.logException(err,req,"getWebUsers.getWebByUsername");
  return err;
});

exports.getWebCount = user.countDocuments(function(err, count){
  return count;
}).catch(function(err) {
  utils.logException(err,req,"getWebUsers.getWebCount");
  return null;
});