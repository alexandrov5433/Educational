const { validationResult } = require("express-validator");
const { createCast } = require("../services/cast");
const { parseError } = require("../services/errorParser");

module.exports = {
    createCastGet: (req, res) => {
        res.render('cast-create', { userLoggedIn: req.userLoggedIn });
    },
    createCastPost: async (req, res) => {
        const resultVal = validationResult(req);
        try {
            if (resultVal.errors.length) {
                throw resultVal.errors;
            }
            await createCast(req.body);
            res.redirect('/');
        } catch (err) {
            res.render('cast-create', { cast: req.body, errors: parseError(err).errors, userLoggedIn: req.userLoggedIn });
        }
    }
};