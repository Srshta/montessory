const mongoose = require('mongoose');
const superActivityTabelSchema = new mongoose.Schema(
    {
        schooleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SchooleRegistration",
            required: true,
        },
        superActivityName: {
            type: String,
            required: true,
        },
     },
    {
        timestamps: true,
    }
);

const SuperActivityTabel = mongoose.models.SuperActivityTabel || mongoose.model('SuperActivityTabel', superActivityTabelSchema);
module.exports = SuperActivityTabel;