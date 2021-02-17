const institutes = require('../../../models/institute');
var utils = require('../../../config/utils');
var dateFormat = require("dateformat");

exports.getAllInstitutes = (req,res) => institutes.find({}).sort({creation_date:-1}).lean().then(function(doc) {
  return doc;
}).catch(function(err) {
  utils.logException(err,req,"getAllInstitutes.getAllInstitutes");
  return null;
});

exports.getInstituteById = (req,res) => institutes.findOne({_id: req.query.id}).lean().then(function(doc) {
  doc.creation_date = dateFormat(new Date(doc.creation_date * 1000), "dd mmm, yyyy hh:MM:ss TT");
  //doc.campuses = doc.campuses.toString();
  return doc;
}).catch(function(err) {
  utils.logException(err,req,"getAllInstitutes.getInstituteById");
  return null;
});

exports.getInstitutesCount = institutes.countDocuments(function(err, count){
  return count;
}).catch(function(err) {
  utils.logException(err,req,"getAllInstitutes.getInstitutesCount");
  return null;
});

exports.getMoreInstitutes=async(req,res)=>{
  try{    
    let newobj=await institutes.find({}).sort({creation_date:-1});
    res.json({
        success:true,
        data:newobj
    })
  }catch(err){
    res.json({
        success:false,
        data:err
    })
  }
  // try{
  //     let id= req.params.id;
  //     let resnewobjponse = await institutes.find({}).sort({creation_date:-1})(function (err){

  //         if(err){
  //             res.json({
  //                 success:true,
  //                 data:err
  //             })
  //         }
  //         else{
  //             res.json({
  //                 success:true,
  //                 data:newobj
  //             })
  //         }    
  //     })

  // }catch(err){
  //     utils.logException(err,req,"updInstitute.updInsDel");
  //     res.json({
  //         success:false,
  //         data:err
  //     })
  // }
}
