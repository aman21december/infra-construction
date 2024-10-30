const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser=require("cookie-parser")
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
require("moment-timezone")().tz("Asia/Kolkata");

const { validator, validateToken, handleError } = require("./middleware");

console.log(process.env.NODE_ENV);

const { v1 } = require("./routes");
const sequelize = require("./config/db");
const { morganLogger } = require("./middleware/logger");

const app = express();
app.use(cookieParser());
app.set("view engine", "ejs");
app.use("/", express.static(path.join(__dirname, "../public")));



app
  .use(morganLogger)
  .use(cors())
  .use(helmet())
  .use(
    bodyParser.urlencoded({
      limit: "100mb",
      extended: true,
      parameterLimit: 50000,
    })
  )
  .use(bodyParser.json({ limit: "100mb" }))
  .use(express.static(path.join(__dirname, "public")));

  app.use((req, res, next) => {
    // Set X-Frame-Options header to prevent clickjacking
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');

    // Set X-XSS-Protection header to enable XSS protection in browsers
    res.setHeader('X-XSS-Protection', '1; mode=block');

    // Set X-Content-Type-Options header to prevent MIME sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');

    // Set Content-Security-Policy header to prevent various types of attacks
    // res.setHeader('Content-Security-Policy', "default-src 'self'");
    res.setHeader('Content-Security-Policy', "script-src 'self' 'unsafe-inline'");
    // Set Strict-Transport-Security header to enforce HTTPS
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

    // Set Referrer-Policy header to control referrer information
    res.setHeader('Referrer-Policy', 'no-referrer');

    // Call the next middleware function in the stack
    next();
});

app.use("/v1", v1);

app.use((err, req, res, next) => {
  handleError(err, res);
});

sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    throw err;
  });

module.exports = app;
