const generate = require('nanoid/generate')
const moment = require('moment');
const { Logger } = require('../log/index');
module.exports = {
    generateUniqueId: (len) => {
        return generate('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', len);
    },
    validateRecord: (records) => {

        if (records.expire === -1) {
            return [records.url, ];
        }
        
        if (parseInt(records.expire) < parseInt(moment().unix())) {
            Logger.info(`ID: ${records.url}: IS EXPIRED (${records.expire})`)
            return [, { error: { msg_key: 'expired', details: 'The shorten url is expired', statusCode: 400 } }]
        }
        
        return [records.url, ];
    }
}