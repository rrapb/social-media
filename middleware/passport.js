const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const {User} = require('../models/user');
require('dotenv');

const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = `${process.env.secretOrKey}`
module.exports = (passport) => {
    passport.use(
        new JwtStrategy(options, async (jwt_payload, done) => {
            const user = await User.findById(jwt_payload.id);

            if (!user) {
                done(null, false);
                return;
            }

            done(null, user);
        })
    );
};