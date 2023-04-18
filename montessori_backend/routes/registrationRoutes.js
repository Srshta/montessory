const express = require('express');
const { isAuth, isAdmin } = require('../config/auth');
const router = express.Router();
const {
    addRegistration,addAllRegistration,getAllRegistration,getRegistrationById,updateRegistration,deleteRegistrationr,findRegistrationList,loginRegistration
} = require('../controller/schooleRegistrationController');

//add a coupon
router.post('/add', addRegistration);

router.post('/login', loginRegistration);
//add multiple coupon
router.post('/all',isAuth, addAllRegistration)

router.post('/find',isAuth, findRegistrationList);

//get a coupon
router.get('/:id',isAuth, getRegistrationById);


//update a coupon
router.put('/:id',isAuth, updateRegistration);




module.exports = router;

