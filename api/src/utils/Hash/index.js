const bcrypt = require('bcrypt');

const Hash = {
    make: async (str, saltRounds = 5) => (new Promise((res, rej) => {
        bcrypt.hash(str, saltRounds, (err, hash) => {
            if (err) {
                return rej(err);
            }

            return res(hash);
        });
    })),
    compare: async (plain, hash) => (new Promise((res, rej) => {
        bcrypt.compare(plain, hash, (err, result) => {
            if (err) {
                return rej(err);
            }

            return res(result);
        });
    })),
};

module.exports = Hash;
