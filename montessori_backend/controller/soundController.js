
  const Sound = require('../models/Sound');
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const mongoose = require('mongoose');
const reader = require('xlsx');
const path = require('path');
const multer = require("multer");
var fs = require('fs');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/")
  },
  filename: function (req, file, cb) {
    const fileName = file.fieldname + "-" + Date.now() + ".xlsx";
    cb(null, fileName)
  }
})
const maxSize = 1 * 5000 * 5000;

var upload = multer({
  storage: storage,
}).single('image');
const file = reader.readFile(path.join(__dirname, 'test.xlsx'));
var ObjectId = require('mongodb').ObjectID;
dayjs.extend(utc);
const addSound = async (req, res) => {
  try {
    const newVillage = new Village(req.body);
    await newVillage.save();
    res.status(200).send({
      message: 'Sounds Added Successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const addAllSound = async (req, res) => {
  try {
    await Sound.insertMany(req.body);
    res.status(200).send({
      message: 'Sounds Added successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const getAllSound = async (req, res) => {
  try {
    let preparePost = {};
    const sound = await Sound.find(preparePost).collation({locale:'en',strength: 1}).sort({sound: 1 });
    res.send(sound);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const findSoundList = async (req, res) => {
  let preparePost = {};
  try {
    const sound = await Sound.find(preparePost).sort({sound: -1 })
    res.send(sound);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}
const getSoundById = async (req, res) => {
  try {
    const sound = await Sound.findById(req.params.id);
    res.send(sound);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const updateSound = async (req, res) => {
  try {
    const sound = await Sound.findById(req.params.id);
    // if (village) {
    //   village.districtId = req.body.districtId;
    //   village.constituencyId = req.body.constituencyId;
    //   village.village = req.body.village;
    //   await village.save();
    //   res.send({ message: 'Village Updated Successfully!' });
    // }
  } catch (err) {
    res.status(404).send({ message: err });
  }
};
const deleteSound = (req, res) => {
  Sound.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: 'Sound Deleted Successfully!',
      });
    }
  });
};

const uploadBulkRecords = (req, res) => {
  try {
    let data = [];
    let error = [];
    let filedd ;
    upload(req, res, async function (err, response) {
      if (err) {
        res.send(err)
      }
      else {
        // const districtList = await District.find({});
        // const constituencyList = await Constituency.find({});

        filedd = path.join(__dirname.replace("controller", "uploads"),`\\${req.file.filename}`);
        const readFile = reader.readFile(path.join(__dirname.replace("controller", "uploads"), req.file.filename));
        const sheets = readFile.SheetNames;
        let successCount = 0 ;
        for (let i = 0; i < sheets.length; i++) {
          const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])
        //   temp.forEach((res) => {
        //     const district = res.district;
        //     let findDistrict = (districtList || []).find(function (e) {
        //       return e.district.toLowerCase() === district.toLowerCase();
        //     });
        //     const constituency = res.constituency;
        //     let findConstituency = (constituencyList || []).find(function (e) { 

        //       return e.constituency.toLowerCase() === constituency.toLowerCase();

        //     });


           
        //     if(findDistrict && findConstituency){
        //       try {
        //         const finalData = {
        //         districtId:findDistrict._id,
        //         constituencyId:findConstituency._id,
        //         village:res.villages
        //        };

        //        console.log(finalData);
        //         const newVillage = new Village(finalData);
        //          newVillage.save();
        //          successCount ++;
        //       } catch (err) {
        //         error.push(res);
        //       }
        //     }else{
        //       console.log(res)
        //       error.push(res)
        //     }
            
        //   });
        
          
        }
        // SUCCESS, image successfully uploaded
    
        fs.unlinkSync(filedd);

          res.send({ message: "Data imported successfully",
          "error":error,
          successCount:successCount })
        
      }
    })
    // res.send({ data: data });
  } catch (err) {

  }


}


module.exports = {
  addSound,
  addAllSound,
  getAllSound,
  getSoundById,
  updateSound,
  deleteSound,
  findSoundList,
  uploadBulkRecords,
};