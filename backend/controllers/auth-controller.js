const User = require("../models/user-model");
const bcrypt = require("bcrypt");

// Home page Logic

const home = async (req, res) => {
  try {
    res.status(200).json("lmao-home-page");
  } catch (err) {
    console.error(err);
  }
};

// User Registration Logic

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "Email already exists." });
    }

    // const saltRounds = 10;
    // const hash_password = await bcrypt.hash(password, saltRounds);

    const userCreated = await User.create({ username, email, phone, password });
    // console.log(req.body, "body");
    res.status(201).json({
      msg: "User registered successfully",
      // data: userCreated,
      token: await userCreated.generateToken(),
      userId: await userCreated._id.toString(),
    });
  } catch (err) {
    // console.log(err)
    res.status(500).json({ msg: "Internal server error" });
  }
};

// User Login Logic

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }
    console.log(userExist, User, "userexists");
    const userLoggedin = await bcrypt.compare(password, userExist.password);

    if (userLoggedin) {
      res.status(200).json({
        msg: "User login successfully",
        // data: userCreated,
        token: await userExist.generateToken(),
        userId: await userExist._id.toString(),
      });
    } else {
      res.status(401).json({ msg: "invalid email or password found." });
    }
  } catch (err) {
    // console.log(err)
    res.status(500).json({ msg: "Internal server error." });
  }
};

module.exports = { home, register, login };
