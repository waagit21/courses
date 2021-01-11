//const {getUsers}=require('./helpers/getUsers'),
//{insertUsers}=require("./helpers/insertUser"),
const {getLoginUsers}=require('./helpers/getLoginUsers')


const {updAdmDel, updAdmBlk, updAdmRsm, updWebBlk, updWebRsm} = require('./helpers/updAdm'),
{getUserRoles, getUserOnlyRole}=require('./helpers/getUserRoles'),
{getAdmUsers, getAdmOnlyUser, getAdmByUsername, getAdmCount, insAdmUser, updAdmUser}=require('./helpers/getAdmUsers'),
{getWebUsers, getWebOnlyUser,getWebCount}=require('./helpers/getWebUsers')
//{getAllUsers}=require('./helpers/getAllUsers')
//const { searchUser } = require('./helpers/searchUser')


module.exports={
    //getUsers:getUsers,
    getLoginUsers:getLoginUsers,
    getUserRoles:getUserRoles,
    getUserOnlyRole:getUserOnlyRole,
    getAdmUsers:getAdmUsers,
    getAdmOnlyUser:getAdmOnlyUser,
    getAdmByUsername:getAdmByUsername,
    getAdmCount:getAdmCount,
    insAdmUser:insAdmUser,
    updAdmUser:updAdmUser,
    updAdmDel:updAdmDel,
    updAdmBlk:updAdmBlk,
    updAdmRsm:updAdmRsm,
    updAdmBlk:updAdmBlk,
    updWebRsm:updWebRsm,
    updWebBlk:updWebBlk,
    getWebUsers:getWebUsers,
    getWebOnlyUser:getWebOnlyUser,
    getWebCount:getWebCount,
    //insertUsers:insertUsers,
    //getAllUsers:getAllUsers,
    //searchUser:searchUser
}