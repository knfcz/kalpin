const { ExtendedError } = require("node-api-modules");

const ERROR_NAME = 'ExpiredToken';
const ERROR_CODE = 'expiredToken';

class ExpiredTokenError extends ExtendedError {
    constructor(payload, message = 'Expired token') {
        super(payload, message, ERROR_NAME, ERROR_CODE);
    }
}

module.exports = ExpiredTokenError;

