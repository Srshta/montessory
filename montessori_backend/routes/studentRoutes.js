const express = require('express');
const { isAuth, isAdmin } = require('../config/auth');
const router = express.Router();
const {
    addStudent,addAllStudent,getAllStudent,getStudentById,updateStudent,deleteStudent,findStudentList,loginStudent
} = require('../controller/studentRegistrationController');

//add a coupon
router.post('/add', addStudent);

//add multiple coupon
router.post('/all',isAuth, addAllStudent);

router.post('/find',isAuth, findStudentList);
//get all coupon
router.get('/list/:schooleId',isAuth, getAllStudent);



  


router.post('/list/:schooleId',isAuth, getAllStudent);
//get a coupon
router.get('/:id',isAuth, getStudentById);

//update a coupon
router.put('/:id',isAuth, updateStudent);

//delete a coupon
router.delete('/:id',isAuth, deleteStudent);

router.post('/login', loginStudent);
module.exports = router;