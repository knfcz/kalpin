const User = require("~models/User");
const Role = require("~models/Role");
const { mapBy } = require("js-utils/mapBy");

const mapByName = mapBy("name");

exports.seed = async knex => {
    await knex.raw("SET foreign_key_checks = 0");
    await knex(User.table).truncate();
    await knex.raw("SET foreign_key_checks = 1");

    const roles = mapByName(await Role.list());

    const users = [
        {
            name: "knfcz",
            email: "konfuciuz@gmail.com",
            password: "0000",
            roleId: roles['admin'].id,
        },
    ];


    await Promise.all(users.map(async u => User.create(u)));
};
