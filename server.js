const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const Workout = require("./models/fitness.js")
const db = mongoose.connection;
const methodOverride = require("method-override")
const dbupdateobject = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};
// =============middleware=============
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
// ===========endOfMiddleware==========

// ==============
// index
// ==============

app.get("/home", (req, response) => {
  Workout.find({}, (error, userworkouts) =>{
    response.render(
      "index.ejs",
      {
      workouts: userworkouts
      }
    );
  })
});


// ==============
// new route to get data back sent to new.ejs file.
// ==============

app.get("/home/new", (req, response) => {
  response.render("new.ejs")
});

// ==============
//show page
// ==============
app.get("/home/:id", (req, response) => {
  Workout.findById(req.params.id, (err, theFitness) => {
      response.render(
        "show.ejs",
        {
          workouts:theFitness
        }
      )
  })
});

// ======================================
//second route built is a post route its action is to create
// send whats created in Database after schema
// ======================================

app.post("/home/", (req, response) => {
  Workout.create(req.body,(err, createdWorkout) => {
  //   if (err) console.log(err.message);
  //   console.log(`there are ${createdWorkout}`);
  // }else{
      response.redirect("/home");
  });
});


// // ==============
// // adjusting data delete edit and update
// // ==============

// ====edit=====
app.get("/home/:id/edit", (req, response) => {
  Workout.findById(req.params.id, (err, updateWorkout) => {
    response.render(
      "edit.ejs",
      {
        // going into my edit page
        workouts: updateWorkout
      }
    )
  });
});
// =====put=====
app.put("/home/:id", (req, response) => {
  Workout.findByIdAndUpdate(req.params.id, req.body,{new:true}, (err, updatedWorkout) => {
      response.redirect("/home");
  })
})
// ====delete===
app.delete("/home/:id", (req, response) => {
  Workout.findByIdAndRemove(req.params.id, (error, data) => {
    response.redirect("/home");
  })
})


app.listen(process.env.PORT, () => {
  console.log("=============================");
  console.log(`listening on port: ${process.env.PORT}`);
  console.log("=============================");
})
// ========Connection code==============================
mongoose.connect(process.env.DATABASE_URL, dbupdateobject);

// mongoose.connect('mongodb://localhost:27017/fitness', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {console.log('The connection with mongod is established')});
// ======== end connection code==============================

db.on("error", (err) => (console.log(err.message + "is mongod not running?")));
db.on("connected", () => (console.log("mongo connected: to the URL")));
db.on("disconnected", () => (console.log("mongo disconnected")));
