const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const db = mongoose.connection;
const methodOverride = require("method-override");
const fitnessController = require("./controllers/fitness.js");
const dbupdateobject = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};
// =============middleware=============
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use("/home", fitnessController);
app.use(express.static("public"));
// ===========endOfMiddleware==========

app.get("/", (req, response) => {
  response.render("home.ejs");
});

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
