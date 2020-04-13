const Model = require("./Model");

class Folder extends Model {
    constructor() {
        super();


        // T'as un prob d'ordre d'instanciation de tes classes, donc ton archi pue
        // en gros si tu require note ici, il sera construit, mais au moment ou il fait son this.relations.model = machin
        // ben ton model n'a pas encore sa table, du coup les requetent chient

        // la solution, ça serait d'enregistrer this.columns et this.models et tout dans une fonction séparé,
        // et les appeler dans un autre fichier, comme ça tu pourra etre sur que toutes tes classes sont bien init lorsque les
        // objets de relations seront construit


        // putain de sa mere



    }

    init() {
        this.User = require("./User");
        this.Note = require('./Note');

        this.columns = {
            id: {guarded: true},
            title: {},
            user_id: {guarded: true}
        };

        this.relations = {
            user: {
                model: this.User,
                joinColumn: "user_id",
                columnNamePrefix: "user"
            }
        };


    }

    find(id, columnsToFetch, withRelations) {
        return this.findBy("id", id, columnsToFetch, withRelations);
    }

    async findBy(filterColumn, value, columnsToFetch, withRelations, where = {}) {
        columnsToFetch = columnsToFetch || [
            ...this.getListableColumns().map(c => `${this.getTableName()}.${c}`),
            ...this.getSelectableRelationColumns(this.relations.user, ["name", "id"])
        ];

        withRelations = withRelations || [this.relations.user];

        const folder = await super.findBy(
            filterColumn,
            value,
            columnsToFetch,
            withRelations,
            where
        );

        return { ...folder, notes: await this.Note.byFolder(folder.id)};
    }
}

module.exports = new Folder();
