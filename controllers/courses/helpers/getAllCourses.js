const courses = require('../../../models/courses');
var utils = require('../../../config/utils');
var dateFormat = require("dateformat");

exports.getAllCourses = (req,res) => courses.find({}).sort({creation_date:-1}).lean().then(function(doc) {
  return doc;
}).catch(function(err) {
  utils.logException(err,req,"getAllCourses.getAllCourses");
  return null;
});

exports.updAllCourses = function(req,res) {
  return new Promise((resolve, reject) => {
    courses.updateMany({}, {$set:{"status": 0}},function(err, doc){
        if(err){
          utils.logException(err,req,"getAllCourses.updAllCourses");
          reject(err);
        } 
        else {
          resolve(doc._id);
        }
      });      
  });
};

exports.getCourse = (req,res) => courses.findOne({_id: req.query.id}).lean().then(function(doc) {
  doc.creation_date = dateFormat(new Date(doc.creation_date * 1000), "dd mmm, yyyy hh:MM:ss TT");
  return doc;
}).catch(function(err) {
  utils.logException(err,req,"getAdmUsers.getAdmOnlyUser");
  return null;
});

exports.getCoursesCount = courses.countDocuments(function(err, count){
  return count;
}).catch(function(err) {
  utils.logException(err,req,"getAllCourses.getCoursesCount");
  return null;
});