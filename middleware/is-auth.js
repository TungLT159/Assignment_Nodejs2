const UserToken = require("../models/UserToken");
module.exports = (req, res, next) => {
    const tokenStr = req.body.token || req.query.token;
    UserToken.fetchAll((token) => {
        const result = token.filter((item) => item.token === tokenStr);
        if (result.length > 0) {
            return next();
        } else {
            return res.status(401).send({ message: "Unauthorized" });
        }
    });
};