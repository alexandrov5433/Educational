const { Movie } = require('../models/Movie');

async function getAllMovies() {
    const movies = await Movie.find().lean();
    return movies;
}

async function getMovieById(id) {
    const movie = await Movie.findById(id).lean().populate('cast');
    return movie;
}

async function createMovie(movieData, creatorId) {
    const movie = new Movie({
        title: movieData.title,
        genre: movieData.genre,
        director: movieData.director,
        year: Number(movieData.year),
        rating: Number(movieData.rating),
        description: movieData.description,
        imageURL: movieData.imageURL,
        creatorId
    });
    await movie.save();
    return movie;
}

async function editMovie(movieData) {
    const updatedMovie = await Movie.findOneAndUpdate(
        { _id: movieData._id },
        { $set: {
            title: movieData.title,
            genre: movieData.genre,
            director: movieData.director,
            year: Number(movieData.year),
            rating: Number(movieData.rating),
            description: movieData.description,
            imageURL: movieData.imageURL,
        }},
        { returnDocument: 'after'}
    );
    console.log(updatedMovie);
    
    if (updatedMovie) {
        return updatedMovie;
    } else {
        throw new Error('Movie could not be edited.');
    }
}

async function deleteMovieById(id) {
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (deletedMovie) {
        return deletedMovie;
    } else {
        throw new Error('Movie could not be deleted.');
    }
}

async function attachCastToMovie(movieId, castId) {
    const movie = await Movie.findById(movieId);
    if (!movie) {
        throw new Error('Movie not found. MovieId: ' + movieId);
    }
    movie.cast.push(castId);
    await movie.save();
    return movie;
}

async function searchForMovies(searchVals) {
    const data = await Movie.find(searchVals).lean();
    return data;
}

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    searchForMovies,
    attachCastToMovie,
    editMovie,
    deleteMovieById
};