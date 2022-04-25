const mongoCollections = require('./../config/mongoCollections');
const movies = mongoCollections.movies;
const comments = mongoCollections.comments;
const { ObjectID } = require('mongodb');

async function addComment(userId, movie, username, comment)
{
	const moviesCollection = await movies();
	
	let newComment = {
		movieId: movie._id,
		userId: userId,
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

async function getAllComments(movie)
{
	var movieList = [];
	
	movie.comments.forEach((com) => 
	{
		movieList.push({comment: "<div class='boxed_comment'><a class='username_comment'>" + com.username + "</a><hr class='hr_comment'><div class='post_comment'>" + com.comment + "</div></div><br>"});
	});
	
	return movieList;
}

module.exports = 
{
	addComment,
	getAllComments
}
