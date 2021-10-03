const express = require("express");
const eventController = require("../controllers/event");

const router = express.Router();

router.post("/", eventController);
//we wxports whole router object, not methods od object(that why we dont have {})
module.exports = router;
