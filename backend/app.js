const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8000;
const DB_USER_NAME = "one-line-story-game";
const DB_USER_PWD = "IrYsa4VXcq4HRUUT";

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
const routes = require("./routes/index");
app.use("/", routes);

mongoose
  .connect(
    "mongodb+srv://one-line-story-game:IrYsa4VXcq4HRUUT@one-line-story-game.diezeg2.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
