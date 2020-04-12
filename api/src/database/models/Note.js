const Model = require("./Model");
const User = require("./User");
const Folder = require("./Folder");

class Note extends Model {
    constructor() {
        super();

        this.columns = {
            id: { guarded: true },
            content: {},
            user_id: {},
            folder_id: {},
        };

        this.relations = {
            user: {
                model: User,
                joinColumn: "user_id",
            },
            folder: {
                model: Folder,
                joinColumn: "folder_id",
            },
        };
    }

    find(id, columnsToFetch, withRelations) {
        return this.findBy("id", id, columnsToFetch, withRelations);
    }

    findBy(filterColumn, value, columnsToFetch, withRelations, where = {}) {
        columnsToFetch = columnsToFetch || [
            ...this.getListableColumns().map(c => `${this.getTableName()}.${c}`),
            ...this.getSelectableRelationColumns(this.relations.user),
            ...this.getSelectableRelationColumns(this.relations.folder),
        ];

        withRelations = withRelations || [this.relations.user, this.relations.folder];

        return super.findBy(
            filterColumn,
            value,
            columnsToFetch,
            withRelations,
            where,
        );
    }
}

module.exports = new Note();
