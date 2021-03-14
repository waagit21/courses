const { json } = require('express');
var express = require('express');
//var Crypto = require("crypto");
var router = express.Router();
//var login = require('../models/users');
var users = require('../controllers/users/users');
var functions = require('../config/functions');
var utils = require('../config/utils');
//var endecode = require('../config/endecode');
const passport = require('passport');
const { forwardAuthenticated } = require('../middleware/auth_user');
//const eml = require('../config/email');
//var fs = require('fs');

var basedata = require('../controllers/basedata/basedata');
var courses = require('../controllers/courses/courses');
var institutes = require('../controllers/institute/institute');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

var upload = multer({ storage: storage })

//#region Home-User

router.get('/', forwardAuthenticated, function(req, res, next) {
  // var msg = {
  //   to: "wqr.chicsol@gmail.com",
  //   subject: "Hello ✔",
  //   html: "<b>Hello world?</b>",
  // };
  // var myeml = eml.SendEmail(req, res, msg);
  // console.log(myeml);
  res.render('index', { title: 'Admin Panel', layout: 'home.hbs', custom:"index" });
});


// // Login Form
// router.get('/login', function(req, res){
//   console.log('login');
//   res.render('login',{  title: 'Admin Panel', custom:'index' });
// });

// Login Process
router.post('/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/dashboard',
    failureRedirect:'/',
    failureFlash: true
  })(req, res, next);
});

// logout
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/');
});

// router.post('/login', async function(req, res, next) {
//   var data = await users.getLoginUsers(req); 
//   console.log(data);
//   if(data === undefined || data === null || data.length === 0){
//     req.flash('error', "Invalid username or password");
//     res.redirect('back');
//   }
//   else {
//     req.flash('success', "Data found");
//     res.redirect('back');
//   }  
// });

router.get('/dashboard', async function(req, res, next) {
  // console.log(req.user);
  // req.flash('user', req.user);
  const user_count = await users.getAdmCount(req);
  const web_count = await users.getWebCount;
  const courses_count = await courses.getCoursesCount;
  var counts = {
    user_count: user_count,
    web_count: web_count,
    courses_count: courses_count,
  };  
  res.render('dashboard', { title: 'Dashboard', dashboard:true, custom:"dashboard", counts: counts});
});

router.get('/userroles', async function(req, res, next) {
  var data = await users.getUserRoles;
  var error = "";
  if(data === undefined || data === null || data.length === 0){
    error = "No data found";
  }
  res.render('userroles', { title: 'Admin Roles', userroles:true, custom:"userroles", items: data, error: error});  
});

router.get('/admusers', async function(req, res, next) {
  
  var data = {};
  data = await users.getAdmUsers(req);
  console.log("here ");
  console.log(data);
  var error = "";
  //if(data === undefined || data.results === undefined || data.results === null || data.results.length === 0){
  if(data === undefined || data === null || data.length === 0){
    error = "No data found";
  }
  res.render('admusers', { admusers:true, prntadmusers:true, custom:"admusers", items: data, title: 'Admin Users', error: error});
});

router.get('/admusersview', async function(req, res, next) { 
  if (req.query.id !== undefined && req.query.id !== "") {
    req.usrid = req.query.id;
    var admdata = await users.getAdmOnlyUser(req);
    var rldata = {};
    var admcrt = "";
    var admupd = "";
    var error = "";
    if(admdata._id==req.user.id || admdata.type > req.user.type || req.user.type == 1){
      if(admdata !== undefined && admdata !== null) {
        rldata = await users.getUserOnlyRole(req.query.id); 
        if(admdata.createdby != "") {
          admcrt = await users.getAdmByUsername(admdata.createdby);
        }
        if(admdata.updatedby != "" ) {
          if(admdata.updatedby==admdata.createdby) {
            admupd = admcrt;
          }
          else {
            admupd = await users.getAdmByUsername(admdata.updatedby);
          }        
        }     
      }
      else {
        error = "No data found"; 
      }    
      res.render('admusersview', { title: 'Admin Users', admusersview:true, prntadmusers:true, custom:"admusersview", data: admdata, rldata: rldata, admcrt: admcrt, admupd: admupd });
    }
    else{
      res.redirect('/admusers');
    }
  }
  else{
    res.redirect('/admusers');
  }
});

