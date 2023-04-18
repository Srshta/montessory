const express = require('express');
const { isAuth, isAdmin } = require('../config/auth');
const router = express.Router();
const {
    addSchooleRegistration,addAllSchooleRegistration,getAllSchooleRegistration,getSchooleRegistrationById,
    updateSchooleRegistration,deleteSchooleRegistration,findSchooleRegistrationList,loginSchooleRegistration
} = require('../controller/schooleRegistrationController');

//add a coupon
router.post('/add', addSchooleRegistration);

router.post('/login', loginSchooleRegistration);
//add multiple coupon
router.post('/all',isAuth, addAllSchooleRegistration);

router.post('/find',isAuth, findSchooleRegistrationList);
//get all coupon
router.get('/',isAuth, getAllSchooleRegistration);

//get a coupon
router.get('/:id',isAuth, getSchooleRegistrationById);

//update a coupon
router.put('/:id',isAuth, updateSchooleRegistration);




module.exports = router;

