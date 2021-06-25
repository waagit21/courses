const courses=require('../../../models/courses');
const degree=require('../../../models/degree');
//const degree=require('../../../models/degree');
const configkeys = require("../../../config/default.json");
const jwt_decode=require("jwt-decode");
const moment=require('moment');
var dateFormat = require("dateformat");
const axios = require('axios');
const FormData = require('form-data');
var fs = require('fs');

isArray = function(a) {
  return (!!a) && (a.constructor === Array);
};
convertToArray = function(data) {
  var arr = []; 
  if(!isArray(data)) {   
    arr.push(data);
  }
  else{
    for (var key in data) {
      if(data[key]!="" && data[key]!=null){
        arr.push(data[key]);
      }          
    }
  }           
  return arr;
};

exports.insertCourse =  (req, res) => {
    return new Promise((resolve, reject) => {
      req.body.facultyInformation = [];
      var faculty = {
        facultyName: req.body.facultyName,
        facultyResume: req.body.facultyResume[0],
      };
      req.body.facultyInformation.push(faculty);
      let date = moment().unix().toString();
      req.body.creation_date = date;   
      req.body.createdby = req.user.username; 
      req.body.owner_id = req.user.id;
      req.body.owner_type = 1;    
      req.body.isDegree = false;
      req.body.status = parseInt(req.body.status);

      req.body.startingDate = dateFormat(req.body.startingDate, "dd mmm, yyyy hh:MM:ss TT");
      req.body.endingDate = dateFormat(req.body.endingDate, "dd mmm, yyyy hh:MM:ss TT");

      if(req.body.part=="No"){
        delete req.body.programSpecs;
        delete req.body.programName;
        delete req.body.programType;
      }
      delete req.body.dataid;
      req.facultyName = req.body.facultyName;
      delete req.body.facultyName;
      delete req.body.facultyResume;
      courses.collection.insertOne(req.body).then(result => {
        console.log(result);
        resolve(result.insertedId);
      }).catch(err => {
        utils.logException(err,req,"insertCourse.insertCourse");
        reject(null);
      });
    });
  //try {
    //var que = courses.collection.insertOne(req.body);
    // if (que) {
    //   return 1;
    // }
    // else {
    //   return null;
    // }
  // } 
  // catch (err) {
  //   console.log(err);
  //   utils.logException(err,req,"insertCourse.insertCourse");
  //   return null;
  // }
}

