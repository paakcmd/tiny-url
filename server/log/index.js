const rootDir = process.cwd();
const winston = require('winston');

const Logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: `${rootDir}/logs/combined.log` })
    ]
  });

module.exports = { Logger }
