const bind = require('./register');

const auth = require('./auth');
const example = require('./example');

const registerActions = app => {
    const register = bind(app);

    auth(register);
    example(register);
};

module.exports = registerActions;
