const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
const cors = require("cors");
const { ping, config, getObj } = require("../util/util");
const { runtest } = require("./runtest");

const port = 8080;
let unionId = 0; //自增id

server.listen(port);

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.set("Content-Type", "text/json");
  console.log(`request for ${req.path} received, querystring:`, req.query);
  next();
});

app.get("/ping", (req, res) => {
  res.status(200).json(getObj({ message: "开始ping...", id: ++unionId }));
  ping(io.sockets, unionId);
});

app.get("/config", (req, res) => {
  const { scheduler, congestion } = req.query;
  res.json(getObj(config(scheduler, congestion)));
});

app.post("/runtest", (req, res) => {
  res.status(200).json(getObj({ message: "开始运行测试...", id: ++unionId }));
  runtest(io.sockets, unionId, req.body);
});

io.on("connection", function(socket) {
  console.log("a user connected.");
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

console.log(`client server running on port ${port}`);
