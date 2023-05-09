const soap = require('soap');
const fs = require('fs');
const express = require('express');
const myService = require('./myService');


var xml = fs.readFileSync("./backend/soap/myservice.wsdl",{ encoding: 'utf8'})
const app = express();
//const {bodyParser} = require('body-parser');

//app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}))



app.listen(5000,() => {
    soap.listen(app,'/MyFunction',myService,xml,() => {
        console.log('server initialized... open http://localhost:5000/MyFunction?wsdl');
    })
})