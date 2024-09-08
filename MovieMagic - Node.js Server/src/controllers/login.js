const { areUserEmailAndPassCorrect } = require('../services/user');

module.exports = {
    getLogin: (req, res) => {
        res.render('login', { userLoggedIn: req.userLoggedIn });
    },
    postLogin: async (req, res) => {
        const errors = {
            email: !req.body.email,
            password: !req.body.password
        };
        if (Object.values(errors).includes(true)) {
            res.render('login', { emailInfo: req.body.email, errors, userLoggedIn: req.userLoggedIn });
            return;
        }
        try {
            const newUser = await areUserEmailAndPassCorrect(req.body.email, req.body.password);
            req.session.user = newUser;
            console.log(`Logged in user:\n${newUser._id}`);
            res.redirect('/');
        } catch (err) {
            res.render('login', { emailInfo: req.body.email, loginErr: err.message, userLoggedIn: req.userLoggedIn });
        }
    }
};