exports.updateCourse =  (req, res) => {
  try {
    let date = moment().unix().toString();
    req.body.updation_date = date;
    req.body.updatedby = req.user.username; 
    req.body.status = parseInt(req.body.status);

    req.body.startingDate = dateFormat(req.body.startingDate, "dd mmm, yyyy hh:MM:ss TT");
    req.body.endingDate = dateFormat(req.body.endingDate, "dd mmm, yyyy hh:MM:ss TT");

    if(req.body.part=="No"){
      delete req.body.programSpecs;
      delete req.body.programName;
      delete req.body.programType;
    }
    var theid = req.body.dataid;
    delete req.body.dataid;
    var que =  courses.findByIdAndUpdate({_id: theid},req.body, function(err, doc){
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

exports.updateCourseFile =  (req, res) => {
  try {
    const form = new FormData();    
    //form.append('my_field', 'my value');
    //form.append('my_buffer', new Buffer(10));
    form.append('facultyInformation', fs.createReadStream(req.files[0].path)); //"C:\\Users\\pc\\programs\\admin\\"
    axios.post(configkeys.siteurl + '/images', form, { headers: form.getHeaders() }).then(function (response) {
      var facultyInformation = [];
      var faculty = {
        facultyName: req.facultyName,
        facultyResume: response.data.data[0].path,
      };
      facultyInformation.push(faculty);
      var que = courses.findByIdAndUpdate({_id: req.objid},{ facultyInformation: facultyInformation }, function(error, doc){
        if(error){
          return null;
        }
        else{
          fs.unlink(req.files[0].path,function(err){
            if(err) return console.log(err);
            console.log('File deleted successfully');
          });  
        }
      });
      if (que) {
        return 1;
      }
      else {
        return null;
      }      
    }).catch(function (err) {
      console.log(err);
      utils.logException(err,req,"insertCourse.updateCourseFile");
      return null;
    });
  } catch (err) {
    console.log(err);
    utils.logException(err,req,"insertCourse.updateCourseFile");
    return null;
  }
}

exports.insertDegree =  (req, res) => {
  return new Promise((resolve, reject) => {
    //const value = jwt_decode(req.headers.authorization);
    // console.log("faculty");
    // console.log(req.body.facultyName);
    // console.log(req.body.facultyResume);
    req.body.facultyInformation = [];
    for (var i = 0; i < req.body.facultyName.length; i++) {
      // var facultyResume = "";
      // for (var j = 0; j < req.body.facultyResume[i].length; j++) {
      //   if(j==0){
      //     facultyResume += req.body.facultyResume[j];
      //   }
      //   else{
      //     facultyResume += ","+req.body.facultyResume[j];
      //   }        
      // }
      var faculty = {
        facultyName: req.body.facultyName[i],
        facultyResume: req.body.facultyResume[i],
      };
      req.body.facultyInformation.push(faculty);
    }
    //console.log(req.body.facultyInformation);
    
    req.body.course = convertToArray(req.body.course);
    req.body.online = convertToArray(req.body.online);
    req.body.offline = convertToArray(req.body.offline);
    req.body.compulsory = convertToArray(req.body.compulsory);
    req.body.optional = convertToArray(req.body.optional);
         
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
    req.facultyName = req.body.facultyName;
    delete req.body.facultyName;
    delete req.body.facultyResume;
    degree.collection.insertOne(req.body).then(result => {
      console.log(result);
      resolve(result.insertedId);
    }).catch(err => {
      utils.logException(err,req,"insertCourse.insertCourse");
      reject(null);
    });
  });

  // try {
  //   // convertArray = function(a) {
  //   //   var arr = [];      
  //   //   return arr.push(a);
  //   // };
  //   //req.body.course = (!isArray(req.body.course)) ? convertArray(req.body.course) : req.body.course;
  //   // if(!isArray(req.body.course)){
  //   //   var val = req.body.course;
  //   //   req.body.course = [];      
  //   //   req.body.course.push(val);
  //   // }

  //   // req.body.field_array=[];
  //   // if(isArray(req.body.field_name)){      
  //   //   var arr = req.body.field_name;
  //   //   for (var key in req.body.field_name) {
  //   //     req.body.field_array.push(req.body.field_name[key]);
  //   //   }
  //   // }
  //   // else{
  //   //   req.body.field_array.push(req.body.field_name);
  //   // } 

  //   // for ( const [key,value] of Object.entries( req.body.field_name ) ) {
  //   //   console.log(key, value);
  //   // }
  //   // req.body.field_name.forEach((key, index) => {
  //   //     console.log(key+" "+ req.body.field_name[key]);
  //   //     req.body.field_array.push(req.body.field_name[key]);
  //     // });


  //   // await courses.collection.insertOne(req.body,function(err, doc){
  //   //   if(err){
  //   //     utils.logException(err,req,"insertCourse.insertDegree");
  //   //     return null;
  //   //   } 
  //   //   else {
  //   //     return doc._id;
  //   //   }
  //   // });    
  // } 
  // catch (err) {
  //   console.log(err);
  //   utils.logException(err,req,"insertCourse.insertDegree");
  //   return null;
  // }
}

exports.updateDegree = async (req, res) => {
  try {
    //const value = jwt_decode(req.headers.authorization);

    req.body.course = convertToArray(req.body.course);
    req.body.online = convertToArray(req.body.online);
    req.body.offline = convertToArray(req.body.offline);
    req.body.compulsory = convertToArray(req.body.compulsory);
    req.body.optional = convertToArray(req.body.optional);
    
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

exports.updateDegreeFile =  (req, res) => {
  try {
    const form = new FormData();    
    //form.append('my_field', 'my value');
    //form.append('my_buffer', new Buffer(10));
    for (var i = 0; i < req.files.length; i++) {
      form.append('facultyInformation', fs.createReadStream(req.files[i].path));
    }
    axios.post(configkeys.siteurl + '/images', form, { headers: form.getHeaders() }).then(function (response) {
      var facultyInformation = [];
      for (var i = 0; i < req.facultyName.length; i++) {
        var faculty = {
          facultyName: req.facultyName[i],
          facultyResume: response.data.data[i].path,
        };
       facultyInformation.push(faculty);
      }
      var que = courses.findByIdAndUpdate({_id: req.objid},{ facultyInformation: facultyInformation }, function(error, doc){
        if(error){
          return null;
        }
        else{
          for (var i = 0; i < req.facultyName.length; i++) {
            fs.unlink(req.files[i].path,function(err){
              if(err) return console.log(err);
              console.log('File deleted successfully');
            }); 
          }           
        }
      });
      if (que) {
        return 1;
      }
      else {
        return null;
      }      
    }).catch(function (err) {
      console.log(err);
      utils.logException(err,req,"insertCourse.updateDegreeFile");
      return null;
    });
  } catch (err) {
    console.log(err);
    utils.logException(err,req,"insertCourse.updateDegreeFile");
    return null;
  }
}