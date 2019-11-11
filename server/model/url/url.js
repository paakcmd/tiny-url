const { dynamoDB } = require('../../model/aws');
const config = require('../../config'); 
const moment = require('moment');
const { Logger } = require('../../log/index');
const TABLE_NAME = config.aws.dynamodb.tableName;

module.exports = {
  createNewRecord: (urlId, url, expire) => {
    return new Promise((resolve, reject) => {
      try {
        const now = moment().unix();
        const expireTime = expire === -1 ? -1 : parseInt(now) + parseInt(expire);
        
        const queryObject = {
          TableName: TABLE_NAME,
          Item: {
            urlId,
            url,
            expire: expireTime,
            createdAt: now
          }
        };
  
        dynamoDB.put(queryObject, (err, result) => {
          if (err) {
            Logger.error(`CREATE NEW RECORD TO DB ERROR: ${JSON.stringify(err)}`)
            return reject({ error: { msg_key: 'database_error', details: JSON.stringify(err) }});
          }
          
          Logger.info(`RESULT FROM the DB at createNewRecord:: ${JSON.stringify(result)}`)
          return resolve(result);
        });
      } catch (err) {
        Logger.error(`CREATE NEW RECORD TO DB ERROR: ${JSON.stringify(err)}`)
        reject({ error: { msg_key: 'database_error', details: JSON.stringify(err) }});
      }
      
    });
  },
  getUrlById: (urlId) => {
    return new Promise((resolve, reject) => {
      try {
        const queryObject = {
          TableName: TABLE_NAME,
          Key: {
            urlId: urlId
          }
        };
  
  
        dynamoDB.get(queryObject, (err, result) => {

          if (err) {
            Logger.error(`GET URL BY ID FROM DB ERROR: ${JSON.stringify(err)}`)
            return reject({ error: { msg_key: 'database_error', details: JSON.stringify(err) }});
          }
  
          if ((!result || Object.keys(result).length === 0)) { // no result
            return reject({ error: { msg_key: 'not_found', details: 'no records for this short url', statusCode: 404 }}); // return empty result
          }

          Logger.info(`RESULT FROM the DB at getUrlById :: ${JSON.stringify(result)}`)
          return resolve(result.Item);
        });
      } catch (err) {
        Logger.error(`GET URL BY ID FROM DB ERROR: ${JSON.stringify(err)}`)
        reject({ error: { msg_key: 'database_error', details: JSON.stringify(err) }});
      }
    });
  }
}
