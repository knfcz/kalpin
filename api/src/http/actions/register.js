const {
    makeActionRegisterer,
} = require("node-api-modules/controllers/functions/express");
const isPlainObject = require('js-utils/isPlainObject');

module.exports = makeActionRegisterer({
    errorHandler: (response, error) => {
        console.log(error);

        return response({}, error);
    },
    responseFormatter: (payload = {}, error = false) => {
        if(error) {
            payload.status = 'nok';
            payload.errorCode = error.code || 'serverError';
            payload.message = error.message;
        } else {
            payload.status = 'ok';
        }

        return payload;
    },
});
