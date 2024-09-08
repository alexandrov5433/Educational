const bcrypt = require('bcrypt');

async function hashPass(arg) {
    arg = arg.toString();
    try {
        return await bcrypt.hash(arg, 9);
    } catch (err) {
        console.log(`Error occured while hashing. Func: hashPass(). Err:\n${err}`);
        throw err;
    }
}

async function isEqualToHash(arg, hash) {
    arg = arg.toString();
    try {
        return await bcrypt.compare(arg, hash);
    } catch (err) {
        console.log(`Error occured while comparing. Func: isEqualToHash(). Err:\n${err}`);
        throw err;
    }
}

module.exports = {
    hashPass,
    isEqualToHash
};