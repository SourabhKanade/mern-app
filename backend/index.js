require("dotenv").config();
const express = require("express");
const app = express();
const auth = require("./routes/auth");
const connectDb = require("./utils/db");

app.use(express.json());
app.use("/api/auth", auth);

const PORT = 5000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`)
    });
});