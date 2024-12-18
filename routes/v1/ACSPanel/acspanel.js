const express = require("express");
const router = express.Router();

const { dispatcher } = require("../../../middleware");
const { createApi, basicInformation, getData2, searchAndFilter } = require("../../../controllers/v1");

const { PERMS, RESOURCES } = require("../../../utils/constant");

const auth = require("../../../middleware/auth");

router.get("/acs", auth,(req, res, next) =>
  dispatcher(req, res, next,getData2,RESOURCES.ACSPanel,PERMS.EDIT)
);
router.get("/search", auth,(req, res, next) =>
  dispatcher(req, res, next,searchAndFilter,RESOURCES.ACSPanel,PERMS.EDIT)
);


module.exports = router;