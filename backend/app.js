const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = 8000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
const routes = require("./routes/index");
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/", routes);
app.get("/", (req, res) => {
  console.log("Received GET request at /");
  res.send("Hello from the server!");
});

// WebSocket
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["https://one-line-story.monkwall.com"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinStory", (storyId) => {
    // Join the room
    socket.join(storyId);
    console.log(`User joined room ${storyId}`);
  });

  // Handle WebSocket events here
  socket.on("addOrModifyData", (data) => {
    console.log(`Button clicked in room ${data.storyId}:`, data);

    // Broadcast the message to all connected clients in the specific room
    io.to(data.storyId).emit("dataChanged", {
      message: data.message,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
