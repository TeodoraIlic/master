const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/post');
const serviceDescoveryRoutes = require('./routes/serviceDescovery');

const app = express();

mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost/mystore", { useNewUrlParser: true })
    .then(()=>{
        console.log("Connected to database");
    })
    .catch(()=>{
        console.log("Connection failed!"); 
    });

app.use(express.urlencoded({ extended: false,
                                limit: '100mb' }));
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

app.use('/posts/', postsRoutes);
app.use('/posts/serviceDescovery', serviceDescoveryRoutes);
module.exports = app;