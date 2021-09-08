const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: "Reaction text is required!"
    },
    username: {
        type: String,
        required: "username is required!"
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    }
});

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactSchema]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactCount').get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;