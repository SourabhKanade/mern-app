const mongoose = require("mongoose");

// mongoose.connect(URI);
//
// const URI = "mongodb+srv://reactapp1.9prdi.mongodb.net/";
// const URI = " mongodb+srv://SourabhKanade:8888181326@reactapp1.9prdi.mongodb.net/mern_admin?retryWrites=true&w=majority";
const URI = process.env.MONGODB_URI;

const connectDb = async () => {
try {
    await mongoose.connect(URI);
    console.log("db connection successful")

} catch (err) {
    console.error("db connection failed")
}
};

module.exports = connectDb;