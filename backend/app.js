const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = 8000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
const routes = require("./routes/index");
app.use("/", routes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
