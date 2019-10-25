const mongoose = require("mongoose");

const PartnerSchema = new mongoose.Schema({
    name: String,
    surname: String,
    participation: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Partner", PartnerSchema);