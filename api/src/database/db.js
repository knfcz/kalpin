const knexConfig = require('../../knexfile');
const { attachOnDuplicateUpdate } = require('knex-on-duplicate-update');

const knex = require('knex')(knexConfig);

attachOnDuplicateUpdate();

module.exports = knex;
