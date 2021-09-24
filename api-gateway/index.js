var express = require('express');
var app = express();
var router = require('./routers/router')
var bodyParser = require('body-parser');
var db = require('./db')


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//any request that is targeting /images folder, will be allowed to continue and
//fetch their fiels from there
// app.use("/images", express.static(path.join("./images")));
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.get('/', (req, res) => {
    res.send("Simple API Gateway")
})

app.use(router)

console.log("Simple API Gateway run on localhost:3000")

app.listen(3000);
