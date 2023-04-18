
const express = require('express');
const { isAuth, isAdmin } = require('../config/auth');
const router = express.Router();
const { 
    addCalelnderEvents,addAllCalelnderEvents,getAllCalelnderEvents,getCalelnderEventsById,
    updateCalelnderEvents,deleteCalelnderEvents,findCalelnderEventsList,
    // loginActivity,
} = require('../controller/calenderEventsController');

//add a coupon
router.post('/add', addCalelnderEvents);
router.put('/:id',isAuth, updateCalelnderEvents);
//add multiple coupon
router.post('/all',isAuth, addAllCalelnderEvents);

router.post('/find',isAuth, findCalelnderEventsList);
//get all coupon
router.get('/list/:schooleId',isAuth, getAllCalelnderEvents);
//get a coupon
router.get('/:id',isAuth, getCalelnderEventsById);
//update a coupon


//delete a coupon
router.delete('/:id',isAuth, deleteCalelnderEvents);

// router.post('/login', loginActivity);

module.exports = router;