const { getAllMovies, getMovieById, searchForMovies } = require('../services/movie');

module.exports = {
    home: async (req, res) => {
        const movies = await getAllMovies();
        res.render('home', { movies, userLoggedIn: req.userLoggedIn }); 
    },
    details: async (req, res) => {
        const userId = req.session.user._id;
        const movieId = req.params.id;
        const movie = await getMovieById(movieId);
        if (!movie) {
            return res.render('404', { userLoggedIn: req.userLoggedIn });
        }
        movie.starRating = '&#x2605;'.repeat(movie.rating);
        if (userId === movie.creatorId) {
            movie.isCreatorViewing = true;
        } else {
            movie.isCreatorViewing = false;
        }

        res.render('details', { movie, userLoggedIn: req.userLoggedIn });
    },
    search: async (req, res) => {
        const urlSP = [...(new URLSearchParams(req.url)).values()];
        if (urlSP.some(e => Boolean(e))) {
            const searchVals = {};
            if (urlSP[0]) {
                searchVals.title = urlSP[0];
            }
            if (urlSP[1]) {
                searchVals.genre = urlSP[1];
            }
            if (urlSP[2]) {
                searchVals.year = Number(urlSP[2]);
            }
            const searchRes = await searchForMovies(searchVals); //returns array of objects
            res.render('search', { searchVals, searchRes, userLoggedIn: req.userLoggedIn });
            return;
        }
        
        res.render('search', { firstVisit: true, userLoggedIn: req.userLoggedIn });
    }
};