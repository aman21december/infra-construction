const express = require("express");
const router = express.Router();

const { dispatcher } = require("../../../middleware");
const { postfetchotp} = require("../../../controllers/v1");

const { PERMS, RESOURCES } = require("../../../utils/constant");

router.post("/", (req, res, next) =>
    dispatcher(req, res, next,postfetchotp)
);
  
module.exports = router;
