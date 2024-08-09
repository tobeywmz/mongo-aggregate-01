const db = require('../db/connect');
const User = db.collection('users');

async function findByCredentials(user, pass) {
    const result = await User.aggregate([
        {
            $match: {
                username: user,
                password: pass
            }
        },
        {
            $project: {
                name: 1
            }
        }
    ]).toArray();
    return result[0];
};

async function findUser(userId) {
    return await User.findById(userId);
}

module.exports = {
    findByCredentials: findByCredentials
};