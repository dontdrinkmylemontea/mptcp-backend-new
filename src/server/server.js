const express = require("express");
const ping = require("./ping");
const app = express();
const port = 8081;

app.use((req, res, next) => {
  res.set("Content-Type", "text/json");
  res.setDefaultEncoding("utf-8");
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/ping", (req, res) => {});

app.post("/config", (req, res) => {});

app.post("/init", (req, res) => {});

app.get("/result", (req, res) => {});

app.listen(port, () => console.log(`client server running on port ${port}`));
