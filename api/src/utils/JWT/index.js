const jsonWebToken = require('jsonwebtoken');
const ExpiredTokenError = require('../../http/errors/ExpiredTokenError');

const APP_KEY = process.env.APP_KEY;

const abortIfNotPrivKey = () => {
    if(!APP_KEY) {
        throw new Error('You must specify a PRIVATE_KEY in your .env file');
    }
};

const JWT = {
    make(payload, expiresIn = 3600) {
        abortIfNotPrivKey();

        return new Promise((resolve, reject) => {
            jsonWebToken.sign(
                payload,
                APP_KEY,
                { algorithm: 'HS256', expiresIn },
                (err, token) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(token);
                },
            );
        });
    },

    verify(token) {
        abortIfNotPrivKey();

        return new Promise((resolve, reject) => {
            jsonWebToken.verify(token, APP_KEY, (err, decoded) => {
                if (err) {
                    return reject(err);
                }

                resolve(decoded);
            });
        }).catch(e => {
            if (e instanceof jsonWebToken.JsonWebTokenError) {
                throw new ExpiredTokenError();
            }

            throw e;
        });
    },
};

module.exports = JWT;
