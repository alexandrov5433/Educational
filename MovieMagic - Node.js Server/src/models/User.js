const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
},
    {
        collation: {
            locale: 'en',
            strength: 2
        }
    });

const User = mongoose.model('User', userSchema);

module.exports = { User };