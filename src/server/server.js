const express = require("express");
const ping = require("./ping");
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
  state: []
};

//需要轮询
app.get("/ping", (req, res) => {
  if (req.query.sub == 0) {
    res.status(200).send(getObj(0, pingStatus.state));
    pingStatus.hasError = false;
    pingStatus.state = [];
    ping(pingStatus);
  } else if (pingStatus.hasError) {
    res.status(500).send(getObj(-1, pingStatus.state));
  } else {
    res.status(200).send(getObj(0, pingStatus.state));
  }
});

app.post("/config", (req, res) => {});

app.post("/init", (req, res) => {});

app.get("/result", (req, res) => {});

app.listen(port, () => console.log(`client server running on port ${port}`));
