const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const morgan = require("morgan");

const { ExpressPeerServer } = require("peer");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

const customGenerationFunction = () =>
  (Math.random().toString(36) + "0000000000000000000000000").substring(2, 16);

const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: "/",
  generateClientId: customGenerationFunction,
});

app.use("/mypeer", peerServer);

io.on("connection", function () {
  console.log("Socket connected");
});

const port = process.env.PORT || 5001;

server.listen(port, () => console.log(`Server running on port ${port}`));
