const config = require(`./${process.env.NODE_ENV || 'local'}.json`);

module.exports = config;
