const Model = require("./Model");
const User = require("./User");

class Folder extends Model {
    constructor() {
        super();

        this.columns = {
            id: { guarded: true },
            title: {},
            user_id: {},
        };

        this.relations = {
            user: {
                model: User,
                joinColumn: "user_id",
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
        ];

        withRelations = withRelations || [this.relations.user];

        return super.findBy(
            filterColumn,
            value,
            columnsToFetch,
            withRelations,
            where,
        );
    }
}

module.exports = new Folder();
