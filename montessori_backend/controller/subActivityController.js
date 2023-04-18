const SubActivity = require('../models/SubActivity');
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const { signInToken, tokenForVerify, sendEmail } = require('../config/auth');
const {replaceStr} = require('../utils/activites')

dayjs.extend(utc);
const addSubActivity = async (req, res) => {
    try {
      const newSubActivity = new SubActivity(req.body);
      await newSubActivity.save();
      res.status(200).send({
        message: 'Sub Activity Tabel Added Successfully!',
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
  const addAllSubActivity = async (req, res) => {
    try {
      await SubActivity.insertMany(req.body);
      res.status(200).send({
        message: 'Sub Activity Tabel Added successfully!',
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
  const addAllSubActivityByActivityId = async (req, res) => {
    try {
      let preparePost ={};
      if(req.body.schooleId){
        preparePost = {"schooleId" : ObjectId(req.body.schooleId)};
      }
      if(req.body.activityId){
        preparePost = {...preparePost,...{"activityId" : ObjectId(req.body.activityId)}};
      }
      const subActivity = await SubActivity.find(preparePost).populate("schooleId").populate("activityId");
      res.send(subActivity);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };

  const getAllSubActivity = async (req, res) => {
    try {
      let preparePost ={};
      if(req.params.schooleId){
        preparePost = {"schooleId" : ObjectId(req.params.schooleId)};
      }
      const subActivity = await SubActivity.find(preparePost).populate("schooleId").populate("activityId");
      res.send(subActivity);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
const findSubActivityList=async(req, res)=>{
  let preparePost ={};
  if(req.body.schooleId){
    preparePost = {"schooleId" : ObjectId(req.body.schooleId)};
  }
  try {
    const subActivity = await SubActivity.find(preparePost).populate("schooleId");
    res.send(subActivity);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}
  const getSubActivityById = async (req, res) => {
    try {
      const subActivity = await SubActivity.findById(req.params.id);
      res.send(subActivity);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
  const updateSubActivity = async (req, res) => {
    try {
      console.log(req.params.id)
      const subActivity = await SubActivity.findById(req.params.id);
      if (subActivity) {
        subActivity.schooleId = req.body.schooleId;
        subActivity.activityId = req.body.activityId;
        subActivity.subActivityName = req.body.subActivityName;
        await subActivity.save();
        res.send({ message: 'Sub Activity Updated Successfully!' });
      }
    } catch (err) {
      res.status(400).send({ message: err });
    }
  };
  const deleteSubActivity = (req, res) => {
    SubActivity.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send({
          message: 'Sub Activity Deleted Successfully!',
        });
      }
    });
  };
  const uploadBulkRecords=(req, res)=>{
    try {
      
     
   
    for (let i=0; i<replaceStr.length; i++){
      
      const subActivityData = replaceStr[i];
      const splitData = subActivityData.activityList.trim().split(",");
      for(let l=0;l<splitData.length;l++){
console.log(splitData[l])
if(splitData[l] && splitData[l] !== ''){

  const newSubActivity = new SubActivity({subActivityName:splitData[l].trim(),
  "activityId" : subActivityData.subActivityId,
  "schooleId" : '63bd1c36e6f3e018ac02b374'});
   newSubActivity.save();
}
      }

  }
} catch (err) {
     console.log(err)
}
    res.send({ message: 'Uploaded Successfully!' });
    
  }
  module.exports = {
    addSubActivity,
     addAllSubActivity,
    getAllSubActivity,
   getSubActivityById,
    updateSubActivity,
    deleteSubActivity,
    findSubActivityList,
    addAllSubActivityByActivityId,
    uploadBulkRecords
    // loginActivity,
    
  };