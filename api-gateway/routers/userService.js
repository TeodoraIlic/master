var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')
const isAuthorized = require('../controller/requestAuthenticator')

const BASE_URL = 'http://localhost:8088'
const api = apiAdapter(BASE_URL)

router.get('/users', isAuthorized, (req, res) => {
  api.get(req.path).then(resp => {
    res.send(resp.data)
  })
})

router.get('/users/:email', isAuthorized, (req, res) => {
  api.get(req.path).then(resp => {
    res.send(resp.data)
  })
})

module.exports = router