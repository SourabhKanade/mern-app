const express = require("express");
const router = express.Router();
const contactControllers = require("../controllers/contact-controller");

router.route("/contact").post(contactControllers.contactForm);

module.exports = router;