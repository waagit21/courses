const {getCourses}=require('./helpers/getCourses'),
{insertCourse, updateCourse, insertDegree, updateDegree}=require("./helpers/insertCourse"),
{getAllCourses,getCourseById,updAllCourses,getCoursesCount}=require('./helpers/getAllCourses'),
//{insertDegree}=require("./helpers/insertDegree")
{ navbarSearch } = require('./helpers/navbarSearch')

const { searchCourse } = require('./helpers/searchCourse');
const {updCrsDel, updCrsBlk, updCrsRsm} = require('./helpers/updCourse');


module.exports={
    getCourses:getCourses,    
    getAllCourses:getAllCourses,
    getCourseById:getCourseById,
    updAllCourses:updAllCourses,
    getCoursesCount:getCoursesCount,
    insertCourse:insertCourse,
    updateCourse:updateCourse,
    insertDegree:insertDegree,
    updateDegree:updateDegree,
    searchCourse:searchCourse,
    navbarSearch:navbarSearch,
    updCrsDel:updCrsDel,
    updCrsBlk:updCrsBlk,
    updCrsRsm:updCrsRsm,
}