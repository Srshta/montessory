const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema(
    {
        schooleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SchooleRegistration",
            required: true,
        },
        // classId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Class",
        //     required: true,
        // },
        // status: {
        //     type: Boolean,
        //     required: true,
        // },
        email: {
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true,
        },
        // subject: {
        //     type: String,
        //     required: true,
        // },
        qualification: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        mobileNumber: {
            type: Number,
            required: true,
        },
        // attendence: {
        //     type: Boolean,
        //     required: true,
        // },
        teacherName:{
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

const Teacher = mongoose.models.Teacher || mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;