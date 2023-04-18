const express = require('express');
const { isAuth, isAdmin } = require('../config/auth');
const router = express.Router();
const {
    addAttendence,addAllAttendence,getAllAttendence,getAttendenceById,updateAttendence,deleteAttendence,findAttendenceList,
    // loginActivity,
    getAllReports
} = require('../controller/attendenceController');

//add a coupon
router.post('/add', addAttendence);

//add multiple coupon
router.post('/all',isAuth, addAllAttendence);
router.post('/getreports',isAuth, getAllReports);
router.post('/find',isAuth, findAttendenceList);
//get all coupon
router.get('/list/:schooleId',isAuth, getAllAttendence);

//get a coupon
router.get('/:id',isAuth, getAttendenceById);

//update a coupon
router.put('/:id',isAuth, updateAttendence);

//delete a coupon
router.delete('/:id',isAuth, deleteAttendence);

// router.post('/login', loginActivity);
module.exports = router;