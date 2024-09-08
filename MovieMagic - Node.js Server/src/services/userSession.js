
function isUser(req, res, next) {
    if (Object.hasOwn(req.session, 'user')) {
        req.userLoggedIn = true;
        next();
    } else {
        req.userLoggedIn = false;
        res.redirect('/');
    }
}

function isGuest(req, res, next) {
    if (!Object.hasOwn(req.session, 'user')) {
        req.userLoggedIn = false;
        next();
    } else {
        req.userLoggedIn = true;
        res.redirect('/');
    }
}

function isUserOrGuest(req, res, next) {
    if (Object.hasOwn(req.session, 'user')) {
        req.userLoggedIn = true;
        next();
    } else {
        req.userLoggedIn = false;
        next();
    }
}

module.exports = {
    isUser,
    isGuest,
    isUserOrGuest
};