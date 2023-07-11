const Activity = require('../models/Activity');
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const { signInToken, tokenForVerify, sendEmail } = require('../config/auth');
dayjs.extend(utc);
const addActivity = async (req, res) => {
    try {
      console.log(req.body)
      const newActivity = new Activity(req.body);
      await newActivity.save();
      res.status(200).send({
        message: 'Activity Added Successfully!',
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
  const addAllActivity = async (req, res) => {
    try {
      await Activity.insertMany(req.body);
      res.status(200).send({
        message: 'Activity Added successfully!',
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
  const getAllActivity = async (req, res) => {
    try {
      let preparePost ={};
      if(req.params.schooleId){
        preparePost = {"schooleId" : ObjectId(req.params.schooleId)};
      }
      if(req.params.status){
        preparePost ={...preparePost,...{"isFuturePlanning" : req.params.status}};
      }
      console.log(preparePost)
      const activity = await Activity.find(preparePost).populate("schooleId")
      // .populate("classId")
      .populate("studentId").populate("activityId").populate("superActivityId").populate("subActivityId");
      res.send(activity);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
const findActivityList=async(req, res)=>{
  let preparePost ={};
  if(req.body.schooleId){
    preparePost = {"schooleId" : ObjectId(req.body.schooleId)};
  }
  // if(req.body.classId){
  //   preparePost = {...preparePost,...{"classId" : ObjectId(req.body.classId)}};
  // }
  
  if(req.body.studentId){
    preparePost = {...preparePost,...{"studentId" : ObjectId(req.body.studentId)}};
  }
  if(req.body.activityId){
    preparePost = {...preparePost,...{"activityId" : ObjectId(req.body.activityId)}};
  }
  if(req.body.startDate1 && req.body.endDate1){
    preparePost = {...preparePost,...{"date" : {$gte:new Date(req.body.startDate1).toISOString(), $lt:new Date(req.body.endDate1).toISOString()}}};
  }
  if(req.body.startDate && req.body.endDate){
    preparePost = {...preparePost,...{"sfd" : {$gte:new Date(req.body.startDate).toISOString(),$lt:new Date(req.body.endDate).toISOString()}}};
  }
  if(req.body.key){
    preparePost = {...preparePost,...{"key" : (req.body.key)}};
  }
  console.log(preparePost);
  try {
    const activity = await Activity.find(preparePost).populate("schooleId")
    // .populate("classId")
    .populate("studentId").populate("superActivityId").populate("activityId").populate("subActivityId");
    res.send(activity);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}
const addAllActivityBySuperActivityId = async (req, res) => {
  try {
    let preparePost ={};
    if(req.body.schooleId){
      preparePost = {"schooleId" : ObjectId(req.body.schooleId)};
    }
    if(req.body.activityId){
      preparePost = {...preparePost,...{"superActivityId" : ObjectId(req.body.superActivityId)}};
    }
    const activity = await Activity.find(preparePost).populate("schooleId").populate("superActivityId");
    res.send(activity);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};




  const getActivityById = async (req, res) => {
    try {
      const activity = await Activity.findById(req.params.id);
      res.send(activity);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };  
  const updateActivity = async (req, res) => {
    try {
      const activity = await Activity.findById(req.params.id);
      console.log(activity)
      if (activity) {
        activity.schooleId = req.body.schooleId;
        // activity.classId = req.body.classId;
        // activity.academicYear = req.body.academicYear;
        activity.studentId = req.body.studentId;
        activity.activityId = req.body.activityId;
        activity.superActivityId = req.body.superActivityId;
        activity.subActivityId=req.body.subActivityId;
        activity.remarks=req.body.remarks;
        activity.planning=req.body.planning;
        activity.key=req.body.key;
        activity.authorizedPerson=req.body.authorizedPerson;
        activity.sfd=req.body.sfd;
        activity.date=req.body.date;
        await activity.save();
        res.send({ message: 'Activity Updated Successfully!' });
      }
    } catch (err) {
      res.status(404).send({ message: err });
    }
  };
  const deleteActivity = (req, res) => {
    Activity.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send({
          message: 'Activity Deleted Successfully!',
        });
      }
    });
  };
  module.exports = {
    addActivity,
     addAllActivity,
    getAllActivity,
   getActivityById,
    updateActivity,
    deleteActivity,
    findActivityList,
    addAllActivityBySuperActivityId
    // loginActivity,
    
  };