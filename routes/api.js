var express = require('express');
var router = express.Router();
var users = require('../controllers/users/users');
var courses = require('../controllers/courses/courses');
var institutes = require('../controllers/institute/institute')

/* GET users listing. */
router.get('/admblk/:id', users.updAdmBlk);
router.get('/admrsm/:id', users.updAdmRsm);
router.get('/admdel/:id', users.updAdmDel);
router.get('/webblk/:id', users.updWebBlk);
router.get('/webrsm/:id', users.updWebRsm);

router.get('/crsblk/:id', courses.updCrsBlk);
router.get('/crsrsm/:id', courses.updCrsRsm);
router.get('/crsdel/:id', courses.updCrsDel);

router.get('/insblk/:id', institutes.updInsBlk);
router.get('/insrsm/:id', institutes.updInsRsm);
router.get('/insdel/:id', institutes.updInsDel);

router.get('/getinstitutes', institutes.getMoreInstitutes);

// router.get('/data', function(req, res) {
//   //res.send({type:'GET'});
//   res.json("dfgfdgd");
// });


module.exports = router;