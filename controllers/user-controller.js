const { User } = require('../models');

const userController = {
    //GET all users
    getAllUser(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => { res.status(400).json(err) });
    },

    //GET user by _id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => { res.status(400).json(err) });
    },

    //POST new user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => { res.status(400).json(err) });
    },

    //PUT update user by _id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => { res.status(400).json(err) });
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => { res.status(400).json(err) });
    }
};

module.exports = userController;