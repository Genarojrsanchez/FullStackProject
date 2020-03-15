const express = require("express");
const router = express.Router();
const Workout = require("../models/fitness.js")

// ==============
// index
// ==============
router.get("/", (req, response) => {
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

router.get("/new", (req, response) => {
  response.render("new.ejs")
});

// ==============
//show page
// ==============
router.get("/:id", (req, response) => {
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

router.post("/", (req, response) => {
  Workout.create(req.body,(err, createdWorkout) => {
  //   if (err) console.log(err.message);
  //   console.log(`there are ${createdWorkout}`);
  // }else{
      response.redirect("/home");
  });
});
// ==============
// adjusting data delete edit and update
// ==============

// ====edit=====
router.get("/:id/edit", (req, response) => {
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
router.put("/:id", (req, response) => {
  Workout.findByIdAndUpdate(req.params.id, req.body,{new:true}, (err, updatedWorkout) => {
      response.redirect("/home");
  })
})
// ====delete===
router.delete("/:id", (req, response) => {
  Workout.findByIdAndRemove(req.params.id, (error, data) => {
    response.redirect("/home");
  })
})

module.exports = router;
