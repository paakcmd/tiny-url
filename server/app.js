var express = require('express');
var path = require('path');

const urlRouter = require('./routes/url');

var app = express();

var cors = require('cors');

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/url', urlRouter);

app.use(express.static(path.join(__dirname, '../dist/zd-tiny-url')));
app.get('*', (req, res) => {
    let indexPath = path.join(__dirname, '../dist/zd-tiny-url/index.html');
    res.sendFile(indexPath);
});

module.exports = app;
