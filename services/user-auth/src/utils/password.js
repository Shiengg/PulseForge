const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10;

async function hashPassword(plain) {
    return bcrypt.hash(plain, SALT_ROUND);
}

async function comparePassword(plain, hash) {
    return bcrypt.compare(plain, hash);
}

module.exports = {hashPassword, comparePassword}