const Folder = require("~models/Folder");

Folder.init();

exports.seed = async knex => {
    await knex.raw("SET foreign_key_checks = 0");
    await knex(Folder.table).truncate();
    await knex.raw("SET foreign_key_checks = 1");

    const folders = [
        { title: 'Recettes', userId: 1 },
        { title: 'Journal', userId: 1 },
    ];

    await Promise.all(folders.map(async f => Folder.create(f)));
};
