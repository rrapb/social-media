const jwt = require("jsonwebtoken");

module.exports = {
    async createJwt(payload) {
        return new Promise((resolve, reject) => {
            jwt.sign(
                payload,
                `${process.env.secretOrKey}`,
                {
                    expiresIn: 86400,
                },
                (err, token) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(token);
                }
            );
        });
    },
};
