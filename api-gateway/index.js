var express = require("express");
var app = express();
var router = require("./routers/router");
var db = require("./db");
const path = require("path");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

//any request that is targeting /files folder, will be allowed to continue and
//fetch their fiels from there
app.use("/files", express.static(path.join("./files")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Simple API Gateway");
});

app.use(router);

console.log("Simple API Gateway run on localhost:3000");

app.listen(3000);
