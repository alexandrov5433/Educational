const { Cast } = require('../models/Cast');

async function createCast(castData) {
    console.log(castData);
    
    const cast = new Cast({
        name: castData.name,
        age: castData.age,
        born: castData.born,
        nameInMovie: castData.nameInMovie,
        castImage: castData.imageURL,
        // movie: castData.movie
    });
    await cast.save();
    return cast;
}

async function getAllCast() {
    const cast = await Cast.find().lean();
    return cast;
}

module.exports = {
    createCast,
    getAllCast
};