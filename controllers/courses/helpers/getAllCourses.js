const courses = require('../../../models/courses');
var utils = require('../../../config/utils');
var endecode = require('../../../config/endecode');
var dateFormat = require("dateformat");
//var ObjectId = require('mongoose').Types.ObjectId;
//const mongoose = require('mongoose')
//const ObjectId = require('mongodb').ObjectId;


// exports.getAllCourses = (req,res) => courses.find({}).sort({creation_date:-1}).lean().then(function(doc) {
//   return doc;
// }).catch(function(err) {
//   utils.logException(err,req,"getAllCourses.getAllCourses");
//   return null;
// });

exports.getAllCourses = function(req,res) {
  return new Promise((resolve, reject) => {
    var input = {};
    if (req.query.adm !== undefined && req.query.adm !== "") {
      input = { owner_id: (endecode.decryptstr(req.query.adm)) , owner_type: 1 }; //owner_type:  { $in: [1,0]} 
    }
    else if (req.query.web !== undefined && req.query.web !== "") {
      input = { owner_id: endecode.decryptstr(req.query.web) , owner_type: 0 };
    }
    //const input = { "courseName":  "My second Degree" };
    courses.find(input).lean().then(function(doc) { //.sort({creation_date:-1})
        resolve(doc);        
      }).catch(function(err) {
        utils.logException(err,req,"getAllCourses.getAllCourses");
        reject(err);
      });      
  });
};

exports.updAllCourses = function(req,res) {
  return new Promise((resolve, reject) => {
    courses.updateMany({}, {$set:{"owner_type": 0}},function(err, doc){
        if(err){
          utils.logException(err,req,"getAllCourses.updAllCourses");
          reject(err);
        } 
        else {
          resolve("ok");
        }
      });      
  });
};

exports.getCourseById = (req,res) => courses.findOne({_id: req.query.id}).lean().then(function(doc) {
  doc.creation_date = dateFormat(new Date(doc.creation_date * 1000), "dd mmm, yyyy hh:MM:ss TT");
  if(doc.updation_date!="" && doc.updation_date!=null){
    doc.updation_date = dateFormat(new Date(doc.updation_date * 1000), "dd mmm, yyyy hh:MM:ss TT");
  }
  var arrfiles = [];
  if(doc.facultyResume!=undefined && doc.facultyResume.length>0) {   
    doc.facultyResume.forEach(item => { 
      if (item.split('.')[1].toLowerCase() == 'pdf') {
        arrfiles.push("pdf.jpg")
      } 
      else if (item.split('.')[1].toLowerCase() == 'doc' || item.split('.')[1].toLowerCase() == 'docx' ) {
        arrfiles.push("docx.jpg")
      } 
      else {
        arrfiles.push("file.jpg")
      } 
    }); 
  }  
  doc.fileImages = arrfiles;
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