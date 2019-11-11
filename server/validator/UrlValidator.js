const Validator = require('fastest-validator');

module.exports = {
  validateGetUrl: (queryParams) => {
    const v = new Validator();
    const schema = {
      urlId: { type: "string", length: 8 },
      $$strict: true
    };

    const queryResult = v.validate(queryParams, schema);

    // Validator function checker
    if (queryResult !== true) {
      const errorMessage = queryResult[0].message;
      if (queryResult[0].type === 'required') {
        return { error: { msg_key: 'missing_param', details: errorMessage } };
      }

      return { error: { msg_key: 'invalid_param', details: errorMessage } };
    }

    return { data: { ...queryParams } };
  },
  validatePostUrl: (payload) => {
    const v = new Validator();
    const schema = {
      url: { type: "string", pattern: /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm },
      expire: { type: "number", min: -1, integer: true, convert: true },
      $$strict: true
    };

    const queryResult = v.validate(payload, schema);

    // Validator function checker
    if (queryResult !== true) {
      const errorMessage = queryResult[0].message;
      if (queryResult[0].type === 'required') {
        return { error: { msg_key: 'missing_param', details: errorMessage } };
      }

      return { error: { msg_key: 'invalid_param', details: errorMessage } };
    }

    return { data: { ...payload } };
  }
};
