const Model = require("./Model");

class Folder extends Model {
    init() {
        this.User = require("./User");
        this.Note = require('./Note');

        this.columns = {
            id: { guarded: true },
            title: {},
            user_id: { guarded: ['update'] },
        };

        this.relations = {
            user: {
                model: this.User,
                joinColumn: "user_id",
                columnNamePrefix: "user",
            },
        };


    }

    find(id, columnsToFetch, withRelations) {
        return this.findBy("id", id, columnsToFetch, withRelations);
    }

    async findBy(filterColumn, value, columnsToFetch, withRelations, where = {}) {
        columnsToFetch = columnsToFetch || [
            ...this.getListableColumns().map(c => `${this.getTableName()}.${c}`),
            ...this.getSelectableRelationColumns(this.relations.user, ["name", "id"]),
        ];

        withRelations = withRelations || [this.relations.user];

        const folder = await super.findBy(
            filterColumn,
            value,
            columnsToFetch,
            withRelations,
            where,
        );

        return { ...folder, notes: await this.Note.byFolder(folder.id) };
    }
}

module.exports = new Folder();
