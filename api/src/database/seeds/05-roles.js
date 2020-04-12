const Role = require('~models/Role');

exports.seed = async knex => {
    await knex.raw("SET foreign_key_checks = 0");
    await knex(Role.table).truncate();
    await knex.raw("SET foreign_key_checks = 1");

    const roles = [
        { name: 'admin' },
        { name: 'user' },
    ];

    await Promise.all(roles.map(r => Role.create(r)));
};
