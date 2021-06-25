var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
var users = require('../controllers/users/users');
var courses = require('../controllers/courses/courses');
var institutes = require('../controllers/institute/institute')

/* GET users listing. */
router.get('/admblk/:id', auth, users.updAdmBlk);
router.get('/admrsm/:id', auth, users.updAdmRsm);
router.get('/admdel/:id', auth, users.updAdmDel);
router.get('/getwebusers/:id', auth, users.getMoreWebUsers);
router.post('/srhwebusers/:id', auth, users.getSearcheWebUsers);
router.get('/webblk/:id', auth, users.updWebBlk);
router.get('/webrsm/:id', auth, users.updWebRsm);

router.get('/getcourses/:id', auth, courses.getMoreCourses);
router.post('/srhcourses/:id', auth, courses.getSearchCourses);
router.get('/crsblk/:id', auth, courses.updCrsBlk);
router.get('/crsrsm/:id', auth, courses.updCrsRsm);
router.get('/crsdel/:id', auth, courses.updCrsDel);

router.get('/getinstitutes/:id', auth, institutes.getMoreInstitutes);
router.post('/srhinstitutes/:id', auth, institutes.getSearchInstitutes);
router.get('/insblk/:id', auth, institutes.updInsBlk);
router.get('/insrsm/:id', auth, institutes.updInsRsm);
router.get('/insdel/:id', auth, institutes.updInsDel);



// router.get('/data', function(req, res) {
//   //res.send({type:'GET'});
//   res.json("dfgfdgd");
// });


module.exports = router;