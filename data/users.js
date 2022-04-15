const mongoCollections = require('./../config/mongoCollections');
const users = mongoCollections.users;
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function createUser(username, password) {
    const usersCollection = await users();
    let dupUser = await usersCollection.findOne({ username: username.toLowerCase() });
    if (dupUser !== null) throw "There is already a user with that username.";
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    let newUser = {
        username: username.toLowerCase(),
        password: hashedPassword
    }
    const insertDetails = await usersCollection.insertOne(newUser);
    if (insertDetails.insertedCount === 0) throw "Could not create user, try again!"
    return { userInserted: true };
}

async function checkUser(username, password) {
    const usersCollection = await users();
    let usernameMatch = await usersCollection.findOne({ username: username.toLowerCase() })
    if (!usernameMatch || !usernameMatch._id) throw "Either the username or password is invalid"
    let passMatch = await bcrypt.compare(password, usernameMatch.password);
    if (!passMatch) throw "Either the username or password is invalid"
    return { authenticated: true }
}
module.exports = {
    createUser,
    checkUser
}