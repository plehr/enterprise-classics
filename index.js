var express = require('express')
var bodyParser = require('body-parser')
var HttpStatus = require('http-status-codes')

var app = express()

app.use(bodyParser.json())

var mockedClassics = [
    {
        "id": 981782,
        "title": "Mocked Title #981782",
        "text": "Mocked Text #981782"
    },
    {
        "id": 3312,
        "title": "Mocked Title #3312",
        "text": "Mocked Text #3312"
    },
    {
        "id": 1703,
        "title": "Mocked Title #1703",
        "text": "Mocked Text #1703"
    }
]

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

app.get('/', function(req, res, next) {
    const data = mockedClassics[Math.floor(Math.random() * mockedClassics.length)];
    res.json(data);
});
app.post('/', function(req, res, next) {
    const newItem = Object.assign({id: getRandomInt(99999)}, req.body);
    if(mockedClassics.push(newItem) > 0)
        res.sendStatus(HttpStatus.CREATED);
    else
        res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
});
app.put('/:id', function(req, res, next) {
    res.send('Will PUT ' + req.params.id);
});
app.delete('/:id', function(req, res, next) {
    res.send('Will DELETE ' + req.params.id);
});

app.listen(3000, function () {
    console.log('Serving enterprise-classics API on port 3000!');
});