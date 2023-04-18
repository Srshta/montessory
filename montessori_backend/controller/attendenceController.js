const Attendence = require('../models/Attendence');
const AttendenceReport = require('../models/AttendenceReport');
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const { signInToken, tokenForVerify, sendEmail } = require('../config/auth');
dayjs.extend(utc);
const addAttendence = async (req, res) => {
    try {
      const isDate = await Attendence.findOne({  date:req.body.date });
      if (isDate) {
        return res.status(403).send({
          message: 'This Date Attendence is already Added!',
        });
      }
      const newAttendence = new Attendence(req.body);
     const result = await newAttendence.save();
     
     for(let i=0;i<req.body.studentList.length;i++){
      const studentDetails = req.body.studentList[i];
      const newAttendenceReports = new AttendenceReport({
        attendenceId:result._id,
        schooleId:result.schooleId,
        studentId:studentDetails._id,
        studentName:studentDetails.studentName,
        date:req.body.date,
        status:studentDetails.status
      });
       await  newAttendenceReports.save();
     }
    
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
      const attendence = await Attendence.find({}).populate("schooleId")
      // .populate("classId")
      .populate("teacherId");
      res.send(attendence);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
  const getAllReports = async (req, res) => {
    try {
      console.log("adsfas")
      let preparePost ={};
      if(req.body.schooleId){
        preparePost = {"schooleId" : ObjectId(req.body.schooleId)};
      }
      if(req.body.studentId){
        preparePost = {"studentId" : ObjectId(req.body.studentId)};
      }
      if(req.body.startDate1 && req.body.endDate1){
        preparePost = {...preparePost,...{"date" : {$gte:new Date(req.body.startDate1).toISOString(),$lt:new Date(req.body.endDate1).toISOString()}}};
      }

      const attendence = await AttendenceReport.aggregate(
        [
         {
          $match : preparePost
        },
        {
            $group: {
                          _id: '$studentId',
                       
                          "present": {
                              "$sum": {
                                  "$cond": [
                                       {"$eq": ["$status", true]},
                                        1, 
                                        0]
                              }
                           },
                           "absent": {
                              "$sum": {
                                  "$cond": [
                                       {"$eq": ["$status", false]},
                                         1,
                                         0]
                              }
                          },
                          count: { $sum: 1 },
                          "studentDetails":{"$push":"$$ROOT"}
                          
                             
                          
                           }
        }
        ]
         
         
       );
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
    if(req.body.date){
      preparePost = {...preparePost,...{"date" :req.body.date}};
    }
    // if(req.body.classId){
    //   preparePost = {...preparePost,...{"classId" : ObjectId(req.body.classId)}};
    // }
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
        attendence.studentList = req.body.studentList;
        // attendence.classId = req.body.classId;
        attendence.teacherId = req.body.teacherId;
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
    getAllReports
  };