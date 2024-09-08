const { User } = require('../models/User');
const crypto = require('./crypto');

async function registerUser(email, password) {
    const hashedPass = await crypto.hashPass(password);
    const newUser = new User({
        email,
        password: hashedPass
    });
    await newUser.save();
    return newUser;
}

async function areUserEmailAndPassCorrect(email, password) {
    const user = await User.findOne({ email }).lean(); //if none are found null is returned
    if (user) {
        try {
            const isPassValid = await crypto.isEqualToHash(password, user.password);
            if (isPassValid) {
                return user;
            }
            throw new Error('Wrong password.');
        } catch (err) {
            throw err;
        }
    } else {
        throw new Error(`User with email(${email}) does not exist.`);
    }
}

module.exports = {
    registerUser,
    areUserEmailAndPassCorrect
};