const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const { v1: uuidv1 } = require('uuid'); //uuidv1(); 

const app = express();
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cors());

let rawdata = fs.readFileSync('db.json');
let db = JSON.parse(rawdata);
console.log(db);

app.get('/', function(req, res) {
    res.send(db);
});

app.get('/projects', function(req, res) {
    res.send(db);
});

app.get('/project/:id', function (req, res, next) {
    console.log('Request Type:', req.method);
    res.send(db["projects"][req.params.id]);
    next();
});

app.get('/inbox', function (req, res, next) {
    console.log('Request Type:', req.method);
    res.send(db["projects"][0]); //inbox is always the first project
    next();
});

//add task to project
app.post('/project/:id/task', function (req, res) {
    const task = req.body;
    task["id"] = uuidv1();
    db["projects"][req.params.id]["tasks"].push(task);
    return res.send('Task has been added successfully');
});

app.listen(process.env.PORT || 8081);


//get task
/*
app.get('/project/:id/task', function (req, res, next) {
    console.log('Request Type:', req.method);
    res.send(db["projects"][req.params.id][req.params]);
    next();
});
*/