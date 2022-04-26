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

async function getAllComments(movie)
{
	var movieList = [];
	
	for (let i = 0; i < movie.comments.length; i++) 
	{
		if(i % 5 == 0 && i == 0)
		{
			movieList.push({comment: 
				"<div id='Page1'>"
			});
		}
		else if(i % 5 == 0 && i > 0)
		{
			if(i / 5 != 1)
			{
				movieList.push({comment: 
				
					"<a href='#'" + 
					"onclick='return show("+'"Page'+((i/5)-1)+'"'+","+'"Page'+(i/5)+'"'+");" +
					"'>Show page " + ((i/5) - 1) + "</a>" +
					"<a href='#'"
				});
			}
			movieList.push({comment: 
				"<a href='#'" + 
				"onclick='return show("+'"Page'+((i/5)+1)+'"'+","+'"Page'+(i/5)+'"'+");" +
				"'>Show page " + ((i/5) + 1) + "</a></div>"
			});
			movieList.push({comment: 
				"<div id='Page" + ((i/5)+1) + "' style='display:none'>"
			});
		}
		movieList.push({comment: 
			"<div class='boxed_comment'><a class='username_comment'>" + 
			movie.comments[i].username + 
			"</a><hr class='hr_comment'><div class='post_comment'>" + 
			movie.comments[i].comment + 
			"</div></div><br>"
		});
		if(i == movie.comments.length - 1)
		{
			movieList.push({comment: 
				"<a href='#'" + 
				"onclick='return show("+'"Page'+Math.trunc(i/5)+'"'+","+'"Page'+Math.trunc((i/5)+1)+'"'+");" +
				"'>Show page " + Math.trunc(i/5) + "</a></div>"
			});
		}
	}
	
	return movieList;
}

module.exports = 
{
	addComment,
	getAllComments
}

