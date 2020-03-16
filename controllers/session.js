const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const bcrypt = require("bcrypt");
router.get("/new", (req, response) => {
  response.render("session/new.ejs");
})

router.post("/", (req, response) => {
  User.findOne({username:req.body.username},(err, theUser) => {
    if(theUser === null){
      response.redirect("/session/new");
    } else {
      const passwordMatch = bcrypt.compareSync(req.body.password, theUser.password)
      if(passwordMatch){
        response.redirect("/home");
      } else {
        response.redirect("/session/new");
      }
    }
  })
})

module.exports = router;
