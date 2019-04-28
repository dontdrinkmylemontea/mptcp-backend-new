const express = require("express");
const bodyParser = require("body-parser");
const ping = require("./ping");
const app = express();
const port = 8080;

app.use((req, res, next) => {
  res.set("Content-Type", "text/json");
  res.setDefaultEncoding("utf-8");
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(bodyParser.json());

const pingStatus = {
  hasError: false,
  state: []
};

//需要轮询
app.get("/ping", (req, res) => {
  if (req.query.sub === 0) {
    ping(pingStatus);
  } else if (pingStatus.hasError) {
    res
      .status(500)
      .send("error")
      .send(pingStatus.state);
  } else {
    res.send(pingStatus.state);
  }
});

// 不需要轮询
app.post("/config", (req, res) => {
  const {
    scheduler,
    congestion,
    objsize,
    bdcar,
    limitvar,
    repnum,
    rttvar1
  } = res.body;
});

// 需要轮询
app.post("/runtest", (req, res) => {
  const resBody = res.body;
});

app.listen(port, () => console.log(`client server running on port ${port}`));
