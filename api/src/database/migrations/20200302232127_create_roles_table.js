exports.up = knex => knex.schema
    .createTable('roles', function (table) {
        table.increments('id');
        table.string('name', 255).notNullable();
    });

exports.down = async knex => {
    await knex.raw('SET foreign_key_checks = 0;');
    await knex.schema.dropTable('roles');
    await knex.raw('SET foreign_key_checks = 1;');
};
