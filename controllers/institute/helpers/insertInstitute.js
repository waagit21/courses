const institutes=require('../../../models/institute');
const jwt_decode=require("jwt-decode");
const moment=require('moment');


exports.insertInstitute =  (req, res) => {
  try {
    //const value = jwt_decode(req.headers.authorization);
    let date = moment().unix().toString();
    req.body.creation_date = date;
    var que =  institutes.collection.insertOne(req.body);
    if (que) {
      return 1;
    }
    else {
      return null;
    }
  } 
  catch (err) {
    console.log(err);
    utils.logException(err,req,"insertInstitute.insertInstitute");
    return null;
  }
}

exports.updateInstitute = (req, res) => {
  try {
    //const value = jwt_decode(req.headers.authorization);
    let date = moment().unix().toString();
    req.body.updation_date = date;
    var que =  institutes.findByIdAndUpdate({_id: req.body.dataid},req.body);
    if (que) {
      return 1;
    }
    else {
      return null;
    }
  } catch (err) {
    console.log(err);
    utils.logException(err,req,"insertInstitute.updateInstitute");
    return null;
  }
}