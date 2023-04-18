const mongoose = require('mongoose');
const subActivitySchema = new mongoose.Schema(
    {
        schooleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SchooleRegistration",
            required: true,
        },
        activityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ActivityTabel",
            required: true,
        },
        subActivityName: {
            type: String,
            required: true,
        },
     },
    {
        timestamps: true,
    }
);

const SubActivity = mongoose.models.SubActivity || mongoose.model('SubActivity', subActivitySchema);
module.exports = SubActivity;