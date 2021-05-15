const mongoose = require("mongoose");
const {Schema} = mongoose;

dataSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique:true
    },
    country: {
        type: String,
        trim: true,
        required: true
    }
});

module.exports = mongoose.model("Data",dataSchema);