router.get('/admusersedit', async function(req, res, next) { 
  var heading = "Add";
  var admdata = {};
  if (req.query.id !== undefined && req.query.id !== "") {
    heading = "Update";
    req.usrid = req.query.id;
    admdata = await users.getAdmOnlyUser(req);
    if(admdata._id==req.user.id || admdata.type > req.user.type || req.user.type == 1){      
    }
    else{
      res.redirect('/admusers');
    }
  }
  var rldata = await users.getRoles(req, res); 
  if(rldata !== undefined && rldata !== null) {  
    res.render('admusersedit', { title: 'Admin Users', admusersedit:true, prntadmusers:true, custom:"admusersedit", items: rldata, data: admdata, heading: heading});
  }
  else {
    res.redirect('/admusers');
  }
});

// router.get('/admusersadd', async function(req, res, next) { 
//   var heading = "Add";
  
//   res.render('admusersadd', { title: 'Admin Users', admusersadd:true, prntadmusers:true, custom:"admusersadd", heading: heading});
// });

router.post('/useradm', async function(req, res, next) {
  //req.body._id = mongoose.Types.ObjectId(req.body._id);
  //var date = functions.formatDateTime(Date.now());
  //date = date.toDateString();
  var val =0;
  var data = {}; 
  try {
    if(req.body.dataid!="" && req.body.dataid!=null){
      val=1;
      data = await users.updAdmUser(req);
    }
    else{
      // req.body.created = new Date();
      // req.body.createdby = "Admin";
      data = await users.insAdmUser(req);
    }
    if(data!==undefined && data!=null && data!="") {
      var msg = (val==0) ? "User added successfull" : "User updated successfull";
      req.flash('success', msg);
      res.redirect('back');
    }
    else {
      var msg = (val==0) ? "User did not added" : "User did not updated";
      req.flash('error', msg);
      res.redirect('back');
    }
  }
  catch (error){
    console.log("error");
    console.log(error);
  }
  
});

router.post('/useradmadd',upload.single('blogimage'), async function(req, res, next) {

  try {
    var fileinfo = req.file;
    console.log(fileinfo);
    console.log(req.file.filename);

    var msg = "User added successfull";
    req.flash('success', msg);
  }
  catch (error){
    console.log("error");
    console.log(error);
  }
  
});

router.post('/useradmaddml',upload.array('blogimage', 5), async function(req, res, next) {

  try {
    // var fileinfo = req.files;
    // console.log(fileinfo);

    var arrfiles = [];
    var files = [];
    var fileKeys = Object.keys(req.files);
    fileKeys.forEach(function(key) {
        arrfiles.push(req.files[key].filename)
        files.push(req.files[key]);
    });
    console.log(fileKeys);
    console.log("arrfiles");
    console.log(arrfiles);

    var msg = "User added successfull";
    req.flash('success', msg);
  }
  catch (error){
    console.log("error");
    console.log(error);
  }
  
});

router.get('/webusers', async function(req, res, next) {
  
  var data = {};
  data = await users.getWebUsers(req);
  var error = "";
  if(data === undefined || data === null || data.length === 0){
    error = "No data found";
  }
  res.render('webusers', { title: 'Web Users', webusers:true, prntwebusers:true, custom:"webusers", items: data, error: error});
});

router.get('/webusersview', async function(req, res, next) { 
  if (req.query.id !== undefined && req.query.id !== "") {
    var error = "";
    req.usrid = req.query.id;
    var webdata = await users.getWebOnlyUser(req);
    if(webdata === undefined || webdata === null || webdata.length === 0){
      error = "No data found";
    }
    res.render('webusersview', { title: 'Web Users', webusersview:true, prntwebusers:true, custom:"webusersview", data: webdata, error: error });
  }
  else{
    res.redirect('/webusers');
  }
});

//#endregion Home-User

