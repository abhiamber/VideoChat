const express = require("express");

const http = require("http");
const app = express();
const httpServer = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const cors = require("cors");
const { emit } = require("process");
app.use(cors());
app.use(express.json());
app.get("/", async (req, res) => {
  res.send("Hurray.................");
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callended");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    socket.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });
  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

httpServer.listen(8080, () => {
  console.log("server is working...................");
});
