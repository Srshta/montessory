const SchooleRegistration = require('../models/SchooleRegistration');
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const { signInToken, tokenForVerify, sendEmail } = require('../config/auth');

dayjs.extend(utc);

const addSchooleRegistration = async (req, res) => {
    try {
      const isEmailAdded = await SchooleRegistration.findOne({ email: req.body.email });
      if (isEmailAdded) {
        return res.status(403).send({
          message: 'This Mobile or Email already Added!',
        });
      }else{
        req.body.password = bcrypt.hashSync(req.body.password);
        const newSchooleRegistration= new SchooleRegistration(req.body);
        await newSchooleRegistration.save();
        res.send({ message: 'SchooleRegistration Added Successfully!' });
      }
      
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
  const loginSchooleRegistration = async (req, res) => {
    try {
     
      const schooleRegistration = await SchooleRegistration.findOne({ email: req.body.email });
      if (schooleRegistration && bcrypt.compareSync(req.body.password, schooleRegistration.password)) {
        const token = signInToken(schooleRegistration);
        res.send({
          token,
          email:schooleRegistration.email,
          _id : schooleRegistration._id
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
  const addAllSchooleRegistration = async (req, res) => {
    try {
      await SchooleRegistration.insertMany(req.body);
      res.status(200).send({
        message: 'SchooleRegistration Added successfully!',
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
  const getAllSchooleRegistration = async (req, res) => {
    try {
      const schooleRegistration = await SchooleRegistration.find({}).populate("cityId").populate("localityId").populate("categoryId");
      res.send(schooleRegistration);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };

const findSchooleRegistrationList=async(req, res)=>{
 
  let preparePost ={};
  if(req.body.localityId){
    preparePost = {...preparePost,...{"localityId" : ObjectId(req.body.localityId)}}
  }
  if(req.body.categoryId){
    preparePost = {...preparePost,...{"categoryId" : ObjectId(req.body.categoryId)}}
  }
  try {
    const schooleRegistration = await SchooleRegistration.find(preparePost).populate("cityId").populate("localityId").populate("categoryId");
    res.send(schooleRegistration);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}
  const getSchooleRegistrationById = async (req, res) => {
    try {
      const schooleRegistration = await SchooleRegistration.findById(req.params.id);
      res.send(schooleRegistration);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
  const updateSchooleRegistration = async (req, res) => {
    try {
      const schooleRegistration = await SchooleRegistration.findById(req.params.id);
      if (schooleRegistration) {
        schooleRegistration.schooleName = req.body.schooleName;
        schooleRegistration.address = req.body.address;
        schooleRegistration.city = req.body.city;
        schooleRegistration.pincode = req.body.pincode;
        schooleRegistration.selectCountry=req.body.selectCountry;
        schooleRegistration.name = req.body.name;
        schooleRegistration.email = req.body.email;
        schooleRegistration.mobileNumber = req.body.mobileNumber;
        schooleRegistration.schooleEmail = req.body.schooleEmail;
        schooleRegistration.schooleContact = req.body.schooleContact;
        schooleRegistration.password = req.body.password;
       
       
        await schooleRegistration.save();
        res.send({ message: 'schooleRegistration Updated Successfully!' });
      }
    } catch (err) {
      res.status(404).send({ message: 'schooleRegistration not found!' });
    }
  };
  const deleteSchooleRegistration = (req, res) => {
    SchooleRegistration.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send({
          message: 'schooleRegistration Deleted Successfully!',
        });
      }
    });
  };
  module.exports = {
    addSchooleRegistration,
    addAllSchooleRegistration,
    getAllSchooleRegistration,
    getSchooleRegistrationById,
    updateSchooleRegistration,
    deleteSchooleRegistration,
    findSchooleRegistrationList,
    loginSchooleRegistration
  };