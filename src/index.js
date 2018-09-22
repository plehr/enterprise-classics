const express = require('express')
const bodyParser = require('body-parser')
const HttpStatus = require('http-status-codes')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const Joi = require('joi');
 
const adapter = new FileSync('./data/enterprise-classics-db.json')
const db = low(adapter)

const app = express()

app.use(bodyParser.json())
app.use('/ui', express.static('ui'))

db._.mixin({
    random: function(array) {
        return array[Math.floor(Math.random() * array.length)]
    }
});

db.defaults({ classics: [], classicAutoInc: 0})
  .write();

const classicCollection = db.get('classics');

const classicShape = Joi.object().keys({
    title: Joi.string().max(140).required(),
    text: Joi.string().max(1000).required()
});

function autoInc() {
    const classicAutoIncFieldname = 'classicAutoInc';
    const x = db.update(classicAutoIncFieldname, n => n + 1).write();
    return x[classicAutoIncFieldname];
}

app.get('/', function(req, res, next) {
    const randomClassic = classicCollection.random().value();
    if(randomClassic)
        res.json(randomClassic);
    else
        res.sendStatus(HttpStatus.NO_CONTENT);
});
app.get('/:id', function(req, res, next) {
    const parsedIndex = parseInt(req.params.id);
    if(!Number.isInteger(parsedIndex)) {
        res.sendStatus(HttpStatus.BAD_REQUEST);
        return;
    }
    const classic = classicCollection.find({ id: parsedIndex }).value();
    if(classic)
        res.json(classic);
    else
        res.sendStatus(HttpStatus.NOT_FOUND);
});
app.post('/', function(req, res, next) {
    const validateResult = Joi.validate(req.body, classicShape);
    if(validateResult.error) {
        res.status(HttpStatus.BAD_REQUEST)
           .send('Classic must have shape of {"title": <string>, "text": <string>}');
        return;
    }
    const newClassic = Object.assign({id: autoInc()}, req.body);
    classicCollection.push(newClassic).write();
    res.sendStatus(HttpStatus.CREATED);
});
app.delete('/:id', function(req, res, next) {
    const parsedIndex = parseInt(req.params.id);
    if(!Number.isInteger(parsedIndex)) {
        res.sendStatus(HttpStatus.BAD_REQUEST);
        return;
    }
    const classic = classicCollection.find({ id: parsedIndex }).value();
    if(classic) {
        classicCollection.remove(classic).write();
        res.sendStatus(HttpStatus.NO_CONTENT);
    }
    else
        res.sendStatus(HttpStatus.NOT_FOUND);
});

app.listen(3000, function () {
    console.log('Serving enterprise-classics API on port 3000!');
});