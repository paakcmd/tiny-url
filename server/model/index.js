const { test } = require('../config');


const Url = test ? require('./url/test') : require('./url');


module.exports = { Url };