//#region Course
router.get('/courses', async function(req, res, next) { 
  var data = {};
  var userdata = {};
  var crsusr = -1;
  data = await courses.getAllCourses(req, res);
  //courses.updAllCourses(req, res); 
  //console.log(data);
  var error = 0;
   if(data === undefined || data === null || data.length === 0){
    error = "No data found";
  }

  if (req.query.adm !== undefined && req.query.adm !== "") {
    crsusr = 0;
    req.usrid = req.query.adm;
    userdata = await users.getAdmOnlyUser(req);
  }
  else if (req.query.web !== undefined && req.query.web !== "") {
    crsusr = 1;
    req.usrid = req.query.web;
    userdata = await users.getWebOnlyUser(req);
  }
  
  res.render('courses/courses', { title: 'Courses', courses:true, prntcourses:true, custom:"courses/courses", items: data, userdata:userdata, crsusr:crsusr, error: error});
});
router.get('/coursesview', async function(req, res, next) { 
  if (req.query.id !== undefined && req.query.id !== "") {
    var error = "";
    var crsdata = await courses.getCourseById(req);
    if(crsdata === undefined || crsdata === null || crsdata.length === 0){
      error = "No data found";
    }
    res.render('courses/coursesview', { title: 'Course View', coursesview:true, prntcourses:true, custom:"courses/coursesview", data: crsdata, error: error });
  }
  else{
    res.redirect('/courses');
  }
});
router.get('/coursesedit', async function(req, res, next) { 
  var heading = "Add";
  var crsdata = {};
  var bsdata = await basedata.getAllBaseData(req); 
  if (req.query.id !== undefined && req.query.id !== "") {
    heading = "Update";
    crsdata = await courses.getCourseById(req);
    crsdata.startingDate = functions.formatNumDate(crsdata.startingDate);
    crsdata.endingDate = functions.formatNumDate(crsdata.endingDate);
  }
  res.render('courses/coursesedit', { title: 'Course Add/Update', coursesedit:true, prntcourses:true, custom:"courses/coursesedit", data: crsdata, bsdata: bsdata[0], heading: heading});
});
router.get('/degreesview', async function(req, res, next) { 
  if (req.query.id !== undefined && req.query.id !== "") {
    var error = "";
    var crsdata = await courses.getCourseById(req);
    if(crsdata === undefined || crsdata === null || crsdata.length === 0){
      error = "No data found";
    }
    res.render('courses/degreesview', { title: 'Degree View', degreesview:true, prntcourses:true, custom:"courses/degreesview", data: crsdata, error: error });
  }
  else{
    res.redirect('/courses');
  }
});
router.get('/degreesedit', async function(req, res, next) { 
  var heading = "Add";
  var crsdata = {};
  //req.clmnam = "categories";
  //var ctgdata = await basedata.getBaseDataByName(req); 
  var bsdata = await basedata.getAllBaseData(req); 
  if (req.query.id !== undefined && req.query.id !== "") {
    heading = "Update";
    crsdata = await courses.getCourseById(req); 
    crsdata.startingDate = functions.formatNumDate(crsdata.startingDate);
    crsdata.endingDate = functions.formatNumDate(crsdata.endingDate);
  }
  res.render('courses/degreesedit', { title: 'Degree Add/Update', degreesedit:true, prntcourses:true, custom:"courses/degreesedit", data: crsdata, bsdata: bsdata[0], heading: heading});
});
router.post('/updcourse', upload.array('facultyResume', 5), async function(req, res, next) {
  //req.body._id = mongoose.Types.ObjectId(req.body._id);
  //var date = functions.formatDateTime(Date.now());
  //date = date.toDateString();
  var val =0;
  var data = {}; 
  var arrfiles = [];
  try {
    if (req.files && req.files.length>0) {
      var fileKeys = Object.keys(req.files);
      fileKeys.forEach(function(key) {
          arrfiles.push(req.files[key].filename)
          //files.push(req.files[key]);
      });
      req.body.facultyResume = arrfiles;
    }
    if(req.body.dataid!="" && req.body.dataid!=null){
      if (!req.files || req.files.length==0) {
        delete req.body.facultyResume;
      }
      val=1;
      data = await courses.updateCourse(req);
    }
    else{
      data = await courses.insertCourse(req);
    }
    if(data!==undefined && data!=null && data!="") {
      var msg = (val==0) ? "Course added successfull" : "Course updated successfull";
      req.flash('success', msg);
      res.redirect('back');
    }
    else {
      var msg = (val==0) ? "Course did not added" : "Course did not updated";
      req.flash('error', msg);
      res.redirect('back');
    }
  }
  catch (err){
    console.log(err);
    utils.logException(err,req,"updcourse");
  }
  
});
router.post('/upddegree', upload.array('facultyResume', 5), async function(req, res, next) {
  //req.body._id = mongoose.Types.ObjectId(req.body._id);
  //var date = functions.formatDateTime(Date.now());
  //date = date.toDateString();
  var val =0;
  var data = {}; 
  var arrfiles = [];
  //var files = [];   
  try {
    if (req.files && req.files.length>0) {
      var fileKeys = Object.keys(req.files);
      fileKeys.forEach(function(key) {
          arrfiles.push(req.files[key].filename)
          //files.push(req.files[key]);
      });
      req.body.facultyResume = arrfiles;
    } 
    if(req.body.dataid!="" && req.body.dataid!=null){
      if (!req.files || req.files.length==0) {
        delete req.body.facultyResume;
      }
      val=1;
      data = await courses.updateDegree(req);
    }
    else{
      data = await courses.insertDegree(req);
    }
    if(data!==undefined && data!=null && data!="") {
      var msg = (val==0) ? "Degree added successfull" : "Degree updated successfull";
      req.flash('success', msg);
      res.redirect('back');
    }
    else {
      var msg = (val==0) ? "Degree did not added" : "Degree did not updated";
      req.flash('error', msg);
      res.redirect('back');
    }
  }
  catch (err){
    console.log(err);
    utils.logException(err,req,"upddegree");
  }
  
});
//#endregion Course

