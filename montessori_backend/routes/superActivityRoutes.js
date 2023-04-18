const express = require('express');
const { isAuth, isAdmin } = require('../config/auth');
const router = express.Router();
const {
    addSuperActivityTabel,addAllSuperActivityTabel,getAllSuperActivityTabel,getSuperActivityTabelById,updateSuperActivityTabel,deleteSuperActivityTabel,findSuperActivityTabelList,
    // loginActivity,
} = require('../controller/superActivityController');

//add a coupon
router.post('/add', addSuperActivityTabel);
router.put('/:id',isAuth, updateSuperActivityTabel);
//add multiple coupon
router.post('/all',isAuth, addAllSuperActivityTabel);

router.post('/find',isAuth, findSuperActivityTabelList);
//get all coupon
router.get('/list/:schooleId',isAuth, getAllSuperActivityTabel);
//get a coupon
router.get('/:id',isAuth, getSuperActivityTabelById);
//update a coupon


//delete a coupon
router.delete('/:id',isAuth, deleteSuperActivityTabel);

// router.post('/login', loginActivity);

module.exports = router;