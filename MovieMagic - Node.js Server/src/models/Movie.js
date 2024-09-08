const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        min: 1890,
        max: 2024
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    description: {
        type: String,
        required: true,
        maxLength: 1000
    },
    imageURL: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^https?:\/\/.+/.test(value);
            },
            message: 'Please enter a valid URL. It should start with \'http://\' or \'https://\'.'
        }
    },
    cast: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Cast',
        default: []
    },
    creatorId: {
        type: String,
        required: true
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = { Movie };