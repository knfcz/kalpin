const Model = require("./Model");

class RefreshToken extends Model {
    constructor() {
        super();

        this.columns = {
            id: { guarded: true },
            user_id: {},
            value: {},
            device_identifier: {},
        };
    }

};

module.exports = new RefreshToken();
