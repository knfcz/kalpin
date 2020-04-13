exports.up = knex =>
    knex.schema.createTable("notes", function(table) {
        table.increments("id");
        table.text("content");
        table
            .integer("user_id")
            .notNullable()
            .unsigned();

        table
            .integer("folder_id")
            .nullable()
            .unsigned();

        table
            .foreign("user_id")
            .references("id")
            .inTable("users")
            .onUpdate("cascade")
            .onDelete("cascade");

        table
            .foreign("folder_id")
            .references("id")
            .inTable("folders")
            .onUpdate("cascade")
            .onDelete("cascade");
    });

exports.down = async knex => {
    await knex.raw("SET foreign_key_checks = 0;");
    await knex.schema.dropTable("notes");
    await knex.raw("SET foreign_key_checks = 1;");
};
