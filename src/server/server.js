const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { ping, config, getObj } = require("../util/util");
const { init } = require("./init");
const { result } = require("./result");
const app = express();
const port = 8081;

app.use((req, res, next) => {
  res.set("Content-Type", "text/json");
  console.log(`request for ${req.path} received, querystring:`, req.query);
  next();
});
app.use(cors());

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
