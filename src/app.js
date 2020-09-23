const express = require("express");
const bodyParser = require("body-parser");
const moongose = require("mongoose");

const app = express();

moongose.connect(
    "mongodb+srv://FelipeAlves:!Kawasaki01@cluster0.jgytt.gcp.mongodb.net/Cluster0?retryWrites=true&w=majority"
);

const index = require("./routes/index");
const product = require("./routes/product");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", index);
app.use("/products", product);

module.exports = app;
