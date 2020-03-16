const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const db = mongoose.connection;
const methodOverride = require("method-override");
const bcrypt = require("bcrypt");
const dbupdateobject = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};
// =============middleware====================
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
// =============controllers=======================
const fitnessController = require("./controllers/fitness.js");
app.use("/home", fitnessController);

const userController = require("./controllers/users.js");
app.use("/users", userController);

const sessionController = require("./controllers/session.js");
app.use("/session", sessionController);
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
