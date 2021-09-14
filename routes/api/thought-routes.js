const router = require('express').Router();
const {
    addThought,
    getThoughts,
    getThoughtById,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

//sets GET all and POST at /api/thoughts
router
    .route('/')
    .get(getThoughts)
    .post(addThought);

//sets GET one, PUT, DELETE at /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

//sets POST reaction at /api/thoughts/:thoughtId
router.route('/:thoughtId').post(addReaction);

//sets DELETE reaction at /api/thoughts/:thoughtId/:reactionId
router.route('/:thoughtId/:reactId').delete(removeReaction);

module.exports = router;