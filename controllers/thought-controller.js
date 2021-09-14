const { Thought, User } = require('../models');

const thoughtController = {

    //GET find all thoughts
    getThoughts(req, res) {
        Thought.find({})
            .sort({ 'createdAt': 'descending' })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => { res.status(400).json(err) });
    },
    //GET find thought by _id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.json(404).json({ message: "No thought found with this id!" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => { res.status(400).json(err) });
    },
    //POST create new thought
    addThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => { res.status(400).json(err) });
    },
    //PUT update thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => { res.status(400).json(err) });
    },
    //DELETE delete thought by _id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => { res.status(400).json(err) });
    },
    //POST new reaction to thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => { res.json(400).json(err) });
    },
    //DELETE reaction to thought
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: params.reactId } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => { res.status(404).json(err) });
    }
};

module.exports = thoughtController;