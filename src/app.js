const express = require("express");
const bodyParser = require("body-parser");
const moongose = require("mongoose");
const config = require("./config");

const app = express();

// DB connection
moongose.connect(config.connectionString);

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
