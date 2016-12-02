var storage = require('node-persist');

storage.initSync({
    dir: 'notes'
});

var getAll = function (req, res) {
    var notes = storage.values() || [];
    res.status( 200 ).send( notes );
};

var get = function (req, res) {
    if (!req.params.id) {
        console.error('Missing Note ID!');
        res.sendStatus(400);
    }

    storage.getItem(req.params.id, function (err, value) {
        if (err) {
            console.error('Error while getting item!');
            res.sendStatus(500);
        }

        res.status(200).send(value);
    });
};

var create = function (req, res) {
    if (!req.body) {
        console.error('nobody');
        res.sendStatus(400);
    }

    req.body.id = req.params.id || (~~storage.keys().pop() + 1) + '';

    storage.setItem(req.body.id, req.body, function () {
       res.status(201).send(req.body);
    });
};

var remove = function (req, res) {
    if (!req.params.id) {
        res.sendStatus(400);
    }

    storage.removeItem(req.params.id, function (err) {
        if (err) {
            res.sendStatus(500);
        }

        res.sendStatus(200);
    });
};

module.exports = {
    getAll: getAll,
    get: get,
    create: create,
    remove: remove
};
