const { json } = require('express');
var express = require('express');
//var Crypto = require("crypto");
var router = express.Router();
//var login = require('../models/users');
var users = require('../controllers/users/users');
//var functions = require('../config/functions');
//var utils = require('../config/utils');
//var endecode = require('../config/endecode');
const passport = require('passport');
const { forwardAuthenticated } = require('../middleware/auth_user');
//const eml = require('../config/email');
//var fs = require('fs');

var courses = require('../controllers/courses/courses');

//#region Home-User

router.get('/', forwardAuthenticated, function(req, res, next) {
  // var msg = {
  //   to: "wqr.chicsol@gmail.com",
  //   subject: "Hello ✔",
  //   html: "<b>Hello world?</b>",
  // };
  // var myeml = eml.SendEmail(req, res, msg);
  // console.log(myeml);
  res.render('index', { layout: 'home.hbs', custom:"index", title: 'Admin Panel' });
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
  const user_count = await users.getAdmCount;
  const web_count = await users.getWebCount;
  const courses_count = await courses.getCoursesCount;
  var counts = {
    user_count: user_count,
    web_count: web_count,
    courses_count: courses_count,
  };  
  res.render('dashboard', { dashboard:true, custom:"dashboard", counts: counts, title: 'Dashboard'});
});

router.get('/userroles', async function(req, res, next) {
  var data = await users.getUserRoles;
  var error = "";
  if(data === undefined || data === null || data.length === 0){
    error = "No data found";
  }
  res.render('userroles', { userroles:true, custom:"userroles", items: data, title: 'Admin Roles', error: error});  
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
    var admdata = await users.getAdmOnlyUser(req);
    var rldata = {};
    var admcrt = "";
    var admupd = "";
    var error = "";
    if(admdata !== undefined && admdata !== null) {
      rldata = await users.getUserOnlyRole(admdata.admtype); 
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
    res.render('admusersview', { admusersview:true, prntadmusers:true, custom:"admusersview", data: admdata, rldata: rldata, admcrt: admcrt, admupd: admupd, title: 'Admin Users' });
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
    admdata = await users.getAdmOnlyUser(req);
  }
  var rldata = await users.getUserRoles; 
  if(rldata !== undefined && rldata !== null) {  
    res.render('admusersedit', { admusersedit:true, prntadmusers:true, custom:"admusersedit", items: rldata, data: admdata, title: 'Admin Users', heading: heading});
  }
  else {
    res.redirect('/admusers');
  }
});

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

router.get('/webusers', async function(req, res, next) {
  
  var data = {};
  data = await users.getWebUsers(req);
  var error = "";
  if(data === undefined || data === null || data.length === 0){
    error = "No data found";
  }
  res.render('webusers', { webusers:true, prntwebusers:true, custom:"webusers", items: data, title: 'Web Users', error: error});
});

router.get('/webusersview', async function(req, res, next) { 
  if (req.query.id !== undefined && req.query.id !== "") {
    var error = "";
    var webdata = await users.getWebOnlyUser(req);
    if(webdata === undefined || webdata === null || webdata.length === 0){
      error = "No data found";
    }
    res.render('webusersview', { webusersview:true, prntwebusers:true, custom:"webusersview", data: webdata, title: 'Web Users', error: error });
  }
  else{
    res.redirect('/webusers');
  }
});

//#endregion Home-User

//#region Course
router.get('/courses', async function(req, res, next) { 
  var data = {};
  data = await courses.getAllCourses(req, res);
  //console.log(data);
  var error = "";
  if(data === undefined || data === null || data.length === 0){
    error = "No data found";
  }
  res.render('courses/courses', { courses:true, prntcourses:true, custom:"courses", items: data, title: 'Courses', error: error});
});
router.get('/coursesview', async function(req, res, next) { 
  res.render('courses/coursesview', { coursesview:true, prntcourses:true, prntcoursesview:true, custom:"courses", title: 'Courses'});
});
router.get('/coursesedit', async function(req, res, next) { 
  res.render('courses/coursesedit', { coursesedit:true, prntcourses:true, prntcoursesedit:true, custom:"courses", title: 'Courses'});
});
//#endregion Course

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