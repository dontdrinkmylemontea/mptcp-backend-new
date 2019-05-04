const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const cors = require("cors");
const bodyParser = require("body-parser");
const { ping, config, getObj, init } = require("../util/util");
const { result } = require("./result");

const port = 8081;
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

app.get("/init", (req, res) => {
  res.json(getObj(init()));
});

app.post("/result", (req, res) => {
  result(req.body, res);
});

io.on("connection", function(socket) {
  console.log("a user connected.");
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

console.log(`client server running on port ${port}`);
