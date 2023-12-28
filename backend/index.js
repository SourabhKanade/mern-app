require("dotenv").config();
const express = require("express");
const app = express();
const authRoute = require("./routes/auth");
const contactRoute = require("./routes/contact");
const connectDb = require("./utils/db");

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);


const PORT = 5000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`)
    });
});