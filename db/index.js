const mongoose = require("mongoose");
require("dotenv").config();
const {MONGO_URI} = process.env;

const connectDb = () => {
    mongoose.connect(MONGO_URI,{
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log("MongoDB connected");
    })
    .catch(err=>{
        console.error(`Error connecting DB: ${err.message}`);
        process.exit(1);
    })
};

module.exports = connectDb;