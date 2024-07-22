const path = require('path');
const isAuth = require('./config/middleware/isAuth');

module.exports = function(app) {
    app.get('/', function(req, res) {
        if (req.user) {
            res.redirect('/home');
        } else {
            res.render('signup', {js:[signup.js]});
        }
    });

    app.get('/login_signup', function(req, res) {
        if (req.user) {
            res.redirect('/home');
        } else {
            res.render('login', {js:[login.js]});
        }
    });

    // redirects the user to the login page if they are not logged in
    app.get('/home', isAuth.isAuthenticated, function(req, res) {
        res.render('home', {js:[home.js]});
    });

    app.get('/newPost', isAuth.isAuthenticated, function(req, res) {
        res.render('newPost', {js:[listing.js]});
    })
};