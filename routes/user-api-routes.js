const db = require('../models');
const { initializePassport } = require('../config/passport');

module.exports = function (app) {

    // route to login
    app.post('/api/login', initializePassport.authenticate('local'), function (req, res) {
        res.json(req.user);
    });

    // route to signup
    app.post('/api/signup', function (req, res) {
        db.User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }).then(function () {
            res.redirect(307, '/api/login');
        }).catch(function (err) {
            res.status(401).json(err);
        });
    });

    // route to logout
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    // route for user data and only returns the username and id of the user if they are not logged in
    app.get('/api/user_data', function (req, res) {
        if (!req.user) {
            res.json({});
        } else {
            res.json({
                username: req.user.username,
                id: req.user.id
            });
        }
    });

    // finds all users
    app.get('/api/users', function (req, res) {
        db.User.findAll({}).then(function (dbUser) {
            res.json(dbUser);
        });
    });

    // route to get one user by id
    app.get('/api/users/:id', function (req, res) {
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (dbUser) {
            res.json(dbUser);
        });
    });

    // route to create a new listing
    app.post('/api/listings', function (req, res) {
        // Assuming you have a 'Listing' model defined
        db.Listing.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            // Add any other fields for the listing
            condition: req.body.condition,
            UserId: req.user.id // Associate the listing with the logged-in user
        })
            .then(function (newListing) {
                res.json(newListing);
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    });


    // creates a new user
    app.post('/api/users', function (req, res) {
        db.User.create(req.body).then(function (dbUser) {
            res.json(dbUser);
        });
    });

    // route to update user by id
    app.put('/api/users', function (req, res) {
        db.User.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then(function (dbUser) {
            res.json(dbUser);
        });
    });

    // route to delete a user
    app.delete('/api/users/:id', function (req, res) {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbUser) {
            res.json(dbUser);
        });
    });
};