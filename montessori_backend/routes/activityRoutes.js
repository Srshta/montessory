const express = require('express');
const { isAuth, isAdmin } = require('../config/auth');
const router = express.Router();
const {
    addActivity,addAllActivity,getAllActivity,getActivityById,updateActivity,
    deleteActivity,findActivityList,addAllActivityBySuperActivityId
    // loginActivity,
} = require('../controller/activityController');

//add a coupon
router.post('/add', addActivity);

//add multiple coupon
router.post('/all',isAuth, addAllActivity);

router.post('/find',isAuth, findActivityList);
//get all coupon
router.get('/list/:schooleId/:status',isAuth, getAllActivity);

router.post('/listbysuperactivityid',isAuth, addAllActivityBySuperActivityId);

//get a coupon
router.get('/:id',isAuth, getActivityById);

//update a coupon

router.put('/:id',isAuth, updateActivity);

//delete a coupon
router.delete('/:id',isAuth, deleteActivity);

// router.post('/login', loginActivity);



module.exports = router;