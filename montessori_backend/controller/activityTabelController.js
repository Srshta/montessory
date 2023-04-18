const ActivityTabel = require('../models/ActivityList');
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const { signInToken, tokenForVerify, sendEmail } = require('../config/auth');
dayjs.extend(utc);
const addActivityTabel = async (req, res) => {
  console.log("addActivityTabel")
    try {
      const newActivityTabel = new ActivityTabel(req.body);
      await newActivityTabel.save();
      res.status(200).send({
        message: 'Activity Tabel Added Successfully!',
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
  const addAllActivityTabel = async (req, res) => {
    try {
      await ActivityTabel.insertMany(req.body);
      res.status(200).send({
        message: 'Activity Tabel Added successfully!',
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
  const addAllActivityTabelByActivityTabelId = async (req, res) => {
    try {
      let preparePost ={};
      if(req.body.schooleId){
        preparePost = {"schooleId" : ObjectId(req.body.schooleId)};
      }
      if(req.body.superActivityId){
        preparePost = {...preparePost,...{"superActivityId" : ObjectId(req.body.superActivityId)}};
      }
      const activityTabel = await ActivityTabel.find(preparePost).populate("schooleId").populate("superActivityId");
      res.send(activityTabel);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
  const getAllActivityTabel = async (req, res) => {
    try {
      let preparePost ={};
      if(req.params.schooleId){
        preparePost = {"schooleId" : ObjectId(req.params.schooleId)};
      }
     
      const activityTabel = await ActivityTabel.find(preparePost).populate("schooleId").populate("superActivityId");
      res.send(activityTabel);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };

const findActivityTabelList=async(req, res)=>{
  let preparePost ={};
  if(req.body.schooleId){
    preparePost = {"schooleId" : ObjectId(req.body.schooleId)};
  }
  try {
    const activityTabel = await ActivityTabel.find(preparePost).populate("schooleId");
    res.send(activityTabel);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}
  const getActivityTabelById = async (req, res) => {
    try {
      const activityTabel = await ActivityTabel.findById(req.params.id);
      res.send(activityTabel);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
  const updateActivityTabel = async (req, res) => {
    try {
      console.log(req.params.id)
      const activityTabel = await ActivityTabel.findById(req.params.id);
      if (activityTabel) {
        activityTabel.schooleId = req.body.schooleId;
        activityTabel.superActivityId = req.body.superActivityId;
        activityTabel.activityName = req.body.activityName;
        await activityTabel.save();
        res.send({ message: 'Activity Tabel Updated Successfully!' });
      }
    } catch (err) {
      res.status(400).send({ message: err });
    }
  };
  const deleteActivityTabel = (req, res) => {
    ActivityTabel.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send({
          message: 'Activity Tabel Deleted Successfully!',
        });
      }
    });
  };
  
  module.exports = {
    addActivityTabel,
     addAllActivityTabel,
    getAllActivityTabel,
   getActivityTabelById,
    updateActivityTabel,
    deleteActivityTabel,
    findActivityTabelList,
    addAllActivityTabelByActivityTabelId
    // loginActivity,
    
  };