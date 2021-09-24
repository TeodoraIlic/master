var express = require('express');
var router = express.Router()
var postsRouter = require('./postsService')
var userRouter = require('./userService')
var authRouter = require('../controller/AuthController')

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(postsRouter)
router.use(userRouter)
router.use(authRouter)

module.exports = router