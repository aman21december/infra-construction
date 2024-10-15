const express = require("express");
const router = express.Router();

const { dispatcher } = require("../../../middleware");
const { createApi, basicInformation, getData, postApplication, postApplicationinfraadmin, postApplicationinfraother } = require("../../../controllers/v1");

const { PERMS, RESOURCES } = require("../../../utils/constant");

const auth = require("../../../middleware/auth");

router.post("/update-applicationinfraacademic/:applicationId", auth,(req, res, next) =>
  dispatcher(req, res, next,postApplication,RESOURCES.DEOPANEL,PERMS.EDIT)
);

router.post("/update-applicationinfraadministrative/:applicationId", auth,(req, res, next) =>
    dispatcher(req, res, next,postApplicationinfraadmin,RESOURCES.DEOPANEL,PERMS.EDIT)
);

router.post("/update-applicationinfraother/:applicationId", auth,(req, res, next) =>
    dispatcher(req, res, next,postApplicationinfraother,RESOURCES.DEOPANEL,PERMS.EDIT)
);


module.exports = router;