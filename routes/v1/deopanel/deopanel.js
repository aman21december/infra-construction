const express = require("express");
const router = express.Router();

const { dispatcher } = require("../../../middleware");
const { createApi, basicInformation, getData, searchAndFilter } = require("../../../controllers/v1");

const { PERMS, RESOURCES } = require("../../../utils/constant");

const auth = require("../../../middleware/auth");

router.get("/deo", auth,(req, res, next) =>
  dispatcher(req, res, next,getData,RESOURCES.DEOPANEL,PERMS.EDIT)
);
router.get("/search", auth,(req, res, next) =>
    dispatcher(req, res, next,searchAndFilter,RESOURCES.DEOPANEL,PERMS.EDIT)
  );
  


module.exports = router;
