const Contact = require("../models/contact-model");
// const bcrypt = require("bcrypt");

// Contact page Logic

const contactForm = async (req, res) => {
  try {
    const response = req.body;
    await Contact.create(response);
    return res.status(201).json({message: "message send successfully"});

  } catch (err) {
    res.status(500).json({message: "message not delivered"});

    console.error(err);
  }
};

module.exports = { contactForm };