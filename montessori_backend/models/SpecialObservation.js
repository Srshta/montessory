const mongoose = require('mongoose');
const specialObservationSchema = new mongoose.Schema(
    {
        schooleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SchooleRegistration",
            required: true,
        },
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        specialObservation:{
            type: String,
            required: true,
        },
        date:{
            type: String, 
            required: true,
        }
     },
    {
        timestamps: true,
        
    }
);

const SpecialObservation = mongoose.models.SpecialObservation || mongoose.model('SpecialObservation', specialObservationSchema);
module.exports = SpecialObservation;