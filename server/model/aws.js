const AWS = require('aws-sdk');

const config = require('../config');
// AWS DynamoDB Configuration
const REGION = config.aws.region;

AWS.config.update({
  region: REGION
});

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  convertEmptyValues: true
});


module.exports = { dynamoDB };
