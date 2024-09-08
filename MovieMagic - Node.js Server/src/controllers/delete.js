const { deleteMovieById, getMovieById } = require("../services/movie");

module.exports = {
    deleteMovie: async (req, res) => {
        const userId = req.session.user._id;
        const movieId = req.params.id;
        const movie = await getMovieById(movieId);
        if (userId !== movie.creatorId) {
            res.redirect('/');
            return;
        }
        console.log('deleteMovie reached. Movie id: ' + req.params.id);
        try {
            await deleteMovieById(movieId);
            res.redirect('/');
        } catch (err) {
            console.log(err);
            res.redirect('/');
        }
    }
};