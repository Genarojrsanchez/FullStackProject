const express = require("express");
const router = express.Router();

router.get("/new", (req, response) => {
  response.render("session/new.ejs");
})

router.post("/", (req, response) => {
  response.send("logging In...")
})

module.exports = router;
