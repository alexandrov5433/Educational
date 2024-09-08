const { body } = require('express-validator');

module.exports = {
    regEmailVal: () => {
        return body('email').trim().isEmail().withMessage('Please enter a valid email.');
    },
    regPassVal: () => {
        return body('password').trim().isAlphanumeric().isLength({ min: 6 }).withMessage('Password may contain only letters and numbers, and must be at least 6 characters long.');
    },
    regRepassVal: () => {
        return body('repass').trim().custom((value, { req }) => value === req.body.password).withMessage('Passwords don\'t match.');
    },
    movieTitleVal: () => {
        return body('title').trim().notEmpty().isLength({ min: 2 }).isAlphanumeric('en-US', { ignore: ' -:,!.?'}).withMessage('The title must be at least 2 characters lost and may include englisch letters, numbers and the following symbols:\' -:,!.?\'.');
    },
    movieGenreVal: () => {
        return body('genre').trim().notEmpty().isLength({ min: 2 }).isAlphanumeric('en-US', { ignore: ' -:,!.?'}).withMessage('The genre must be at least 2 characters lost and may include englisch letters, numbers and the following symbols:\' -:,!.?\'.');
    },
    movieDirectorVal: () => {
        return body('director').trim().notEmpty().isLength({ min: 2 }).isAlphanumeric('en-US', { ignore: ' -:,!.?'}).withMessage('The director must be at least 2 characters lost and may include englisch letters, numbers and the following symbols:\'- :,!.?\'.');
    },
    movieYearVal: () => {
        return body('year').trim().notEmpty().custom(value => Number(value) >= 1800 && Number(value) <= 2050).withMessage('The year must be a number between 1800 and 2050.');
    },
    movieURLVal: () => {
        return body('imageURL').trim().notEmpty().withMessage('Please enter an image URL.');
    },
    movieRatingVal: () => {
        return body('rating').trim().notEmpty().custom(value => Number(value) >= 1 && Number(value) <= 5).withMessage('The rating must be a number between 1 and 5.');
    },
    movieDescriptionVal: () => {
        return body('description').trim().notEmpty().isLength({ min: 20 }).withMessage('The description must be at least 20 characters lost and may include englisch letters, numbers and the following symbols:\'- :;()/"\',$&+!.?\'.').isAlphanumeric('en-US', { ignore: ' -:;()/"\',$&+!.?'}).withMessage('The description must be at least 20 characters lost and may include englisch letters, numbers and the following symbols:\'- :;()/"\',$&+!.?\'.');
    },
    castNameVal: () => {
        return body('name').trim().notEmpty().isLength({ min: 5 }).isAlphanumeric('en-US', { ignore: ' ' }).withMessage('The name should consist of english letters and numbers, and should be at least 5 characters long. Space may be used.');
    },
    castAgeVal: () => {
        return body('age').trim().notEmpty().isLength({ min: 1, max: 120 }).withMessage('The age should be a number between 1 and 120.');
    },
    castBornVal: () => {
        return body('born').trim().notEmpty().isLength({ min: 10 }).isDate({format: 'DD.MM.YYYY', strictMode: true, delimiters: ['/', '.', '-']}).withMessage('The date of birth can consist of numbers, and should be 10 characters long, with delimiters (/.-). Format: DD.MM.YYYY.');
    },
    castCharacterVal: () => {
        return body('nameInMovie').trim().notEmpty().isLength({ min: 3 }).isAlphanumeric('en-US', { ignore: ' ' }).withMessage('The character name can consist of english letters and numbers, and should be at least 3 characters long. Space may be used.');
    },
    castUrlVal: () => {
        return body('imageURL').trim().notEmpty().withMessage('Please enter an image URL.');
    }
};