//#region Institute
router.get('/institutes', async function(req, res, next) { 
  var data = {};
  data = await institutes.getAllInstitutes(req, res);
  //console.log(data);
  var error = "";
  if(data === undefined || data === null || data.length === 0){
    error = "No data found";
  }
  res.render('institutes/institutes', { title: 'Institutes', institutes:true, prntinstitutes:true, custom:"institutes/institutes", items: data, error: error});
});
router.get('/institutesview', async function(req, res, next) { 
  if (req.query.id !== undefined && req.query.id !== "") {
    var error = "";
    var crsdata = await institutes.getInstituteById(req);
    if(crsdata === undefined || crsdata === null || crsdata.length === 0){
      error = "No data found";
    }
    res.render('institutes/institutesview', { title: 'Institute View', institutesview:true, prntinstitutes:true, custom:"institutes/institutesview", data: crsdata, error: error });
  }
  else{
    res.redirect('/courses');
  }
});
router.get('/institutesedit', async function(req, res, next) { 
  var heading = "Add";
  var crsdata = {};
  if (req.query.id !== undefined && req.query.id !== "") {
    heading = "Update";
    crsdata = await courses.getInstituteById(req);    
  }
  res.render('institutes/institutesedit', { title: 'Institute Add/Update', institutesedit:true, prntinstitutes:true, custom:"institutes/institutesedit", data: crsdata, heading: heading});
});
router.post('/updinstitute', async function(req, res, next) {
  //req.body._id = mongoose.Types.ObjectId(req.body._id);
  //var date = functions.formatDateTime(Date.now());
  //date = date.toDateString();
  var val =0;
  var data = {}; 
  try {
    if(req.body._id!="" && req.body._id!=null){
      val=1;
      data = await institutes.updateInstitute(req);
    }
    else{
      data = await institutes.insertInstitute(req);
    }
    if(data!==undefined && data!=null && data!="") {
      var msg = (val==0) ? "Institute added successfull" : "Institute updated successfull";
      req.flash('success', msg);
      res.redirect('back');
    }
    else {
      var msg = (val==0) ? "Institute did not added" : "Institute did not updated";
      req.flash('error', msg);
      res.redirect('back');
    }
  }
  catch (err){
    console.log(err);
    utils.logException(err,req,"updinstitute");
  }
  
});
//#endregion Institute


module.exports = router;

// router.get('/admusersedit/:id', function(req, res, next) {
// });

// router.get('/', users.getLoginUsers
// );

//var Schema = mongoose.Schema;
// var userDataSchema = new Schema({
//   title: {type: String, required: true},
//   content: String,
//   author: String
// }, {collection: 'user-data'});

// var UserData = mongoose.model('UserData', userDataSchema);

/* GET home page. */
// router.get('/', function(req, res, next) {
//   // var item = {
//   //   title: "req.body.title",
//   //   content: "req.body.content",
//   //   author: "req.body.author"
//   // };

//   // var data = new login(item);
//   // data.save();
//   // res.render('index', { layout: 'home.hbs', title: 'Cool, huh!', condition: true, anyArray: [1,2,3] });

//   // login.find()
//   //     .then(function(doc) {
//   //       res.render('index', { layout: 'home.hbs',items: doc, title: 'Cool, huh!', condition: true, anyArray: [1,2,3] });
//   //     });  
// });