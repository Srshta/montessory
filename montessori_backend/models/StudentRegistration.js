const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema(
    {
        schooleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SchooleRegistration",
            required: true,
        },
        studentName: {
            type: String,
            // unique:true,
            required: true,
        },
        dob: {
            type: String,
            required: true,
        },
        // classId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Class",
        //     required: true,
        //   },
          parentName: {
            type: String,
            required: true,
        },
        mobileNumber: {
            type: String,
            unique:true,
            required: true,
        },
        email:{
            type: String,
            unique:true,
            required: true,
        },
        password:{
            type: String,
            required: true,
        },
        address:{
            type: String,
            required: true,
        },
        selectCity:{
            type: String,
            required: true,
        },
        doa:{
            type: String,
            required: true,
        },
        allergies:{
            type: String,
            required: true,
        },
        roleType:{
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);
module.exports = Student;