const Folder = require("~models/Folder");
const Note = require("~models/Note");

exports.seed = async knex => {
    await knex.raw("SET foreign_key_checks = 0");
    await knex(Note.table).truncate();
    await knex.raw("SET foreign_key_checks = 1");

    const folders = await Folder.list();

    const notes = folders.map(folder => ({
        content: "Lorem lipsum ta mère la pute",
        userId: folder.user_id,
        folderId: folder.id,
    }));

    notes.push({
        content: "Lorem lipsum ta mère la pute sans dossier",
        userId: 1,
    });

    await Promise.all(notes.map(async n => Note.create(n)));
};
