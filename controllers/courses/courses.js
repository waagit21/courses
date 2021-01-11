const {getCourses}=require('./helpers/getCourses'),
{insertCourses}=require("./helpers/insertCourse"),
{getAllCourses,updAllCourses,getCoursesCount}=require('./helpers/getAllCourses'),
{insertDegree}=require("./helpers/insertDegree")
const { navbarSearch } = require('./helpers/navbarSearch')

const { searchCourse } = require('./helpers/searchCourse');
const {updCrsDel, updCrsBlk, updCrsRsm} = require('./helpers/updCourse');


module.exports={
    getCourses:getCourses,
    insertCourses:insertCourses,
    getAllCourses:getAllCourses,
    updAllCourses:updAllCourses,
    getCoursesCount:getCoursesCount,
    searchCourse:searchCourse,
    navbarSearch:navbarSearch,
    insertDegree:insertDegree,
    updCrsDel:updCrsDel,
    updCrsBlk:updCrsBlk,
    updCrsRsm:updCrsRsm,
}