const mongoCollections = require('./../config/mongoCollections');
const users = mongoCollections.users;
const movieReactions = mongoCollections.movieReactions;
const { ObjectID } = require('mongodb');

async function addStatusReaction(username, movieId, status) {
	// TODO ADD ERROR CHECKING

	const usersCollection = await users();
	let user = await usersCollection.findOne({ username: username.toLowerCase() })

	let newReaction = {
		movieId: movieId,
		status: status,
		rating: "NA"
	}

	for (let i = 0; i < user.movieReactions.length; i++) {
		if (user.movieReactions[i].movieId == movieId) {
			if (user.movieReactions[i].status == status) {
				return { commentInserted: false };
			}

			newReaction.rating = user.movieReactions[i].rating;
			user.movieReactions.splice(i, 1);
		}
	}

	user.movieReactions.push(newReaction);

	const updatedInfo = await usersCollection.updateOne(
		{ _id: user._id },
		{ $set: user }
	);
	if (updatedInfo.modifiedCount === 0) {
		throw 'could not update users successfully';
	}

	const movieReactionsCollection = await movieReactions();

	const insertDetails = await movieReactionsCollection.insertOne(newReaction);
	if (insertDetails.insertedCount === 0) throw "Could not add movie, try again!"
	return { commentInserted: true };
}

async function addRatingReaction(username, movieId, rating) {
	// TODO ADD ERROR CHECKING
	const usersCollection = await users();
	let user = await usersCollection.findOne({ username: username.toLowerCase() })

	let newReaction = {
		movieId: movieId,
		status: "NA",
		rating: rating
	}

	for (let i = 0; i < user.movieReactions.length; i++) {
		if (user.movieReactions[i].movieId == movieId) {
			if (user.movieReactions[i].rating == rating) {
				return { commentInserted: false };
			}

			newReaction.status = user.movieReactions[i].status;
			user.movieReactions.splice(i, 1);
		}
	}

	user.movieReactions.push(newReaction);

	const updatedInfo = await usersCollection.updateOne(
		{ _id: user._id },
		{ $set: user }
	);
	if (updatedInfo.modifiedCount === 0) {
		throw 'could not update users successfully';
	}

	const movieReactionsCollection = await movieReactions();

	const insertDetails = await movieReactionsCollection.insertOne(newReaction);
	if (insertDetails.insertedCount === 0) throw "Could not add movie, try again!"
	return { commentInserted: true };
}

module.exports =
{
	addStatusReaction,
	addRatingReaction
}

