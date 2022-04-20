const mongoCollections = require('./../config/mongoCollections');
const users = mongoCollections.users;
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function createUser(firstName, lastName, username, password, email) {
    const usersCollection = await users();
    let dupUser = await usersCollection.findOne({ username: username.toLowerCase()});
    if (dupUser !== null) throw "There is already a user with that username.";
    let dupEmail = await usersCollection.findOne({ email: email.toLowerCase()});
    if (dupEmail !== null) throw "There is already a user with that email.";
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    let newUser = {
        firstName: firstName.charAt(0).toUpperCase()+ firstName.slice(1),
        lastName: lastName.charAt(0).toUpperCase()+ lastName.slice(1),
        username: username.toLowerCase(),
        password: hashedPassword,
        email: email.toLowerCase()
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