const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'master-users'
});

db.connect( (error) => {
    if(error) {
        console.log(error);
    } else {
        console.log("MySQL Connected");
    }
});

exports.createUser = (req, res, next) =>{
    console.log(req.body);
    //treba odraditi situaciju kada vec postoji email u bazi i vratiti odgovarajucuporuku
    bcrypt.hash(req.body.password,10).then(hash => {
        const name = req.body.name ? req.body.name : "Anonimous"
        const email = req.body.email
        const password = hash
        
        const sql_query = "INSERT INTO users SET ?";

        db.query(sql_query, {name, email, password}, async (error, result) => {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
                res.status(200).json({
                    message: "User is registred"
                });
            }
        })
    });
}

exports.signInUser = (req, res, next) => {
    console.log(req.body);
    let fetchedUser;
    const email = req.body.email;

    const sql_query = "SELECT name, email, password FROM users WHERE email = ?"

    db.query(sql_query, [email], async (error, result) => {
        const fetchedUser = result[0];

        if(error) {
            return res.status(401).json({
                message: "Invalid authentication credentials!"
            })
        } 

        if(!fetchedUser?.email){
            return res.status(401).json({
                message: "Auth failed!"
            })
        }
        const hashedPassword = await bcrypt.compare(req.body.password, fetchedUser.password);

        if(!hashedPassword){
            return res.status(401).json({
                message: "Auth failed!"
            })
        }

        const token = jwt.sign({email: fetchedUser.email}, 
                                "secret_this_should_be_longer",
                                 {expiresIn: "1h"});
        res.status(200).json({
            token: token,
            expiresIn: 3600
        });
    })

    User.findOne({ email: req.body.email }).then(user => {
        if(!user){
            return res.status(401).json({
                message: "Auth failed!"
            })
           
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(result => {
        if(!result){
            return res.status(401).json({
                message: "Auth failed!"
            })
        }
        // process.env.JWT_KEY
        const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, 
                                "secret_this_should_be_longer",
                                 {expiresIn: "1h"});
        res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId: fetchedUser._id
        });

    }).catch(err => {
        return res.status(401).json({
            message: "Invalid authentication credentials!"
        })
    }
    )

}