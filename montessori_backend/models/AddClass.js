const mongoose = require('mongoose');

const addclassSchema = new mongoose.Schema(
    {
        schooleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SchooleRegistration",
            required: true,
        },

        className: {
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

const AddClass = mongoose.models.AddClass || mongoose.model('Class', addclassSchema);
module.exports = AddClass;