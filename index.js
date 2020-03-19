const express = require("express");
const app = express();
const serveIndex = require("serve-index");
const cache = require("memory-cache");

app.use("/", serveIndex("files", { icons: true, view: "details" })); // shows you the file list
app.use("/", express.static("files")); // serve the actual files

app.get("/cache", (req, res) => {
  if (cache.get("hello")) {
    res.send(cache.get("hello"));
    return;
  }
  cache.put("hello", "cache", 3000, () => {
    console.log("hello is deleted");
  });
  res.send("not cache");
});

app.get("/login", (req, res) => {
  let { username, password } = req.body;
  res.send({ ip: req.ip });
});

app.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
