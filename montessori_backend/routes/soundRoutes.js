const express = require('express');
const { isAuth, isAdmin } = require('../config/auth');
const router = express.Router();
const {
    addSound,addAllSound,getAllSound,getSoundById,updateSound, 
    deleteSound,findSoundList, uploadBulkRecords
} = require('../controller/soundController');
const multer = require("multer")
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
      console.log(file);
      console.log(file);
      cb(null, file.fieldname + "-" + Date.now()+".xlsx")
    }
  })
  const maxSize = 1 * 5000 * 5000;
  
  var upload = multer({ 
    storage: storage

  });

router.post('/add', addSound);
router.post('/all',isAuth, addAllSound);
router.post('/data/upload',uploadBulkRecords);
router.post('/find',isAuth, findSoundList);
router.get('/list',isAuth, getAllSound);
router.get('/:id',isAuth, getSoundById);
router.put('/:id',isAuth, updateSound);
router.delete('/:id',isAuth, deleteSound);
module.exports = router;