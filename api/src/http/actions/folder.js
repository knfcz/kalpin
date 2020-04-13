const auth = require("../middlewares/auth");
const { registerResourceRoutes } = require('node-api-modules/controllers/functions/express');
const Folder = require('~models/Folder');

const folder = register => registerResourceRoutes(register, 'folder', Folder, [auth]);

module.exports = folder;
