const courses =require('../../../models/courses');
var endecode = require('../../../config/endecode');
var utils = require('../../../config/utils');

exports.updCrsDel=async(req,res)=>{
    try{
        let id= req.params.id;
        let response = await courses.findByIdAndDelete(id, function (err){

            if(err){
                res.json({
                    success:true,
                    data:0
                })
            }
            else{
                res.json({
                    success:true,
                    data:1
                })
            }
    
        })

    }catch(err){
        utils.logException(err,req,"updCourse.updCrsDel");
        res.json({
            success:false,
            data:error
        })
    }
}

exports.updCrsBlk=async(req,res)=>{
    try{
        let id= req.params.id;
        console.log(id);
        let response = await courses.findByIdAndUpdate(id,{"status": "1"}, function(err, result){

            if(err){
                res.json({
                    success:true,
                    data:0
                })
            }
            else{
                res.json({
                    success:true,
                    data:1
                })
            }
    
        })

    }catch(err){
        utils.logException(err,req,"updCourse.updCrsBlk");
        res.json({
            success:false,
            data:error
        })
    }
}

exports.updCrsRsm=async(req,res)=>{
    try{
        let id= req.params.id;
        let response = await courses.findByIdAndUpdate(id,{"status": "0"}, function(err, result){

            if(err){
                res.json({
                    success:true,
                    data:0
                })
            }
            else{
                res.json({
                    success:true,
                    data:1
                })
            }
    
        })

    }catch(err){
        utils.logException(err,req,"updCourse.updCrsRsm");
        res.json({
            success:false,
            data:error
        })
    }
}