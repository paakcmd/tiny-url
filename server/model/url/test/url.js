//DB
const moment = require('moment');

module.exports = {
  createNewRecord: (urlId, url, expire) => {
    if (url === 'http://dberror.com') {
      throw { error: { msg_key: 'database_error', details: 'test database error' }}
    }

    return {}
  },
  getUrlById: (urlId) => {
    let mockPayload;

    switch (urlId) {
      
      case 'SHBeznzF':
        const expire = parseInt(moment().unix()) + parseInt(1000)
        mockPayload = { 
          createdAt: 1573363496,
          urlId: 'SHBeznzF',
          url: 'http://paakcmd.space',
          expire: expire
        }
        break;

      case 'neverexp':
          mockPayload = { 
            createdAt: 1573363496,
            urlId: 'SHBeznzF',
            url: 'http://paakcmd.space',
            expire: -1
          }
          break;

      case 'expire01':
        mockPayload = { 
          createdAt: 1573363496,
          urlId: 'SHBeznzF',
          url: 'http://paakcmd.space',
          expire: 1
        }
        break;
      
        case 'dberror1':
          throw { 
            error: { msg_key: 'database_error', details: 'test database error', statusCode: 500 }
          }

      case 'notfound':
        throw { 
          error: { msg_key: 'not_found', details: 'no records for this short url', statusCode: 404 }
        }

      default:
        mockPayload = { 
          createdAt: 1573363496,
          urlId: 'SHBeznzF',
          url: 'http://paakcmd.space',
          expire: -1 
        }
        break;
    }

    return mockPayload

  }

}
