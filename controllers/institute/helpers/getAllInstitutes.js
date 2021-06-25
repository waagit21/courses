const institutes = require('../../../models/institute');
var utils = require('../../../config/utils');
var dateFormat = require("dateformat");
const configkeys = require("../../../config/default.json");
const moment=require('moment');

exports.getAllInstitutes = (req,res) => institutes.find({}).sort({_id:-1}).lean().then(function(doc) {
  doc.forEach(item => { 
    item.creation_date = dateFormat(new Date(item.creation_date * 1000), "dd mmm, yyyy hh:MM:ss TT");
  }); 
  return doc;
}).catch(function(err) {
  utils.logException(err,req,"getAllInstitutes.getAllInstitutes");
  return null;
});

exports.getInstitutes = function(req,res) {
  return new Promise((resolve, reject) => {
    const options = {
      //page: parseInt(req.pg.page) || 1,
      page: 1,
      limit: configkeys.pagelimit,
      sort: { _id: -1 },
    };
    //institutes.find({}).lean().then(function(doc) { //.sort({creation_date:-1})
    institutes.paginate({}, options, function (err, doc) {
        if(err){
          utils.logException(err,req,"getAllInstitutes.getInstitutes");
        }
        doc.docs.forEach(item => { 
          item.creation_date = dateFormat(new Date(item.creation_date * 1000), "dd mmm, yyyy hh:MM:ss TT");
        }); 
        resolve(doc);        
      }).catch(function(err) {
        utils.logException(err,req,"getAllInstitutes.getInstitutes");
        reject(err);
      });      
  });
};

exports.getMoreInstitutes = async(req,res) => {
  try{
    let id= req.params.id;
    const options = {
      page: parseInt(id) || 1,
      limit: configkeys.pagelimit,
      sort: { _id: -1 },
    };
    let response = await institutes.paginate({}, options, function (err, doc) {
        if(err){
            utils.logException(err,req,"getAllInstitutes.getMoreInstitutes");
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
    // const options = {
    //   page: parseInt(id) || 1,
    //   limit: configkeys.pagelimit,
    //   sort: { creation_date: -1 },
    // };
    // let response = await institutes.paginate({}, options).then(function (result) {
    //   res.json({
    //     success:true,
    //     data:result
    // })
    // });
  }catch(err){
      utils.logException(err,req,"getAllInstitutes.getMoreInstitutes");
      res.json({
          success:false,
          data:err
      })
  }
}

exports.getSearchInstitutes = async(req,res) => {
  try{
    var input = {}; 
    if(req.body.startingDate!="" && req.body.endingDate!=""){
      var ts1 = moment(req.body.startingDate, "YYYY/MM/DD").unix();
      var ts2 = moment(req.body.endingDate, "YYYY/MM/DD").unix();
      input = { creation_date: {$gt : ts1, $lt : ts2} };
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
    let response = await institutes.paginate(input, options, function (err, doc) {
        if(err){
            utils.logException(err,req,"getAllInstitutes.getSearchInstitutes");
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
      utils.logException(err,req,"getAllInstitutes.getSearchInstitutes");
      res.json({
          success:false,
          data:err
      })
  }
}

// exports.getAllInstitutes = (req,res) => institutes.find({}).sort({creation_date:-1}).lean().then(function(doc) {
//   return doc;
// }).catch(function(err) {
//   utils.logException(err,req,"getAllInstitutes.getAllInstitutes");
//   return null;
// });

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

// exports.getMoreInstitutes=async(req,res)=>{
//   try{    
//     let newobj=await institutes.find({}).sort({creation_date:-1});
//     res.json({
//         success:true,
//         data:newobj
//     })
//   }catch(err){
//     res.json({
//         success:false,
//         data:err
//     })
//   }
//   // try{
//   //     let id= req.params.id;
//   //     let resnewobjponse = await institutes.find({}).sort({creation_date:-1})(function (err){

//   //         if(err){
//   //             res.json({
//   //                 success:true,
//   //                 data:err
//   //             })
//   //         }
//   //         else{
//   //             res.json({
//   //                 success:true,
//   //                 data:newobj
//   //             })
//   //         }    
//   //     })

//   // }catch(err){
//   //     utils.logException(err,req,"updInstitute.updInsDel");
//   //     res.json({
//   //         success:false,
//   //         data:err
//   //     })
//   // }
// }
