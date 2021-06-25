const courses = require('../../../models/courses');
var utils = require('../../../config/utils');
var endecode = require('../../../config/endecode');
var dateFormat = require("dateformat");
const configkeys = require("../../../config/default.json");
const moment=require('moment');
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
    if(req.user.type==4){
      input = { owner_id: req.user.id , owner_type: 1 };
    }
    //const input = { "courseName":  "My second Degree" };
    courses.find(input).lean().then(function(doc) { //.sort({creation_date:-1})
        doc.forEach(item => { 
          item.creation_date = dateFormat(new Date(item.creation_date * 1000), "dd mmm, yyyy hh:MM:ss TT");
        }); 
        resolve(doc);        
      }).catch(function(err) {
        utils.logException(err,req,"getAllCourses.getAllCourses");
        reject(err);
      });      
  });
};

exports.getCourses = function(req,res) {
  return new Promise((resolve, reject) => {
    const options = {
      //page: parseInt(req.pg.page) || 1,
      page: 1,
      limit: configkeys.pagelimit,
      sort: { _id: -1 },
    };
    var input = {};
    if (req.query.adm !== undefined && req.query.adm !== "") {
      input = { owner_id: (endecode.decryptstr(req.query.adm)) , owner_type: 1 }; //owner_type:  { $in: [1,0]} 
    }
    else if (req.query.web !== undefined && req.query.web !== "") {
      input = { owner_id: endecode.decryptstr(req.query.web) , owner_type: 0 };
    }
    if(req.user.type==4){
      input = { owner_id: req.user.id , owner_type: 1 };
    }
    courses.paginate(input, options, function (err, doc) {
        if(err){
          utils.logException(err,req,"getAllCourses.getCourses");
        }
        doc.docs.forEach(item => { 
          item.creation_date = dateFormat(new Date(item.creation_date * 1000), "dd mmm, yyyy hh:MM:ss TT");
        }); 
        resolve(doc);        
      }).catch(function(err) {
        utils.logException(err,req,"getAllCourses.getCourses");
        reject(err);
      });      
  });
};

exports.getMoreCourses = async(req,res) => {
  try{
    let id= req.params.id;
    const options = {
      page: parseInt(id) || 1,
      limit: configkeys.pagelimit,
      sort: { _id: -1 },
    };
    var input = {};
    if (req.query.adm !== undefined && req.query.adm !== "") {
      input = { owner_id: (endecode.decryptstr(req.query.adm)) , owner_type: 1 }; //owner_type:  { $in: [1,0]} 
    }
    else if (req.query.web !== undefined && req.query.web !== "") {
      input = { owner_id: endecode.decryptstr(req.query.web) , owner_type: 0 };
    }
    if(req.user.type==4){
      input = { owner_id: req.user.id , owner_type: 1 };
    }
    let response = await courses.paginate(input, options, function (err, doc) {
        if(err){
            utils.logException(err,req,"getAllCourses.getMoreCourses");
            res.json({
                success:true,
                data:null
            })
        }
        else{
            res.json({
                success:true,
                data:doc
            })
        }    
    })
  }catch(err){
      utils.logException(err,req,"getAllCourses.getMoreCourses");
      res.json({
          success:false,
          data:err
      })
  }
}

exports.getSearchCourses = async(req,res) => {
  try{
    var input = {};
    if (req.query.adm !== undefined && req.query.adm !== "") {
      input = { owner_id: (endecode.decryptstr(req.query.adm)) , owner_type: 1 }; //owner_type:  { $in: [1,0]} 
    }
    else if (req.query.web !== undefined && req.query.web !== "") {
      input = { owner_id: endecode.decryptstr(req.query.web) , owner_type: 0 };
    }
    if(req.user.type==4){
      input = { owner_id: req.user.id , owner_type: 1 };
    }

    if(req.body.startingDate!="" && req.body.endingDate!=""){
      var ts1 = moment(req.body.startingDate, "YYYY/MM/DD").unix();
      var ts2 = moment(req.body.endingDate, "YYYY/MM/DD").unix();
      //input = { creation_date: {$gt : ts1, $lt : ts2} };
      input['creation_date'] = {$gt : ts1, $lt : ts2} ;
    }   
    if(req.body.status!=""){
      input['status'] = req.body.status;
    }
    let id= req.params.id;
    const options = {
      page: parseInt(id) || 1,
      limit: configkeys.pagelimit,
      sort: { _id: -1 },
    };
    let response = await courses.paginate(input, options, function (err, doc) {
        if(err){
            utils.logException(err,req,"getAllCourses.getSearchCourses");
            res.json({
                success:true,
                data:null
            })
        }
        else{
            res.json({
                success:true,
                data:doc
            })
        }    
    })
  }catch(err){
      utils.logException(err,req,"getAllCourses.getSearchCourses");
      res.json({
          success:false,
          data:err
      })
  }
}

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
  if(doc.facultyInformation!=undefined && doc.facultyInformation.length>0) {   
    doc.facultyInformation.forEach(item => { 
      if (item.facultyResume.split('.')[1].toLowerCase() == 'pdf') {
        arrfiles.push("pdf.jpg")
      } 
      else if (item.facultyResume.split('.')[1].toLowerCase() == 'doc' || item.facultyResume.split('.')[1].toLowerCase() == 'docx' ) {
        arrfiles.push("docx.jpg")
      } 
      else {
        arrfiles.push("file.jpg")
      } 
    }); 
  }  
  doc.fileImages = arrfiles;
  // var arrfiles = [];
  // if(doc.facultyResume!=undefined && doc.facultyResume.length>0) {   
  //   doc.facultyResume.forEach(item => { 
  //     if (item.split('.')[1].toLowerCase() == 'pdf') {
  //       arrfiles.push("pdf.jpg")
  //     } 
  //     else if (item.split('.')[1].toLowerCase() == 'doc' || item.split('.')[1].toLowerCase() == 'docx' ) {
  //       arrfiles.push("docx.jpg")
  //     } 
  //     else {
  //       arrfiles.push("file.jpg")
  //     } 
  //   }); 
  // }  
  // doc.fileImages = arrfiles;
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