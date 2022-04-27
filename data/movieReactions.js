const mongoCollections = require('./../config/mongoCollections');
const movies = mongoCollections.movies;
const comments = mongoCollections.comments;
const { ObjectID } = require('mongodb');

async function addComment(movie, username, comment)
{
	const moviesCollection = await movies();
	
	let newComment = {
		movieId: movie._id,
    username: username,
    comment: comment
  }
	
	movie.comments.push(newComment);
	
	const updatedInfo = await moviesCollection.updateOne(
    { _id: movie._id },
    { $set: movie }
  );
  if (updatedInfo.modifiedCount === 0) 
	{
    throw 'could not update movies successfully';
  }
	
	const commentsCollection = await comments();
	
	const insertDetails = await commentsCollection.insertOne(newComment);
  if (insertDetails.insertedCount === 0) throw "Could not add movie, try again!"
  return {commentInserted: true};
}

module.exports = 
{
	addComment
}

