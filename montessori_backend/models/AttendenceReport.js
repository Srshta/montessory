const mongoose = require('mongoose');

const attendenceReportSchema = new mongoose.Schema(
    {  schooleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SchooleRegistration",
        required: true,
    },
        attendenceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attendence",
            required: true,
        },
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
    
        date: {
            type: String,
            required: true,
        },
        studentName: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
        },
     },
    {
        timestamps: true,
    }
);

const AttendenceReport = mongoose.models.AttendenceReport || mongoose.model('AttendenceReport', attendenceReportSchema);
module.exports = AttendenceReport;