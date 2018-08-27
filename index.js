var express = require('express')
var bodyParser = require('body-parser')
var HttpStatus = require('http-status-codes')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)

var app = express()

app.use(bodyParser.json())

db.defaults({ classics: [] })
  .write();

db._.mixin({
    random: function(array) {
        return array[Math.floor(Math.random() * array.length)]
    }
})

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

app.get('/', function(req, res, next) {
    const randomClassic = db.get('classics').random().value();
    res.json(randomClassic);
});
app.post('/', function(req, res, next) {
    const newItem = Object.assign({id: getRandomInt(99999)}, req.body);
    db.get('classics')
        .push(newItem)
        .write();
    res.sendStatus(HttpStatus.CREATED);
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