module.exports = {
    logout: (req, res) => {
        delete req.session.user;
        console.log('User successfully logged out.');
        res.redirect('/');
    }
};