const {getAllInstitutes,getInstituteById,getInstitutesCount,getMoreInstitutes}=require("./helpers/getAllInstitutes");
const {insertInstitute}=require("./helpers/insertInstitute");
const {updInsDel, updInsBlk, updInsRsm} = require('./helpers/updInstitute');

module.exports={
    getAllInstitutes:getAllInstitutes,
    getInstituteById:getInstituteById,
    getInstitutesCount:getInstitutesCount,
    getMoreInstitutes:getMoreInstitutes,
    insertInstitute:insertInstitute,
    updInsDel:updInsDel,
    updInsBlk:updInsBlk,
    updInsRsm:updInsRsm,
}