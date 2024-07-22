const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initializePassport(passport, getUserByEmail, getUserById) {
    const autheticateUser = async (signupEmail, signupPassword, done) => {
        const user = getUserByEmail(signupEmail);
        if (user == null) {
            return done(null, false, { message: 'No user with that email' })
        }
        try {
            if (await bcrypt.compare(signupPassword, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password incorrect' })
            }
        } catch (e) {
            return done(e);
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'signup-email' }, autheticateUser));
    

    // keeps authentication state across HTTP requests, sequelize needs to serialize and deserialize the user
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    });
}

module.exports = {initializePassport};