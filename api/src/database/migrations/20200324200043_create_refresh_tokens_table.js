exports.up = function (knex) {
    return knex.schema
        .createTable('refresh_tokens', function (table) {
            table.increments('id');
            table.integer('user_id').notNullable().unsigned();
            table.string('value', 255).notNullable();
            table.string('device_identifier', 255).notNullable();

            table.unique(['user_id', 'device_identifier']);

            table.foreign('user_id').references('id').inTable('users');
        });
};

exports.down = function (knex) {
    return knex.schema.dropTable('refresh_tokens');
};
