var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use('/', bodyParser.urlencoded({extended: true}));
app.use('/', bodyParser.json());

app.get('/', function (req, res) {
    console.log(req.body);
    res.send('It was a GET request');
});

app.post('/', function (req, res) {
    console.log(req.body);
    res.send('It was a POST request');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});