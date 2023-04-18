const AddClass = require('../models/AddClass');
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const { signInToken, tokenForVerify, sendEmail } = require('../config/auth');
dayjs.extend(utc);
const addAddClass = async (req, res) => {
    try {
      const newAddClass = new AddClass(req.body);
      await newAddClass.save();
      res.status(200).send({
        message: 'Class Added Successfully!',
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
  
const addAllAddClass = async (req, res) => {
    try {
      await AddClass.insertMany(req.body);
      res.status(200).send({
        message: 'Class Added successfully!',
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };

  const getAllAddClass = async (req, res) => {
    try {
      let preparePost ={};
       if(req.params.schooleId){
        preparePost = {"schooleId" : ObjectId(req.params.schooleId)};
      }
      const addClass  = await AddClass .find(preparePost).populate("schooleId");
      res.send(addClass);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };

  const findAddClassList=async(req, res)=>{
    let preparePost ={};
    if(req.body.schooleId){
      preparePost = {"schooleId" : ObjectId(req.body.schooleId)};
    }
    try {
      const addClass = await AddClass.find(preparePost).populate("schooleId");
      res.send(addClass);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  }
  const getAddClassById = async (req, res) => {
    try {
      const addClass = await AddClass.findById(req.params.id);
      res.send(addClass);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
  const updateAddClass = async (req, res) => {
    try {
      const addClass = await AddClass.findById(req.params.id);
      if (addClass) {
        addClass.schooleId = req.body.schooleId;
        addClass.className = req.body.className;
        addClass.status = req.body.status;
        await addClass.save();
        res.send({ message: 'Class Updated Successfully!' });
      }
    } catch (err) {
      res.status(404).send({ message: 'Class not found!' });
    }
  };
  const deleteAddClass = (req, res) => {
    AddClass.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send({
          message: 'Class Deleted Successfully!',
        });
      }
    });
  };
  const getAddClassNameById = async (req, res) => {
    try {
      const addClass = await AddClass.findById(req.params.id);
      res.send(className);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  }

  module.exports = {
    addAddClass,
     addAllAddClass,
    getAllAddClass,
   getAddClassById,
    updateAddClass,
    deleteAddClass,
    findAddClassList,
    // loginAddClass,
    getAddClassNameById
  };