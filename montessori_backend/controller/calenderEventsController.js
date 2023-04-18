const CalelnderEvents = require('../models/CalenderEvents');
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const { signInToken, tokenForVerify, sendEmail } = require('../config/auth');
dayjs.extend(utc);
const addCalelnderEvents = async (req, res) => {
  console.log("addCalelnderEvents")
    try {
      const newCalelnderEvents = new CalelnderEvents(req.body);
      await newCalelnderEvents.save();
      res.status(200).send({
        message: 'Calelnder Events Added Successfully!',
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
  const addAllCalelnderEvents = async (req, res) => {
    try {
      await CalelnderEvents.insertMany(req.body);
      res.status(200).send({
        message: 'Calelnder Events Added successfully!',
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };

  const getAllCalelnderEvents = async (req, res) => {
    try {
      let preparePost ={};
      if(req.params.schooleId){
        preparePost = {"schooleId" : ObjectId(req.params.schooleId)};
      }
      const calelnderEvents = await CalelnderEvents.find(preparePost).populate("schooleId");
      res.send(calelnderEvents);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };

const findCalelnderEventsList=async(req, res)=>{
  let preparePost ={};
  if(req.body.schooleId){
    preparePost = {"schooleId" : ObjectId(req.body.schooleId)};
  }
  try {
    const calelnderEvents = await CalelnderEvents.find(preparePost).populate("schooleId");
    res.send(calelnderEvents);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}
  const getCalelnderEventsById = async (req, res) => {
    try {
      const calelnderEvents = await CalelnderEvents.findById(req.params.id);
      res.send(calelnderEvents);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
  const updateCalelnderEvents = async (req, res) => {
    try {
      console.log(req.params.id)
      const calelnderEvents = await CalelnderEvents.findById(req.params.id);
      if (calelnderEvents) {
        calelnderEvents.schooleId = req.body.schooleId;
        calelnderEvents.teacherId = req.body.teacherId;
        calelnderEvents.eventName = req.body.eventName;
        calelnderEvents.dateTime = req.body.dateTime;
        await calelnderEvents.save();
        res.send({ message: 'Calelnder Events Updated Successfully!' });
      }
    } catch (err) {
      res.status(400).send({ message: err });
    }
  };
  const deleteCalelnderEvents = (req, res) => {
    CalelnderEvents.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send({
          message: 'Calelnder Events Deleted Successfully!',
        });
      }
    });
  };
  
  module.exports = {
    addCalelnderEvents,
     addAllCalelnderEvents,
    getAllCalelnderEvents,
   getCalelnderEventsById,
    updateCalelnderEvents,
    deleteCalelnderEvents,
    findCalelnderEventsList,
    // loginActivity,
    
  };