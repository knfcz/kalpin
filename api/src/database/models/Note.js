const Model = require("./Model");

class Note extends Model {
    init() {
        this.User = require("./User");
        this.Folder = require("./Folder");

        this.columns = {
            id: { guarded: true },
            content: {},
            user_id: {},
            folder_id: {},
        };

        this.relations = {
            user: {
                model: this.User,
                joinColumn: "user_id",
            },
            folder: {
                model: this.Folder,
                joinColumn: "folder_id",
            },
        };
    }

    byFolder(folderId) {
        return this.db()
            .where("folder_id", folderId);
    }

    find(id ) {
        return this.findBy("id", id);
    }

    findBy(filterColumn, value, where = {}) {
        const columnsToFetch = [
            ...this.getListableColumns().map(c => `${this.getTableName()}.${c}`),
            ...this.getSelectableRelationColumns(this.relations.user),
            ...this.getSelectableRelationColumns(this.relations.folder),
        ];

        const withRelations =  [
            this.relations.user,
            this.relations.folder,
        ];

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
