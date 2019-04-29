const express = require("express");
const bodyParser = require("body-parser");
const { ping, config } = require("../util/util");
const { init } = require("./init");
const { result } = require("./result");
const app = express();
const port = 8081;

app.use((req, res, next) => {
  res.set("Content-Type", "text/json");
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  console.log(`request for ${req.path} received`);
  next();
});

app.use(bodyParser.json());

const pingStatus = {
  hasError: false,
  finished: false,
  state: []
};

//需要轮询
app.get("/ping", (req, res) => {
  if (req.query.sub == 0) {
    res.status(200).send(getObj(0, pingStatus));
    pingStatus.hasError = false;
    pingStatus.state = [];
    ping(pingStatus);
  } else {
    res.status(200).send(getObj(0, pingStatus));
  }
});

// 不需要轮询
app.get("/config", (req, res) => {
  const { scheduler, congestion } = req.query;
  const result = config(scheduler, congestion);
  res.send(getObj(0, result));
});

app.get("/init", (req, res) => {
  res.send(getObj(0, init()));
});

app.get("/result", result);

app.listen(port, () => console.log(`client server running on port ${port}`));
