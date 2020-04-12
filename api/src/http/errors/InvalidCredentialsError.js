const { ExtendedError } = require("node-api-modules");

const ERROR_NAME = 'InvalidCredentials';
const ERROR_CODE = 'invalidCredentials';

class InvalidCredentialsError extends ExtendedError {
    constructor(payload, message = 'Invalid credentials') {
        super(payload, message, ERROR_NAME, ERROR_CODE);
    }
}

module.exports = InvalidCredentialsError;

