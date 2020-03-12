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



// ==============
// new route to get data back sent to new.ejs file.
// ==============

app.get("/home/new", (req, response) => {
  response.render("new.ejs")
})
// ==============
//
// ==============

app.get("/",(req, response) => {
  response.send("it\'s working");
})


// // ==============
// //
// // ==============
//
// app.get("/variable/show", (req, response) => {
//   response.send("my show page")
// })
//
// // ==============
// //
// // ==============
// app.get("/create/:id", (req, response) => {
//   response.send("my create page")
// })
//
// // ==============
// // adjusting data delete edit and update
// // ==============



app.listen(process.env.PORT, () => {
  console.log("=============================");
  console.log(`listening on port: ${process.env.PORT}`);
  console.log("=============================");
})



db.on("error", (err) => (console.log(err.message + "is mongod not running?")));
db.on("connected", () => (console.log("mongo connected: to the URL")));
db.on("disconnected", () => (console.log("mongo disconnected")));
