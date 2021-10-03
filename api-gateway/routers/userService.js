var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')
const isAuthorized = require('../controller/requestAuthenticator')

const BASE_URL = 'http://localhost:3002'
const api = apiAdapter(BASE_URL)

router.post('/users/login', (req, res) => {
  console.log('login', req.body);
  api.post(req.path, req.body).then(resp => {
    res.send(resp.data)
  })
})

router.post('/users/register', (req, res) => {
  console.log('register', req.body);
  api.post(req.path, req.body).then(resp => {
    res.send(resp.data)
    console.log(res.data)
  })
})

router.get('/users/:email', isAuthorized, (req, res) => {
  api.get(req.path).then(resp => {
    res.send(resp.data)
  })
})

module.exports = router