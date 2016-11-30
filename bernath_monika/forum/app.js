var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var forumApi = require(__dirname + '/forum.api.js');

app.use(express.static('./app'));
app.use(bodyParser.json());

app.get('/', function( req, res ) {
    res.sendFile('app/index.html', { root: __dirname });
});

app.get('/topics', forumApi.getAll);
app.post('/topics', forumApi.create);
app.get('/topics/:id', forumApi.get);
app.put('/topics/:id', forumApi.create);
app.delete('/topics/:id', forumApi.remove);

app.listen(3000, function () {
    console.log('App listens on port 3000');
});