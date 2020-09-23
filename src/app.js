const express = require("express");
const bodyParser = require("body-parser");
const moongose = require("mongoose");

const app = express();

// DB connection
moongose.connect(
    "mongodb+srv://FelipeAlves:!Kawasaki01@cluster0.jgytt.gcp.mongodb.net/Cluster0?retryWrites=true&w=majority"
);

//load models
const Product = require("./models/product");
const Custumer = require("./models/customer");
const Order = require("./models/order");

//load routes
const index = require("./routes/index");
const product = require("./routes/product");
const customer = require("./routes/customer");
const order = require("./routes/order");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", index);
app.use("/products", product);
app.use("/customers", customer);
app.use("/orders", order);

module.exports = app;
