const mongoose = require('mongoose');

const attendenceSchema = new mongoose.Schema(
    {
        schooleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SchooleRegistration",
            required: true,
        },
        studentList: [{}],
        // classId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Class",
        //     required: true,
        // },
        teacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
     },
    {
        timestamps: true,
    }
);

const Attendence = mongoose.models.Attendence || mongoose.model('Attendence', attendenceSchema);
module.exports = Attendence;