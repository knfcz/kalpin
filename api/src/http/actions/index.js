const bind = require('./register');

const auth = require('./auth');
const folder = require('./folder');
const note = require('./note');
const example = require('./example');

const registerActions = app => {
    const register = bind(app);

    auth(register);
    folder(register);
    note(register);
    example(register);
};

module.exports = registerActions;
