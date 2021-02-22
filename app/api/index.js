const express = require("express");
const app = express();
const server = require("http").Server(app);
const cors = require("cors");
const commandRoutes = require("./v1/commands");
const authRoutes = require("./v1/auth");
var bodyParser = require('body-parser');

const PORT = process.env.PORT;
const HOST = "0.0.0.0";

const socketioJwt = require("socketio-jwt");

const io = require("socket.io")(server, {
  cors: {
    origin: "https://5000-harlequin-anaconda-3yee5arx.ws-us03.gitpod.io/",
    methods: ["GET", "POST"]
  }
});
// io.use(
//   socketioJwt.authorize({
//     secret: process.env.JWT_SECRET,
//     handshake: true,
//   })
// );

app.set('socketio', io);

app.use(cors());
app.use(express.static(__dirname + '/../dashboard/dist/dashboard'));
app.use(bodyParser.json());

// app.get("/", async (req, res) => {
//   // TODO: send angular app in a nicer way tan this
// });

app.use("/v1/run", commandRoutes);
app.use("/v1/auth", authRoutes);

server.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
