const express = require("express");
const router = express.Router({mergeParams: true});
const repairController = require("../controllers/repair.controller");
const auth = require("../middleware/auth");
const carOwner = require("../middleware/carOwner");
const repairOwner = require("../middleware/repairOwner");

router.get("/", [auth, carOwner], repairController.index);

router.post("/", [auth, carOwner], repairController.store);

router.put("/:repairUuid", [auth, carOwner, repairOwner], repairController.update);

router.delete("/:repairUuid", [auth, carOwner, repairOwner], repairController.destroy);

module.exports = router;
