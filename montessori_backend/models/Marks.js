const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema(
    {
        schooleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SchooleRegistration",
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        examName: {
            type: String,
            required: true,
        },
        marks: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        examType: {
            type: String,
            required: true,
        },
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        classId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
            required: true,
        },
     },
    {
        timestamps: true,
    }
);

const Attendence = mongoose.models.Attendence || mongoose.model('Attendence', marksSchema);
module.exports = Attendence;