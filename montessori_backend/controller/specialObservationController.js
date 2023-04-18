const SpecialObservation = require('../models/SpecialObservation');
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const { signInToken, tokenForVerify, sendEmail } = require('../config/auth');
dayjs.extend(utc);
const addSpecialObservation = async (req, res) => {
  console.log("addSpecialObservation")
    try {
      const newSpecialObservation = new SpecialObservation(req.body);
      await newSpecialObservation.save();
      res.status(200).send({
        message: 'Special Observation Added Successfully!',
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
  const addAllSpecialObservation = async (req, res) => {
    try {
      await SpecialObservation.insertMany(req.body);
      res.status(200).send({
        message: 'Special Observation Added successfully!',
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
  const addAllSpecialObservationBySpecialObservationId = async (req, res) => {
    try {
      let preparePost ={};
      if(req.body.schooleId){
        preparePost = {"schooleId" : ObjectId(req.body.schooleId)};
      }
  
      const specialObservation = await SpecialObservation.find(preparePost).populate("schooleId");
      res.send(specialObservation);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
  const getAllSpecialObservation = async (req, res) => {
    try {
      let preparePost ={};
      if(req.params.schooleId){
        preparePost = {"schooleId" : ObjectId(req.params.schooleId)};
      }
     
      const specialObservation = await SpecialObservation.find(preparePost).populate("schooleId").populate("studentId");
      res.send(specialObservation);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };

const findSpecialObservationList=async(req, res)=>{
  let preparePost ={};
  if(req.body.schooleId){
    preparePost = {"schooleId" : ObjectId(req.body.schooleId)};
  }
  try {
    const specialObservation = await SpecialObservation.find(preparePost).populate("schooleId");
    res.send(specialObservation);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}
  const getSpecialObservationById = async (req, res) => {
    try {
      const specialObservation = await SpecialObservation.findById(req.params.id);
      res.send(specialObservation);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
  const updateSpecialObservation = async (req, res) => {
    try {
      console.log(req.params.id)
      const specialObservation = await SpecialObservation.findById(req.params.id);
      if (specialObservation) {
        specialObservation.studentId = req.body.studentId;
        specialObservation.schooleId = req.body.schooleId;
        specialObservation.date=req.body.date;
        specialObservation.specialObservation=req.body.specialObservation;
        await specialObservation.save();
        res.send({ message: 'Special Observation Updated Successfully!' });
      }
    } catch (err) {
      res.status(400).send({ message: err });
    }
  };
  const deleteSpecialObservation = (req, res) => {
    SpecialObservation.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send({
          message: 'Special Observation Deleted Successfully!',
        });
      }
    });
  };
  
  module.exports = {
    addSpecialObservation,
     addAllSpecialObservation,
    getAllSpecialObservation,
   getSpecialObservationById,
    updateSpecialObservation,
    deleteSpecialObservation,
    findSpecialObservationList,
    addAllSpecialObservationBySpecialObservationId
    // loginActivity,
    
  };