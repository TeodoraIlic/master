const path = require('path');
const express = require('express');
const usersRoutes = require('./routes/user');

const app = express();
app.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//any request that is targeting /images folder, will be allowed to continue and
//fetch their fiels from there
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.use('/users', usersRoutes)
module.exports = app;