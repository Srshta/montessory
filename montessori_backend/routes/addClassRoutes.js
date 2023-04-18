const express = require('express');
const { isAuth, isAdmin } = require('../config/auth');
const router = express.Router();
const {
    addAddClass,
    addAllAddClass,
   getAllAddClass,
  getAddClassById,
   updateAddClass,
   deleteAddClass,
   findAddClassList,
   getAddClassNameById,
//    loginAddClass
} = require('../controller/addClassController');

//add a coupon
router.post('/add', addAddClass);

//add multiple coupon
router.post('/all',isAuth, addAllAddClass);

router.post('/find',isAuth, findAddClassList);
//get all coupon
router.get('/list/:schooleId',isAuth, getAllAddClass);

//get a coupon
router.get('/:id',isAuth, getAddClassById);

//update a coupon
router.put('/:id',isAuth, updateAddClass);

//delete a coupon
router.delete('/:id',isAuth, deleteAddClass);

// router.post('/login', loginAddClass);
router.post('/getAddClassNameById', getAddClassNameById);
module.exports = router;