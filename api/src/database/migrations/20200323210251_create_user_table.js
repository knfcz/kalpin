exports.up = function (knex) {
    return knex.schema
        .createTable('users', table => {
            table.increments('id');
            table.integer('role_id').notNullable().unsigned();
            table.string('name', 255).notNullable();
            table.string('email', 255).notNullable();
            table.string('password', 255).notNullable();

            table.foreign('role_id').references('id').inTable('roles');
        });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
