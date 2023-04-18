const Attendence = require('../models/Attendence');
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const { signInToken, tokenForVerify, sendEmail } = require('../config/auth');
dayjs.extend(utc);


const addAttendence = async (req, res) => {
    try {
      const newAttendence = new Attendence(req.body);
      await newAttendence.save();
      res.status(200).send({
        message: 'Attendence Added Successfully!',
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };




//   const loginStudent = async (req, res) => {
//     try {
//       const student = await student.findOne({ mobileNumber: req.body.mobileNumber });
//       if (student && bcrypt.compareSync(req.body.password, student.password)) {
//         const token = signInToken(student);
//         res.send({;
//           _id: student._id,
//           name: student.orgName,
//           phone: student.mobileNumber,
//           email:student.email,
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
  









const addAllAttendence = async (req, res) => {
    try {
      await Attendence.insertMany(req.body);
      res.status(200).send({
        message: 'Attendence Added successfully!',
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };



  const getAllAttendence = async (req, res) => {
    try {
      const attendence = await Attendence.find({}).populate("schooleId").populate("studentId").populate("classId").populate("teacherId");
      res.send(attendence);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };

  const findAttendenceList=async(req, res)=>{
    let preparePost ={};
    if(req.body.schooleId){
      preparePost = {"schooleId" : ObjectId(req.body.schooleId)};
    }
    try {
      const attendence = await Attendence.find(preparePost).populate("schooleId");
      res.send(attendence);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  }
  const getAttendenceById = async (req, res) => {
    try {
      const attendence = await Attendence.findById(req.params.id);
      res.send(attendence);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
  const updateAttendence = async (req, res) => {
    try {
      const attendence = await Attendence.findById(req.params.id);
      if (attendence) {
        attendence.schooleId = req.body.schooleId;
        attendence.studentId = req.body.studentId;
        attendence.classId = req.body.classId;
        attendence.teacherId = req.body.teacherId;
        attendence.status = req.body.status;
        attendence.attendence = req.body.attendence;
        attendence.date = req.body.date;
        await attendence.save();
        res.send({ message: 'Attendence Updated Successfully!' });
      }
    } catch (err) {
      res.status(404).send({ message: 'Attendence not found!' });
    }
  };
  const deleteAttendence = (req, res) => {
    Attendence.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send({
          message: 'Attendence Deleted Successfully!',
        });
      }
    });
  };
  module.exports = {
    addAttendence,
     addAllAttendence,
    getAllAttendence,
   getAttendenceById,
    updateAttendence,
    deleteAttendence,
    findAttendenceList,
    loginAttendence
  };