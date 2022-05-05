const mongoCollections = require('./../config/mongoCollections');
const users = mongoCollections.users;
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function createUser(firstName, lastName, username, password, email) {
	// check firstName 
	if (!firstName) 
		throw "You must provide a firstName";
  if (typeof firstName !== 'string') 
		throw "firstName name must be a string";
  if (firstName.trim().length === 0)
    throw "firstName cannot be an empty string or just spaces";
  if (!(/^[a-zA-Z]+$/gi.test(firstName)))
		throw "firstName should only contain letters";
	
	// check lastName 
	if (!lastName) 
		throw "You must provide a firstName";
  if (typeof lastName !== 'string') 
		throw "firstName name must be a string";
  if (lastName.trim().length === 0)
    throw "firstName cannot be an empty string or just spaces";
  if (!(/^[a-zA-Z]+$/gi.test(lastName)))
		throw "firstName should only contain letters";
	
	// check username 
	if (!username) 
		throw "You must provide a username";
  if (typeof username !== 'string') 
		throw "Username must be a string";
  if (username.trim().length === 0)
		throw "Username cannot be an empty string or just spaces";
	if (username.includes(" "))
		throw "Username cannot contain spaces";
	if (!(/^[a-zA-Z0-9]+$/gi.test(username)))
		throw "Username should only contain alphanumeric characters";
	if (username.length < 4)
		throw "Username should be more than 4 characters";
	
	// check password
	if (!password) 
		throw "You must provide a password";
  if (typeof password !== 'string') 
		throw "Password must be a string";
  if (password.trim().length === 0)
		throw "Password cannot be an empty string or just spaces";
	if (password.includes(" "))
		throw "Password cannot contain spaces";
	if (password.length < 6)
		throw "Password should be more than 6 characters";
	
	// check email
	if (!email) 
		throw "You must provide an email";
	if (typeof email !== 'string') 
		throw "Email must be a string";
  if (email.trim().length === 0)
    throw "Email cannot be an empty string or just spaces";
	if (!email.includes("@"))
		throw "Email does not contain @ symbol";
	if (email.includes(" "))
		throw "Email cannot contain spaces";
	
	const usersCollection = await users();
	
  let dupUser = await usersCollection.findOne({ username: username.toLowerCase()});
  if (dupUser !== null) throw "There is already a user with that username.";
	
  let dupEmail = await usersCollection.findOne({ email: email.toLowerCase()});
  if (dupEmail !== null) throw "There is already a user with that email.";
	
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
	
  let newUser = {
    firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
    lastName: lastName.charAt(0).toUpperCase()+ lastName.slice(1),
    username: username.toLowerCase(),
    password: hashedPassword,
    email: email.toLowerCase(),
		movieReactions: []
  }
  const insertDetails = await usersCollection.insertOne(newUser);
  if (insertDetails.insertedCount === 0) throw "Could not create user, try again!"
  return { userInserted: true };
}

async function checkUser(username, password) {
	// check username 
	if (!username) 
		throw "You must provide a username";
  if (typeof username !== 'string') 
		throw "Username must be a string";
  if (username.trim().length === 0)
		throw "Username cannot be an empty string or just spaces";
	if (username.includes(" "))
		throw "Username cannot contain spaces";
	if (!(/^[a-zA-Z0-9]+$/gi.test(username)))
		throw "Username should only contain alphanumeric characters";
	if (username.length < 4)
		throw "Username should be more than 4 characters";
	
	// check password
	if (!password) 
		throw "You must provide a password";
  if (typeof password !== 'string') 
		throw "Password must be a string";
  if (password.trim().length === 0)
		throw "Password cannot be an empty string or just spaces";
	if (password.includes(" "))
		throw "Password cannot contain spaces";
	if (password.length < 6)
		throw "Password should be more than 6 characters";
	
  const usersCollection = await users();
  let usernameMatch = await usersCollection.findOne({ username: username.toLowerCase() })
  if (!usernameMatch || !usernameMatch._id) throw "Either the username or password is invalid"
  let passMatch = await bcrypt.compare(password, usernameMatch.password);
  if (!passMatch) throw "Either the username or password is invalid"
  return { authenticated: true }
}

async function getUser(username) {
	// check username 
	if (!username) 
		throw "You must provide a username";
  if (typeof username !== 'string') 
		throw "Username must be a string";
  if (username.trim().length === 0)
		throw "Username cannot be an empty string or just spaces";
	if (username.includes(" "))
		throw "Username cannot contain spaces";
	if (!(/^[a-zA-Z0-9]+$/gi.test(username)))
		throw "Username should only contain alphanumeric characters";
	if (username.length < 4)
		throw "Username should be more than 4 characters";
	
  const usersCollection = await users();
  let user = await usersCollection.findOne({ username: username.toLowerCase() })
	if (user === null) throw "No movie with that id";
	return user;
}

async function getAllLikedMovies(username) {
	// check username 
	if (!username) 
		throw "You must provide a username";
  if (typeof username !== 'string') 
		throw "Username must be a string";
  if (username.trim().length === 0)
		throw "Username cannot be an empty string or just spaces";
	if (username.includes(" "))
		throw "Username cannot contain spaces";
	if (!(/^[a-zA-Z0-9]+$/gi.test(username)))
		throw "Username should only contain alphanumeric characters";
	if (username.length < 4)
		throw "Username should be more than 4 characters";
	
	const user = await getUser(username);
	
	var likedMoviesList = [];
	
	for (let i = 0; i < user.movieReactions.length; i++) 
	{
		if(user.movieReactions[i].rating == "Like")
		{
			likedMoviesList.push(user.movieReactions[i].movieId);
		}
	}
	
	return likedMoviesList;
}

module.exports = {
  createUser,
  checkUser,
	getUser,
	getAllLikedMovies
}