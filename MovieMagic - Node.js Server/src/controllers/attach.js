const { getAllCast } = require("../services/cast");
const { getMovieById, attachCastToMovie } = require("../services/movie");

module.exports = {
    attachGet: async (req, res) => {
        const id = req.params.id;
        const movie = await getMovieById(id);
        if (!movie) {
            res.render('404');
            return;
        }
        const allCast = await getAllCast();

        res.render('cast-attach', { movie, allCast: allCast.filter(c => !movie.cast.includes(c._id)), userLoggedIn: req.userLoggedIn });
    },
    attachPost: async (req, res) => {
        const movieId = req.params.id;
        const castId = req.body.cast;

        if (!movieId || !castId) {
            console.error(`Missing movieId: ${movieId} or castId: ${castId}.`);
            res.status(400).end();
            return;
        }
        if (castId === 'none') {
            const movie = await getMovieById(movieId);
            const allCast = await getAllCast();
            res.render('cast-attach', { movie, allCast, error: true, userLoggedIn: req.userLoggedIn });
            return;
        }
        try {
            await attachCastToMovie(movieId, castId);
        } catch (err) {
            console.error(`Error occured when adding cast to movie.\nErr: ${err}`);
            res.status(400).end();
            return;
        }
        res.redirect('/details/' + movieId);
    }
};