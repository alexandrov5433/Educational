const { Router } = require('express');

const { home, details, search } = require('../controllers/catalog');
const { about } = require('../controllers/about');
const { createGet, createPost } = require('../controllers/movie');
const { notFound } = require('../controllers/404');
const { createCastGet, createCastPost } = require('../controllers/cast');
const { attachGet, attachPost } = require('../controllers/attach');
const { getLogin, postLogin } = require('../controllers/login');
const { getRegister, postRegister } = require('../controllers/register');
const { logout } = require('../controllers/logout');
const { getEdit, postEdit } = require('../controllers/edit');
const { deleteMovie } = require('../controllers/delete');
const { isUser, isGuest, isUserOrGuest } = require('../services/userSession');
const { regEmailVal, regPassVal, regRepassVal, movieTitleVal, movieGenreVal, movieDirectorVal, movieYearVal, movieURLVal, movieRatingVal, movieDescriptionVal, castNameVal, castAgeVal, castBornVal, castCharacterVal, castUrlVal } = require('../services/validators');


const router = Router();

router.get('/', isUserOrGuest, home);
router.get('/about', isUserOrGuest, about);
router.get('/search', isUserOrGuest, search);

router.get('/details/:id', isUser, details);
router.get('/attach/:id', isUser, attachGet);
router.post('/attach/:id', isUser, attachPost);
router.get('/create/movie', isUser, createGet);
router.post('/create/movie', isUser, movieTitleVal(), movieGenreVal(), movieDirectorVal(), movieYearVal(), movieURLVal(), movieRatingVal(), movieDescriptionVal(), createPost);
router.get('/create/cast', isUser, createCastGet);
router.post('/create/cast', isUser, castNameVal(), castAgeVal(), castBornVal(), castCharacterVal(), castUrlVal(), createCastPost);
router.get('/edit/:id', isUser, getEdit);
router.post('/edit/:id', isUser, movieTitleVal(), movieGenreVal(), movieDirectorVal(), movieYearVal(), movieURLVal(), movieRatingVal(), movieDescriptionVal(), postEdit);
router.delete('/delete/:id', isUser, deleteMovie);

router.get('/login', isGuest, getLogin);
router.post('/login', isGuest, postLogin);
router.get('/register', isGuest, getRegister);
router.post('/register', isGuest, regEmailVal(), regPassVal(), regRepassVal(), postRegister);
router.get('/logout', isUser, logout);

router.get('*', notFound);

module.exports = {
    router
};