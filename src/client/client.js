const express = require("express");
const bodyParser = require("body-parser");
const { ping, config, getObj } = require("../util/util");
const { runtest } = require("./runtest");
const app = express();
const port = 8080;

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

/* 测试通过 */
app.get("/ping", (req, res) => {
  if (req.query.sub == 0) {
    res.status(200).send(pingStatus);
    pingStatus.hasError = false;
    pingStatus.state = [];
    ping(pingStatus);
  } else {
    res.status(200).send(getObj(pingStatus));
  }
});

/* 测试通过 */
app.get("/config", (req, res) => {
  const { scheduler, congestion } = req.query;
  res.send(getObj(config(scheduler, congestion)));
});

const testStatus = {
  hasError: false,
  finished: false,
  state: []
};

/* 测试通过 */
app.post("/runtest", (req, res) => {
  if (req.query.sub == 0) {
    runtest(testStatus, req.body);
  }
  res.status(200).send(getObj(testStatus));
});

app.listen(port, () => console.log(`client server running on port ${port}`));
