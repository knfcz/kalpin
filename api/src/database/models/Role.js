const Model = require("./Model");

class Role extends Model {
    constructor() {
        super();

        this.columns = {
            id: { guarded: true },
            name: {},
        };
    }
}

module.exports = new Role();
