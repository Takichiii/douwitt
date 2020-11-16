const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const routes = require('./routes/routes.js')(app, fs);

//app.listen(process.env.PORT || 8081);
const server = app.listen(8081, () => {
    console.log('listening on port %s...', server.address().port);
});