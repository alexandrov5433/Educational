const mongoose = require('mongoose');
require('../models/Movie');
require('../models/Cast');

const connectionStr = 'mongodb://localhost:27017/movie-magic';

async function configDataBase() {
    await mongoose.connect(connectionStr);
    console.log('Database connected.');
}

module.exports = { configDataBase };