const { urlencoded, static: staticHandler } = require('express');
const session = require('express-session');


function configExpress(app) {
    app.use(urlencoded({ extended: true }));
    app.use('/static', staticHandler('static'));
    app.use(session({
        secret: 'asdfj12.as%211%"§C',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false }
    }));
}

module.exports = {
    configExpress
};
