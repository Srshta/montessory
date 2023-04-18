const Teacher = require('../models/Teacher');
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const { signInToken, tokenForVerify, sendEmail } = require('../config/auth');
dayjs.extend(utc);
const addTeacher = async (req, res) => {
    try {
      const isAdded = await Teacher.findOne({ mobileNumber: req.body.mobileNumber });
      const isEmailAdded = await Teacher.findOne({ email: req.body.email });
      if (isAdded || isEmailAdded) {
        return res.status(403).send({
          message: 'This Mobile or Email already Added!',
        });
      }else{
      //  req.body.password = bcrypt.hashSync(req.body.password);
        const newTeacher= new Teacher(req.body);
        await newTeacher.save();
        res.send({ message: 'Teacher Added Successfully!' });
      }
      
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
  const loginTeacher = async (req, res) => {
    try {
      const teacher = await Teacher.findOne({ mobileNumber: req.body.mobileNumber });
      if (teacher && bcrypt.compareSync(req.body.password, teacher.password)) {
        const token = signInToken(teacher);
        res.send({
          token,
          _id: teacher._id,
          name: teacher.orgName,
          phone: teacher.mobileNumber,
          email:teacher.email,
        });
      } else {
        res.status(401).send({
          message: 'Invalid Email or password!',
        });
      }
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
  const addAllTeacher = async (req, res) => {
    try {
      await Teacher.insertMany(req.body);
      res.status(200).send({
        message: 'Teacher Added successfully!',
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };

  const getAllTeacher = async (req, res) => {
    try {
      let preparePost ={};
      if(req.params.schooleId){
        preparePost = {"schooleId" : ObjectId(req.params.schooleId)};
      }
      const teacher = await Teacher.find(preparePost).populate("schooleId").populate("classId");
      res.send(teacher);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };

const findTeacherList=async(req, res)=>{
  let preparePost ={};
  if(req.body.schooleId){
    preparePost = {"schooleId" : ObjectId(req.body.schooleId)};
  }
  try {
    const teacher = await Teacher.find(preparePost).populate("schooleId");
    res.send(teacher);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}
  const getTeacherById = async (req, res) => {
    try {
      const teacher = await Teacher.findById(req.params.id);
      res.send(teacher);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
  const updateTeacher = async (req, res) => {
    try {
      const teacher = await Teacher.findById(req.params.id);
      if (teacher) {
        teacher.classId = req.body.classId;
        teacher.schooleId = req.body.schooleId;
        teacher.status = req.body.status;
        teacher.email = req.body.email;
        teacher.password = req.body.password;
        teacher.subject = req.body.subject;
        teacher.qualification = req.body.qualification;
        teacher.address=req.body.address;
        teacher.mobileNumber = req.body.mobileNumber;
        teacher.attendence = req.body.attendence;
        teacher.status = req.body.status;
        await teacher.save();
        res.send({ message: 'Teacher Updated Successfully!' });
      }
    } catch (err) {
      res.status(404).send({ message: 'Teacher not found!' });
    }
  };
  const deleteTeacher = (req, res) => {
    Teacher.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send({
          message: 'Teacher Deleted Successfully!',
        });
      }
    });
  };
  
  module.exports = {
    addTeacher,
     addAllTeacher,
    getAllTeacher,
   getTeacherById,
    updateTeacher,
    deleteTeacher,
    findTeacherList,
    loginTeacher,
    
  };