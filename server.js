const express = require("express");
require("dotenv").config();
const connectDb = require("./db");
const router = require("./routes");
const port = process.env.PORT;

//Connect to Database
connectDb();

//Initialize express
const app = express();

//Initialize middleware
app.use(express.json({extended:false}));
app.use(router);

//Start listening
app.listen(port,()=>console.log(`App running on port ${port}`));