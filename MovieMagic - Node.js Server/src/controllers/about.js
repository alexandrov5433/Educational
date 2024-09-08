module.exports = {
    about: (req, res) => {
        res.render('about', { userLoggedIn: req.userLoggedIn });
    }
};