const User = require("../models/user-model");


const home = async (req, res) => {
    try {
        res.status(200).send("lmao-home-page")
    } catch (err) {
        console.log(err)
    }
};


const register = async (req, res) => {
    try {
        const {username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email });

        if(userExist) {
            return res.status(400).json({msg: "Email aleady exists."});
        }
        
        const userCreated = await User.create({username, email, phone, password});

        console.log(req.body, "body");
         res.status(200).json({ data: userCreated });

    } catch (err) {
        // console.log(err)
        res.status(500).json({msg: "Internal server error"})
    }
};

module.exports = {home, register}