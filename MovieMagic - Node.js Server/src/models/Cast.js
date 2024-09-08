const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 130
    },
    born: {
        type: String,
        required: true
    },
    nameInMovie: {
        type: String,
        required: true
    },
    castImage : {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^https?:\/\/.+/.test(value);
            },
            message: 'Please enter a valid URL. It should start with \'http://\' or \'https://\'.'
        }
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }
});

const Cast = mongoose.model('Cast', castSchema);

module.exports = { Cast };