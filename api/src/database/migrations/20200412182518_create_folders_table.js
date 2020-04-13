exports.up = knex =>
    knex.schema.createTable("folders", function (table) {
        table.increments("id");
        table.text("title").notNullable();
        table
            .integer("user_id")
            .notNullable()
            .unsigned();

        table
            .foreign("user_id")
            .references("id")
            .inTable("users")
            .onUpdate("cascade")
            .onDelete("cascade");
    });

exports.down = async knex => {
    await knex.raw("SET foreign_key_checks = 0;");
    await knex.schema.dropTable("folders");
    await knex.raw("SET foreign_key_checks = 1;");
};
