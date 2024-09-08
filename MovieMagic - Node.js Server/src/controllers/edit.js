const { getMovieById, editMovie } = require("../services/movie");

module.exports = {
    getEdit: async (req, res) => {
        console.log('getEdit reached. Movie id: ' + req.params.id);
        const movie = await getMovieById(req.params.id);
        res.render('edit', { movie, userLoggedIn: req.userLoggedIn });
    },
    postEdit: async (req, res) => {
        const userId = req.session.user._id;
        const movieId = req.params.id;
        const movie = await getMovieById(movieId);
        if (userId !== movie.creatorId) {
            res.redirect('/');
            return;
        }
        console.log('postEdit reached. Movie id: ' + req.params.id);
        const errors = {
            title: !req.body.title,
            genre: !req.body.genre,
            director: !req.body.director,
            year: !req.body.year,
            imageURL: !req.body.imageURL,
            rating: !req.body.rating,
            description: !req.body.description
        };
        if (Object.values(errors).includes(true)) {
            res.render('edit', { movie: req.body, errors, userLoggedIn: req.userLoggedIn });
            return;
        }
        try {
            req.body._id = movieId;
            console.log(req.body);
            const updatedMovie = await editMovie(req.body);
            res.redirect(`/details/${updatedMovie._id}`);
        } catch (err) {
            res.render('edit', { movie: req.body, editError: err, userLoggedIn: req.userLoggedIn });
        }
    }
};