const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const Workout = require("./models/fitness.js")
const db = mongoose.connection;
const dbupdateobject = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};



// =============middleware=============
app.use(express.urlencoded({extended:true}));

// ===========endOfMiddleware==========


// ==============
// new route to get data back sent to new.ejs file.
// ==============

app.get("/home/new", (req, response) => {
  response.render("new.ejs")
})
// ==============
//second route built is a post route its action is to create
// send whats created in Database after schema
// ==============

app.post("/home/", (req, response) => {
  Workout.create(req.body, (err, createdWorkout) => {
    console.log(err);
    // console.log(createdWorkout);
    console.log("type is:" + typeof error);
      response.send(createdWorkout);
  });
});


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
// ========Connection code==============================
mongoose.connect(process.env.DATABASE_URL, dbupdateobject);

mongoose.connect('mongodb://localhost:27017/fitness', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {console.log('The connection with mongod is established')});
// ======== end connection code==============================

db.on("error", (err) => (console.log(err.message + "is mongod not running?")));
db.on("connected", () => (console.log("mongo connected: to the URL")));
db.on("disconnected", () => (console.log("mongo disconnected")));
