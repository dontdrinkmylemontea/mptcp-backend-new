const express = require("express");
const bodyParser = require("body-parser");
const { ping } = require("./ping");
const { config } = require("./config");
const { runtest } = require("./runtest");
const app = express();
const port = 8080;

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

app.get("/ping", (req, res) => {
  if (req.query.sub == 0) {
    res.status(200).send(pingStatus);
    pingStatus.hasError = false;
    pingStatus.state = [];
    ping(pingStatus);
  } else {
    res.status(200).send(pingStatus);
  }
});

app.get("/config", (req, res) => {
  const { scheduler, congestion } = req.query;
  const result = config(scheduler, congestion);
  res.send(result);
});

const testStatus = {
  hasError: false,
  finished: false,
  state: []
};

app.post("/runtest", (req, res) => {
  if (req.query.sub == 0) {
    runtest(testStatus, req.body);
    res.status(200).send(testStatus);
  } else {
    res.status(200).send(testStatus);
  }
});

app.listen(port, () => console.log(`client server running on port ${port}`));
