const SuperActivityTabel = require('../models/SuperActivity');
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const { signInToken, tokenForVerify, sendEmail } = require('../config/auth');
dayjs.extend(utc);
const addSuperActivityTabel = async (req, res) => {
  console.log("addSuperActivityTabel")
    try {
      const newSuperActivityTabel = new SuperActivityTabel(req.body);
      await newSuperActivityTabel.save();
      res.status(200).send({
        message: 'Super Activity Tabel Added Successfully!',
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
//   const loginActivity = async (req, res) => {
//     try {
//       const activity = await Activity.findOne({ mobileNumber: req.body.mobileNumber });
//       if (teacher && bcrypt.compareSync(req.body.password, teacher.password)) {
//         const token = signInToken(teacher);
//         res.send({
//           token,
//           _id: teacher._id,
//           name: teacher.orgName,
//           phone: teacher.mobileNumber,
//           email:teacher.email,
//         });
//       } else {
//         res.status(401).send({
//           message: 'Invalid Email or password!',
//         });
//       }
//     } catch (err) {
//       res.status(500).send({
//         message: err.message,
//       });
//     }
//   };
  const addAllSuperActivityTabel = async (req, res) => {
    try {
      await SuperActivityTabel.insertMany(req.body);
      res.status(200).send({
        message: 'Super Activity Tabel Added successfully!',
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };

  const getAllSuperActivityTabel = async (req, res) => {
    try {
      let preparePost ={};
      if(req.params.schooleId){
        preparePost = {"schooleId" : ObjectId(req.params.schooleId)};
      }
      const superActivityTabel = await SuperActivityTabel.find(preparePost).populate("schooleId");
      res.send(superActivityTabel);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };

const findSuperActivityTabelList=async(req, res)=>{
  let preparePost ={};
  if(req.body.schooleId){
    preparePost = {"schooleId" : ObjectId(req.body.schooleId)};
  }
  try {
    const superActivityTabel = await SuperActivityTabel.find(preparePost).populate("schooleId");
    res.send(superActivityTabel);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}
  const getSuperActivityTabelById = async (req, res) => {
    try {
      const superActivityTabel = await SuperActivityTabel.findById(req.params.id);
      res.send(superActivityTabel);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
  const updateSuperActivityTabel = async (req, res) => {
    try {
      
      const superActivityTabel = await SuperActivityTabel.findById(req.params.id);
      
      if (superActivityTabel) {
        superActivityTabel.schooleId = req.body.schooleId;
        superActivityTabel.superActivityName = req.body.superActivityName;
        await superActivityTabel.save();
        res.send({ message: 'Super Activity Tabel Updated Successfully!' });
      }
    } catch (err) {
      res.status(400).send({ message: err });
    }
  };
  const deleteSuperActivityTabel = (req, res) => {
    SuperActivityTabel.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send({
          message: 'Super Activity Tabel Deleted Successfully!',
        });
      }
    });
  };
  
  module.exports = {
    addSuperActivityTabel,
     addAllSuperActivityTabel,
    getAllSuperActivityTabel,
   getSuperActivityTabelById,
    updateSuperActivityTabel,
    deleteSuperActivityTabel,
    findSuperActivityTabelList,
    // loginActivity,
    
  };