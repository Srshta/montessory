const express = require('express');
const { isAuth, isAdmin } = require('../config/auth');
const router = express.Router();
const {
    addSubActivity,addAllSubActivity,getAllSubActivity,getSubActivityById,
    updateSubActivity,deleteSubActivity,findSubActivityList,
    addAllSubActivityByActivityId, uploadBulkRecords, getStudentReport
    // loginActivity,
} = require('../controller/subActivityController');

//add a coupon
router.post('/add', addSubActivity);

router.put('/:id',isAuth, updateSubActivity);
//add multiple coupon
router.post('/all',isAuth, addAllSubActivity);

router.post('/listbyactivityid',isAuth, addAllSubActivityByActivityId);

router.post('/find',isAuth, findSubActivityList);
//get all coupon
router.get('/list/:schooleId',isAuth, getAllSubActivity);
//get a coupon
router.post('/studentreport', getStudentReport);
router.get('/:id',isAuth, getSubActivityById);


router.post('/data/upload', uploadBulkRecords);

router.delete('/:id',isAuth, deleteSubActivity);

// router.post('/login', loginActivity);

module.exports = router;