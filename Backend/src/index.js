const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { UrlRouter } = require("./Routers/UrlRouters");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const mongodb_url = process.env.MONGODB_URL;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", UrlRouter);

app.get("/", (req, res) => {
    res.send("Welcome to URL shortners!");
});

mongoose
    .connect(mongodb_url)
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server listening on port " + PORT);
        });
    })
    .catch(() => {
        console.log("Error occurred while connecting to MongoDB");
    });
