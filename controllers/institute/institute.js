const {getAllInstitutes,getInstitutes,getMoreInstitutes,getSearchInstitutes,getInstituteById,getInstitutesCount}=require("./helpers/getAllInstitutes");
const {insertInstitute}=require("./helpers/insertInstitute");
const {updInsDel, updInsBlk, updInsRsm} = require('./helpers/updInstitute');

module.exports={
    getAllInstitutes:getAllInstitutes,
    getInstitutes:getInstitutes,
    getMoreInstitutes:getMoreInstitutes,
    getSearchInstitutes:getSearchInstitutes,
    getInstituteById:getInstituteById,
    getInstitutesCount:getInstitutesCount,    
    insertInstitute:insertInstitute,
    updInsDel:updInsDel,
    updInsBlk:updInsBlk,
    updInsRsm:updInsRsm,
}