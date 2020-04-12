const User = require("../database/models/User");
const RefreshToken = require("../database/models/RefreshToken");
const InvalidCredentialsError = require("../http/errors/InvalidCredentialsError");
const ExpiredTokenError = require("../http/errors/ExpiredTokenError");
const JWT = require("./JWT");
const Hash = require("./Hash");

/**
 * Authentifie un utilisateur avec son email et mot de passe, et génère une paire de tokens si c'est ok
 *
 * @param email
 * @param password
 * @param deviceIdentifier
 *
 * @return {Promise<{accessToken: any, user: *, refreshToken: *}>}
 */
const byPassword = async (email, password, deviceIdentifier) => {
    let user;

    // TODO: optimiser ça parce que deux requetes ça fait chier

    try {
        user = await User.findBy("email", email, ["id", "password"], []);

        if (!user || !(await Hash.compare(password, user.password))) {
            throw new Error();
        }
    } catch (e) {
        console.log(e);
        throw new InvalidCredentialsError();
    }

    const accessToken = await _makeAccessToken({ email, id: user.id });
    const refreshToken = await _makeRefreshToken(
        { email, id: user.id },
        deviceIdentifier,
    );

    return { user: await User.find(user.id), accessToken, refreshToken };
};

/**
 * Authentifie un utilisateur grace à son accessToken, et regénère un refreshToken si c'est ok
 *
 * @param accessToken
 * @param deviceIdentifier
 * @return {Promise<{authToken: *, user: *, refreshToken: *}>}
 */
const byAccessToken = async (accessToken, deviceIdentifier) => {
    try {
        const tokenPayload = await JWT.verify(accessToken);

        let user = await User.find(tokenPayload.id);

        const refreshToken = await _makeRefreshToken(
            tokenPayload,
            deviceIdentifier,
        );

        return { user, authToken: accessToken, refreshToken };
    } catch (e) {
        throw e;
        throw new ExpiredTokenError();
    }
};

/**
 * Génère et renvoie un nouvel accessToken
 *
 * @param refreshToken
 * @param deviceIdentifier
 * @return {Promise<{accessToken: any, refreshToken: *}>}
 */
const refreshAccessToken = async (refreshToken, deviceIdentifier) => {
    try {
        const storedRefreshToken = await _findRefreshToken(
            refreshToken,
            deviceIdentifier,
        );

        let tokenPayload = await JWT.verify(storedRefreshToken.value);

        const newRefreshToken = await _makeRefreshToken(
            tokenPayload,
            deviceIdentifier,
        );

        const newAccessToken = await _makeAccessToken(tokenPayload);

        return { refreshToken: newRefreshToken, accessToken: newAccessToken };
    } catch (e) {
        throw new ExpiredTokenError();
    }
};

/**
 * Renvoie un refreshToken stockée en base de donnée
 *
 * @param refreshToken
 * @param deviceIdentifier
 * @return {*}
 * @private
 */
const _findRefreshToken = (refreshToken, deviceIdentifier) => {
    return RefreshToken.findBy("value", refreshToken, ["*"], [], {
        device_identifier: deviceIdentifier,
    });
};

/**
 * Génère un accessToken
 *
 * @param payload
 * @return {Promise | Promise<unknown>}
 * @private
 */
const _makeAccessToken = payload => {
    delete payload.iat;
    delete payload.exp;

    return JWT.make(payload, process.env.AUTH_TOKEN_TTL);
};

/**
 * Génère et enregistre en base de donnée un nouveau refreshToken
 *
 * @param payload
 * @param deviceIdentifier
 * @return {Promise<any>}
 * @private
 */
const _makeRefreshToken = async (payload, deviceIdentifier) => {
    console.log("payload", payload);
    delete payload.iat;
    delete payload.exp;

    const value = await JWT.make(payload, process.env.REFRESH_TOKEN_TTL);

    await RefreshToken.createOrUpdate({
        value,
        userId: payload.id,
        deviceIdentifier,
    });

    return value;
};

module.exports = {
    byPassword,
    byAccessToken,
    refreshAccessToken,
};
