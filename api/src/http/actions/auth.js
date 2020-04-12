const { InvalidParametersError } = require("node-api-modules");
const {
    byPassword: authByPassword,
    byAccessToken: authByAccessToken,
    refreshAccessToken: refresh,
} = require("../../utils/Auth");

const auth = register => {
    register("POST", "/auth", authenticate);
    register("POST", "/refresh-access-token", refreshAccessToken);
};

const authenticate = async req => {
    const deviceIdentifier = req.header("Device-Identifier");
    const { email, password, accessToken } = req.body;

    if (email && password) {
        return authByPassword(email, password, deviceIdentifier);
    } else if (accessToken) {
        return authByAccessToken(accessToken, deviceIdentifier);
    }

    throw new InvalidParametersError();
};

const refreshAccessToken = async req => {
    const deviceIdentifier = req.header("Device-Identifier");
    const { refreshToken } = req.body;

    return refresh(refreshToken, deviceIdentifier);
};

module.exports = auth;
