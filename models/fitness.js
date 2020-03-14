const mongoose = require("mongoose");

const fitnessSchema = new mongoose.Schema({
  name: {type: String, required:true},
  fitness: {type: String, required:true},
  sleep: {type: String, required:true},
  calories:{type: String, required:true},

});

const Workout = mongoose.model("Workout", fitnessSchema);

module.exports = Workout;
