const auth = require("../middlewares/auth");
const Folder = require('~models/Folder');
const Note = require('~models/Note');

const example = register => {
    register("GET", "/", index);
    register("GET", "/protected", protected, [auth]);
};

const index = req => {
    return { value: 420 };
};

const protected = req => {
    return { value: 69 };
};

module.exports = example;
