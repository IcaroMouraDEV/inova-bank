const express = require('express');
const service = require('../controllers/user');

const route = express.Router();

route.get('/', service.findAll)

route.get('/:id', service.findById)

route.post('/', service.insert)

route.delete('/:id', service.remove)

module.exports = route