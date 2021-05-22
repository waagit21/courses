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
router.get('/webblk/:id', auth, users.updWebBlk);
router.get('/webrsm/:id', auth, users.updWebRsm);

router.get('/crsblk/:id', auth, courses.updCrsBlk);
router.get('/crsrsm/:id', auth, courses.updCrsRsm);
router.get('/crsdel/:id', auth, courses.updCrsDel);

router.get('/insblk/:id', auth, institutes.updInsBlk);
router.get('/insrsm/:id', auth, institutes.updInsRsm);
router.get('/insdel/:id', auth, institutes.updInsDel);

router.get('/getinstitutes', auth, institutes.getMoreInstitutes);

// router.get('/data', function(req, res) {
//   //res.send({type:'GET'});
//   res.json("dfgfdgd");
// });


module.exports = router;