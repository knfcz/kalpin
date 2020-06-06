const auth = require("../middlewares/auth");
const {
    registerResourceRoutes,
} = require("node-api-modules/controllers/functions/express");
const Folder = require("~models/Folder");
const AccessForbiddenError = require("node-api-modules/errors/AccessForbiddenError");

const folder = register => {
    const middlewares = [auth];

    register("POST", "/folder", create, middlewares);
    register("GET", "/folder/:id", find, middlewares);
    register("PATCH", "/folder/:id", update, middlewares);
    register("DELETE", "/folder/:id", del, middlewares);
};

const create = async req => Folder.create({ ...req.body, userId: req.currentUser.id });

const find = async req => {
    const user = req.currentUser;
    const folder = await Folder.find(req.params.id);

    if (folder.user_id !== user.id) {
        throw new AccessForbiddenError();
    }

    return { folder };
};

const update = async req => Folder.update(req.params.id, {
    ...req.body,
});

const del = async req => {
    let folderId = req.params.id;

    const folder = await Folder.find(folderId);

    if(folder.user_id !== req.currentUser.id) {
        throw new AccessForbiddenError();
    }

    await Folder.delete(folderId);
};


module.exports = folder;
