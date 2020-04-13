const Model = require("./Model");
const Hash = require("../../utils/Hash");

class User extends Model {
    constructor() {
        console.log('USER !!!!')
        super();
    }

    init() {
        this.Role = require("./Role");

        this.columns = {
            id: { guarded: true },
            name: {},
            email: {},
            role_id: {},
            password: {
                guarded: ["update"],
                listable: false,
                setter: Hash.make,
            },
        };

        this.relations = {
            role: {
                model: this.Role,
                joinColumn: "role_id",
            },
        };
    }

    find(id, columnsToFetch, withRelations) {
        return this.findBy("id", id, columnsToFetch, withRelations);
    }

    findBy(filterColumn, value, columnsToFetch, withRelations, where = {}) {
        columnsToFetch = columnsToFetch || [
            ...this.getListableColumns().map(c => `${this.getTableName()}.${c}`),
            ...this.getSelectableRelationColumns(this.relations.role),
        ];

        withRelations = withRelations || [this.relations.role];

        return super.findBy(
            filterColumn,
            value,
            columnsToFetch,
            withRelations,
            where,
        );
    }
}

module.exports = new User();
