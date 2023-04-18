const Student = require('../models/StudentRegistration');
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const { signInToken, tokenForVerify, sendEmail } = require('../config/auth');
dayjs.extend(utc);
const addStudent = async (req, res) => {
    try {
      const isAdded = await Student.findOne({ mobileNumber: req.body.mobileNumber });
      const isEmailAdded = await Student.findOne({ email: req.body.email });
      if (isAdded || isEmailAdded) {
        return res.status(403).send({
          message: 'This Mobile or Email already Added!',
        });
      }else{
      //  req.body.password = bcrypt.hashSync(req.body.password);
        const newStudent= new Student(req.body);
        await newStudent.save();
        res.send({ message: 'Student Added Successfully!' });
      }
      
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
  const loginStudent = async (req, res) => {
    try {
      const student = await Student.findOne({ mobileNumber: req.body.mobileNumber });
      if (student && bcrypt.compareSync(req.body.password, student.password)) {
        const token = signInToken(student);
        res.send({
          token,
          _id: student._id,
          name: student.orgName,
          phone: student.mobileNumber,
          email:student.email,
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
  const addAllStudent = async (req, res) => {
    try {
      await Student.insertMany(req.body);
      res.status(200).send({
        message: 'Student Added successfully!',
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
  const getAllStudent = async (req, res) => {
    try {
      let preparePost ={};
      if(req.params.schooleId){
        preparePost = {"schooleId" : ObjectId(req.params.schooleId)};
      }
      const student = await Student.find(preparePost).populate("schooleId").populate("classTeacherId").populate("classId");
      res.send(student);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
const findStudentList=async(req, res)=>{
  let preparePost ={};
  if(req.body.schooleId){
    preparePost = {"schooleId" : ObjectId(req.body.schooleId)};
  }
  try {
    const student = await Student.find(preparePost).populate("schooleId");
    res.send(student);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}
  const getStudentById = async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      res.send(student);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
  const updateStudent = async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      if (student) {
        student.schooleId = req.body.schooleId;
        student.studentName = req.body.studentName;
        student.dob = req.body.dob;
        student.selectClass = req.body.selectClass;
        student.parentName = req.body.parentName;
        student.mobileNumber = req.body.mobileNumber;
        student.email = req.body.email;
        student.address=req.body.address;
        student.selectCity = req.body.selectCity;
        student.doa = req.body.doa;
        student.allergies = req.body.allergies;
        student.classTeacherId = req.body.classTeacherId;
        student.classId = req.body.classId;
        student.attendence = req.body.attendence;
        student.marks = req.body.marks;
        student.status = req.body.status;
        await student.save();
        res.send({ message: 'Student Updated Successfully!' });
      }
    } catch (err) {
      res.status(404).send({ message: 'Student not found!' });
    }
  };
  const deleteStudent = (req, res) => {
    Student.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send({
          message: 'Student Deleted Successfully!',
        });
      }
    });
  };
  const getByIdStudent = async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      res.send(student);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
  module.exports = {
    addStudent,
     addAllStudent,
    getAllStudent,
   getStudentById,
    updateStudent,
    deleteStudent,
    findStudentList,
    loginStudent,
    getByIdStudent
  };