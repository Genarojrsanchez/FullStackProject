const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require('mongoose');
const db = mongoose.connection;
const dbupdateobject = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

mongoose.connect(process.env.DATABASE_URL, dbupdateobject);



app.get("/",(req, response) => {
  response.send("it\'s working");
})






db.on("error", (err) => (console.log(err.message + "is mongod not running?")));
db.on("connected", () => (console.log("mongo connected: to the URL")));
db.on("disconnected", () => (console.log("mongo disconnected")));




app.listen(process.env.PORT, () => {
  console.log("=============================");
  console.log(`listening on port: ${process.env.PORT}`);
  console.log("=============================");
})
