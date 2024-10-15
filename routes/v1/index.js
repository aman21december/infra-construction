const express = require("express");
const app = express();

const { general } = require("./general");
const { registration } = require("./registration");
const { fetchotp } = require("./fetchotp");
const { main } = require("./main");
const { auth } = require("./auth");
const { form } = require("./form");
const { deopanel } = require("./deopanel");
const { application } = require("./application");
const { acspanel } = require("./ACSPanel");

app.use("/registration", registration);
app.use("/verifyotp", fetchotp)
app.use("/index",main)
app.use("/auth",auth)
app.use("/school",form)
app.use("/deopanel",deopanel)
app.use("/acspanel",acspanel)
app.use("/deo",application)
module.exports = app;
