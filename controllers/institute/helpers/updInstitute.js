const institutes =require('../../../models/institute');
var endecode = require('../../../config/endecode');
var utils = require('../../../config/utils');

exports.updInsDel=async(req,res)=>{
    try{
        let id= req.params.id;
        let response = await institutes.findByIdAndDelete(id, function (err){

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
        utils.logException(err,req,"updInstitute.updInsDel");
        res.json({
            success:false,
            data:err
        })
    }
}

exports.updInsBlk=async(req,res)=>{
    try{
        let id= req.params.id;
        console.log(id);
        let response = await institutes.findByIdAndUpdate(id,{"status": "1"}, function(err, result){

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
        utils.logException(err,req,"updInstitute.updInsBlk");
        res.json({
            success:false,
            data:err
        })
    }
}

exports.updInsRsm=async(req,res)=>{
    try{
        let id= req.params.id;
        let response = await institutes.findByIdAndUpdate(id,{"status": "0"}, function(err, result){

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
        utils.logException(err,req,"updInstitute.updInsRsm");
        res.json({
            success:false,
            data:err
        })
    }
}