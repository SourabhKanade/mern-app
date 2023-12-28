const  mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },  
  phone: {
    type: String,
    required: true,
  },  
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },

});

  // function for hashing registered password before sending to DB which is invoked in auth-controller

userSchema.pre("save", async function (next) {
  const user = this;
  if(!user.isModified("password")) {
    next();
  }

  try{
    const saltRounds = 10;
    const hash_password = await bcrypt.hash(user.password, saltRounds);
    user.password = hash_password;
  } catch (error){
    next(error);
  }
});

  // method for generating token which is invoked in auth-controller

userSchema.methods.generateToken = async function () {
  try{
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error){
    console.error(error);
  }
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
