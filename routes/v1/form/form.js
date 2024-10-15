const express = require("express");
const router = express.Router();

const { dispatcher } = require("../../../middleware");
const { main, school, postacademic, postadministrative, postother, data} = require("../../../controllers/v1");

const { PERMS, RESOURCES } = require("../../../utils/constant");
const auth = require("../../../middleware/auth");

router.get("/",auth, (req, res, next) =>
  dispatcher(req, res, next,school,RESOURCES.Form,PERMS.EDIT)
);
router.post("/academic",auth, (req, res, next) =>
    dispatcher(req, res, next,postacademic,RESOURCES.Form,PERMS.EDIT)
);
router.post("/administrative",auth, (req, res, next) =>
    dispatcher(req, res, next,postadministrative,RESOURCES.Form,PERMS.EDIT)
);

router.post("/other",auth, (req, res, next) =>
    dispatcher(req, res, next,postother,RESOURCES.Form,PERMS.EDIT)
);
router.get("/data",auth, (req, res, next) =>
    dispatcher(req, res, next,data,RESOURCES.Form,PERMS.EDIT)
);

  
module.exports = router;