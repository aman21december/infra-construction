const express = require("express");
const router = express.Router();

const { dispatcher } = require("../../../middleware");
const { createApi, getRegistration, postRegistration} = require("../../../controllers/v1");

const { PERMS, RESOURCES } = require("../../../utils/constant");

router.get("/", (req, res, next) =>
  dispatcher(req, res, next,getRegistration)
);
router.post("/", (req, res, next) =>
    dispatcher(req, res, next,postRegistration)
);
  
module.exports = router;
