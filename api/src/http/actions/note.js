const auth = require("../middlewares/auth");
const { registerResourceRoutes } = require('node-api-modules/controllers/functions/express');
const Note = require('~models/Note');

const note = register => registerResourceRoutes(register, 'note', Note, [auth]);

module.exports = note;
