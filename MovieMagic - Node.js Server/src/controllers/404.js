module.exports = {
    notFound: (req, res) => {
        res.render('404', { userLoggedIn: req.userLoggedIn });
    }
};