const { validationResult } = require('express-validator');

const { createMovie } = require('../services/movie');
const { parseError } = require('../services/errorParser');
module.exports = {
    createGet: (req, res) => {
        res.render('create', { userLoggedIn: req.userLoggedIn });
    },
    createPost: async (req, res) => {
        const resultVal = validationResult(req);
        try {
            if (resultVal.errors.length) {
                throw resultVal.errors;
            }
            const result = await createMovie(req.body, req.session.user._id);
            console.log(result);
    
            res.redirect('/details/' + result._id);
            
        } catch (err) {
            res.render('create', { movie: req.body, errors: parseError(err).errors, userLoggedIn: req.userLoggedIn })
        }
    }
};