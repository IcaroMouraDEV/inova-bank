const express = require('express');
const root = require('./routes')

const app = express();

app.use(express.json())
app.use('', root)

module.exports = app;