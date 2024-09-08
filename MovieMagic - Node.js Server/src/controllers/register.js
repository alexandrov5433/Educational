const { validationResult } = require('express-validator');

const { registerUser } = require("../services/user");
const { parseError } = require('../services/errorParser');

module.exports = {
    getRegister: (req, res) => {
        res.render('register', { userLoggedIn: req.userLoggedIn });
    },
    postRegister: async (req, res) => {
        const { email, password } = req.body;
        try {
            const resultVal = validationResult(req);
            if (resultVal.errors.length) {
                throw resultVal.errors;
            }

            const newUser = await registerUser(email, password);
            req.session.user = newUser;
            console.log(`Registerd new user:\n${newUser._id}`);
            res.redirect('/');
        } catch (err) {
            res.render('register', { data: { email }, errors: parseError(err).errors, userLoggedIn: req.userLoggedIn });
        }
    }
};