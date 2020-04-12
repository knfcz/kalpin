const util = require("util");
const { Model: BaseModel, CannotCreateResourceError } = require("node-api-modules");
const db = require("../db");

class Model extends BaseModel {
    constructor() {
        super(db);

        // Add custom code here
    }
}

module.exports = Model;
