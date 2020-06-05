const router = require('express').Router();
let user  = require('../models/user.model');

//We are using this to get request from our route
router.route('/').get((req, res) => {
    user.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+ err));
});

// Handles incoming HTTP post requests
router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new user({username});

    newUser.save()
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json('Error: ' + err))
});

//We are exporting the router
module.exports = router