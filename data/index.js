const userData = require('./users');
const movieData = require('./movies');
const commentsData = require('./comments');
const movieReactionsData = require('./movieReactions');
const searchpage = require('./searchpage');

module.exports = {
	users: userData,
	movies: movieData,
	comments: commentsData,
	movieReactions: movieReactionsData,
	searchpage: searchpage
};