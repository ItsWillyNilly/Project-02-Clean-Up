const db = require('../models');

module.exports = function (app) {
    // get all items
    app.get('/api/items', function(req, res) {
        db.Item.findAll({}).then(function(dbItem) {
            res.json(dbItem);
        });
    });

    // get a single item by id
    app.get('/api/items/:id', function(req, res) {
        db.Item.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(dbItem) {
            res.json(dbItem);
        });
    });

    // get all items by type
    app.get('/api/items/type/:type', function(req, res) {
        db.Item.findAll({
            where: {
                type: req.params.type
            }
        }).then(function(dbItem) {
            res.json(dbItem);
        });
    });

    // get all items by condition
    app.get('/api/items/condition/:condition', function(req, res) {
        db.Item.findAll({
            where: {
                condition: req.params.condition
            }
        }).then(function(dbItem) {
            res.json(dbItem);
        });
    });

    // post route for saving a new item
    app.post('/api/items', function(req, res) {
        db.Item.create(req.body).then(function(dbItem) {
            res.json(dbItem);
        });
    });

    // delete route for deleting an item
    app.delete('/api/items/:id', function(req, res) {
        db.Item.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbItem) {
            res.json(dbItem);
        });
    });

    // put route for updating an item
    app.put('/api/items', function(req, res) {
        db.Item.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then(function(dbItem) {
            res.json(dbItem);
        });
    });
};