const userData = require('./users');
const movieData = require('./movies');
const commentsData = require('./comments');
const movieReactionsData = require('./movieReactions');

module.exports = {
	users: userData,
	movies: movieData,
	comments: commentsData,
	movieReactions: movieReactionsData
};