const express = require("express");
const bodyParser = require("body-parser");
const { ping, config, getObj } = require("../util/util");
const { init } = require("./init");
const { result } = require("./result");
const app = express();
const port = 8081;

app.use((req, res, next) => {
  res.set("Content-Type", "text/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin"
  );
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
  res.status(200).send(getObj(pingStatus));
  if (req.query.sub == 0) {
    pingStatus.hasError = false;
    pingStatus.state = [];
    ping(pingStatus);
  }
});

// 不需要轮询
app.get("/config", (req, res) => {
  const { scheduler, congestion } = req.query;
  res.send(getObj(config(scheduler, congestion)));
});

app.get("/init", (req, res) => {
  res.send(getObj(init()));
});

app.get("/result", result);

app.listen(port, () => console.log(`client server running on port ${port}`));
