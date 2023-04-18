const express = require('express');
const { isAuth, isAdmin } = require('../config/auth');
const router = express.Router();
const {
    addSpecialObservation,addAllSpecialObservation,getAllSpecialObservation,getSpecialObservationById,updateSpecialObservation,
    deleteSpecialObservation,findSpecialObservationList,addAllSpecialObservationBySpecialObservationId
    // loginActivity,
} = require('../controller/specialObservationController');

//add a coupon
router.post('/add', addSpecialObservation);
//add multiple coupon
router.post('/all',isAuth, addAllSpecialObservation);

router.post('/find',isAuth, findSpecialObservationList);
//get all coupon
router.get('/list/:schooleId',isAuth, getAllSpecialObservation);

//get a coupon
router.get('/:id',isAuth, getSpecialObservationById);

//update a coupon
router.put('/:id',isAuth, updateSpecialObservation);

//delete a coupon
router.delete('/:id',isAuth, deleteSpecialObservation);


module.exports = router;