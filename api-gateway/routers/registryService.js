const axios = require('axios');
const apiAdapter = require("./apiAdapter");
var express = require('express');
var router = express.Router();

const POSTS_URL = "http://localhost:3001";
const service_descovery_url = POSTS_URL + '/posts/serviceDescovery'
const api = apiAdapter(POSTS_URL);

router.use((req, res, next) => {
    console.log("Registru service: ", req.path)
    next()
})

router.use((req, res, next) => {
    
    //prowying request and path rewrite
    const path = req.path.split('/')[1];
    const uri = req.path.replace(path, '').replace('/','');

    api.get(service_descovery_url + '/' + path).then((resp) => {
        const service_url = 'https://' + resp.data.servicePath ;
        const service_api = apiAdapter(service_url);
        console.log(service_url + uri)
        service_api.get(uri).then((resp) => {
            res.send(resp.data);
        });
    });
});

module.exports = router;