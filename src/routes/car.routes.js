const express = require("express");
const router = express.Router();
const carController = require("../controllers/car.controller");
const auth = require("../middleware/auth");
const carOwner = require("../middleware/carOwner");

router.get("/", auth, carController.index);

router.post("/", auth, carController.store);

router.put("/:carUuid", [auth, carOwner], carController.update);

router.delete("/:carUuid", [auth, carOwner], carController.destroy);

module.exports = router;
