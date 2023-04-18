const express = require('express');
const { isAuth, isAdmin } = require('../config/auth');
const router = express.Router();
const {
    addTeacher,addAllTeacher,getAllTeacher,getTeacherById,updateTeacher,deleteTeacher,findTeacherList,
    loginTeacher,
} = require('../controller/teacherController');

//add a coupon
router.post('/add', addTeacher);
//add multiple coupon
router.post('/all',isAuth, addAllTeacher);

router.post('/find',isAuth, findTeacherList);
//get all coupon
router.get('/list/:schooleId',isAuth, getAllTeacher);

//get a coupon
router.get('/:id',isAuth, getTeacherById);

//update a coupon
router.put('/:id',isAuth, updateTeacher);

//delete a coupon
router.delete('/:id',isAuth, deleteTeacher);

router.post('/login', loginTeacher);



module.exports = router;