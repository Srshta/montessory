const mongoose = require('mongoose');
const soundSchema = new mongoose.Schema(
    {
        sound:{
            type: String,
            required: true,
        },
     },
    {
        timestamps: true,
    }
);

const Sound = mongoose.models.Sound || mongoose.model('Sound', soundSchema);
module.exports = Sound;