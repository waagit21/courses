const courses=require('../../../models/courses');
const degree=require('../../../models/degree');
//const degree=require('../../../models/degree');
const jwt_decode=require("jwt-decode");
const moment=require('moment');
var dateFormat = require("dateformat");

exports.insertCourse =  (req, res) => {
  try {
    let date = moment().unix().toString();
    req.body.creation_date = date;   
    req.body.createdby = req.user.username; 
    req.body.owner_id = req.user.id;
    req.body.owner_type = 1;    
    req.body.isDegree = false;
    req.body.status = parseInt(req.body.status);

    req.body.startingDate = dateFormat(req.body.startingDate, "dd mmm, yyyy hh:MM:ss TT");
    req.body.endingDate = dateFormat(req.body.endingDate, "dd mmm, yyyy hh:MM:ss TT");
    delete req.body.dataid;
    var que =  courses.collection.insertOne(req.body);
    if (que) {
      return 1;
    }
    else {
      return null;
    }
  } 
  catch (err) {
    console.log(err);
    utils.logException(err,req,"insertCourse.insertCourse");
    return null;
  }
}

exports.updateCourse = async (req, res) => {
  try {
    let date = moment().unix().toString();
    req.body.updation_date = date;
    req.body.updatedby = req.user.username; 
    req.body.status = parseInt(req.body.status);

    req.body.startingDate = dateFormat(req.body.startingDate, "dd mmm, yyyy hh:MM:ss TT");
    req.body.endingDate = dateFormat(req.body.endingDate, "dd mmm, yyyy hh:MM:ss TT");

    var theid = req.body.dataid;
    delete req.body.dataid;
    var que =  await courses.findByIdAndUpdate({_id: theid},req.body, function(err, doc){
        if(err){
          return null;
        }
    });
    if (que) {
      return 1;
    }
    else {
      return null;
    }
  } catch (err) {
    console.log(err);
    utils.logException(err,req,"insertCourse.updateCourse");
    return null;
  }
}


exports.insertDegree =  (req, res) => {
  try {
    //const value = jwt_decode(req.headers.authorization);
    let date = moment().unix().toString();
    req.body.creation_date = date;   
    req.body.createdby = req.user.username; 
    req.body.owner_id = req.user.id;
    req.body.owner_type = 1;    
    req.body.isDegree = true;
    req.body.status = parseInt(req.body.status);

    req.body.startingDate = dateFormat(req.body.startingDate, "dd mmm, yyyy hh:MM:ss TT");
    req.body.endingDate = dateFormat(req.body.endingDate, "dd mmm, yyyy hh:MM:ss TT");

    delete req.body.dataid;
    // await courses.collection.insertOne(req.body,function(err, doc){
    //   if(err){
    //     utils.logException(err,req,"insertCourse.insertDegree");
    //     return null;
    //   } 
    //   else {
    //     return doc._id;
    //   }
    // });
    var que =  degree.collection.insertOne(req.body);
    if (que) {
      return 1;
    }
    else {
      return null;
    }
  } 
  catch (err) {
    console.log(err);
    utils.logException(err,req,"insertCourse.insertDegree");
    return null;
  }
}

exports.updateDegree = async (req, res) => {
  try {
    //const value = jwt_decode(req.headers.authorization);
    let date = moment().unix().toString();
    req.body.updation_date = date;
    req.body.updatedby = req.user.username; 
    req.body.status = parseInt(req.body.status);

    req.body.startingDate = dateFormat(req.body.startingDate, "dd mmm, yyyy hh:MM:ss TT");
    req.body.endingDate = dateFormat(req.body.endingDate, "dd mmm, yyyy hh:MM:ss TT");
    
    var theid = req.body.dataid;
    delete req.body.dataid;
    var que =  await degree.findByIdAndUpdate({_id: theid},req.body, function(err, doc){
      if(err){
        return null;
      }
    });
    if (que) {
      return 1;
    }
    else {
      return null;
    }
    // courses.findByIdAndUpdate({_id: req.body.dataid},req.body,function(err, doc){
    //   if(err){
    //     utils.logException(err,req,"insertCourse.updateDegree");
    //     return null;
    //   } 
    //   else {
    //     return doc._id;
    //   }
    // });
  } catch (err) {
    console.log(err);
    utils.logException(err,req,"insertCourse.updateDegree");
    return null;
  }
}