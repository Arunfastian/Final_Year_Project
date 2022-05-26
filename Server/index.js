const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const cors = require('cors');
const app = express();
dotenv.config();
app.use(bodyparser.json());
app.use(cors());


const Port = process.env.PORT || 3001;
const URL = process.env.DB_URL;


app.use('/User',require('./routes/routes.js'))


mongoose.connect(process.env.DB_URL,{ useNewUrlParser: true, useUnifiedTopology: true}, () => {
  console.log("Connected To DB");
});



app.listen(Port, () => {
  console.log(`Listening On ${Port}`);
});
