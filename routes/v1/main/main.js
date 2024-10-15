const express = require("express");
const router = express.Router();

const { dispatcher } = require("../../../middleware");
const { main} = require("../../../controllers/v1");

const { PERMS, RESOURCES } = require("../../../utils/constant");

router.get("/", (req, res, next) =>
  dispatcher(req, res, next,main)
);
  
module.exports = router;