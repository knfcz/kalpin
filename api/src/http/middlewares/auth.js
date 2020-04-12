const AccessForbiddenError = require('node-api-modules/errors/AccessForbiddenError');
const ExpiredTokenError = require('../errors/ExpiredTokenError');
const JWT = require('../../utils/JWT');

const authMiddleware = async ([req, ...rest]) => {
    const authHeader = req.header('Authorization');

    if(!authHeader) {
        throw new AccessForbiddenError();
    }

    const accessToken = authHeader.replace('Bearer ', '');

    try {
        await JWT.verify(accessToken);

        return ([req, ...rest]);
    } catch (e) {
        throw new ExpiredTokenError();
    }
};

module.exports = authMiddleware;
