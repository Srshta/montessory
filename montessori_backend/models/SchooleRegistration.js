const mongoose = require('mongoose');

const schooleRegistrationSchema = new mongoose.Schema(
    {
        schooleName: {
            type: String,
            // unique:true,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {

            type: String,
            required: true,

        },
        pincode: {
            type: Number,
            required: true,
        },
        selectCountry: {
            type: String,
            default: true,
           
          },
          name: {
            type: String,
            required: true,
        },
        email:{
            type: String,
            unique:true,
            required: true,
        },
        mobileNumber: {
            type: String,
            
            required: true,
        },
        schooleEmail:{
            type: String,
            required: true,
        },
        schooleContact:{
            type: String,
            required: true,
        },
       password:{
            type: String,
            required: true,
        },
        roleType:{
            type: String,
            required: true,
        },
        subscription:{
            type: String,
            required: true,
        }
     },
    {
        timestamps: true,
    }
);

const SchooleRegistration = mongoose.models.SchooleRegistration || mongoose.model('SchooleRegistration', schooleRegistrationSchema);
module.exports = SchooleRegistration;