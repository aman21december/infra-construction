const express = require("express");
const router = express.Router();

const { dispatcher } = require("../../../middleware");
const { login, logout} = require("../../../controllers/v1");

const { PERMS, RESOURCES } = require("../../../utils/constant");

router.post("/login", (req, res, next) =>
    dispatcher(req, res, next,login)
);

router.get("/logout",(req,res,next)=>
    dispatcher(req,res,next,logout)
)
  
module.exports = router;