const mongoose = require("mongoose");
const express = require('express')

const app = express();
const env = require('env');
require('dotenv').config();
const uri = process.env.MONGODB_URIURI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("Error connecting to database: ", error);
  });


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})