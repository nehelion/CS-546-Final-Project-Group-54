const mongoCollections = require('./../config/mongoCollections');
const movies = mongoCollections.movies;
const { ObjectId } = require('mongodb');

async function addMovie(movieTitle, releaseYear, genre, rating, description, actors, directors, whereToWatch) {
	// TODO ADD ERROR CHECKING
	
  if (movieTitle === undefined || releaseYear === undefined || genre === undefined
    || rating === undefined || description === undefined || actors === undefined
    || directors === undefined || whereToWatch === undefined) {
    throw "One or more fields are undefined!"
  }
  if (isNaN(releaseYear)) {
    throw "Release year is not a number!"
  }
  if (isNaN(rating)) {
    throw "Rating is not a number!"
  }
  const moviesCollection = await movies();
  let dupMovie = await moviesCollection.findOne({movieTitle: movieTitle});
  if (dupMovie !== null) throw "There is already a movie with that title.";
	let comments = new Array();
  let newMovie = {
    movieTitle: movieTitle,
    releaseYear: releaseYear,
    genre: genre,
    rating: rating,
    description: description,
    actors: actors,
    directors: directors,
    whereToWatch: whereToWatch,
		comments: []
  }
  const insertDetails = await moviesCollection.insertOne(newMovie);
  if (insertDetails.insertedCount === 0) throw "Could not add movie, try again!"
  return {movieInserted: true};
}

async function getMovie(id) {
	// TODO ADD ERROR CHECKING
	
	if (!id) throw "You must provide an id to search for";
	if (typeof id !== 'string') throw "Id must be a string";
	if (id.trim().length === 0) throw "Id cannot be an empty string or just spaces";
	id = id.trim();
	if (!ObjectId.isValid(id)) throw "Invalid object ID";

	const moviesCollection = await movies();
	let movie = await moviesCollection.findOne({ _id: ObjectId(id) });
	if (movie === null) throw "No movie with that id";
	return movie;
}

async function getAllMovies() {
	// TODO ADD ERROR CHECKING
	
	const moviesCollection = await movies();
	const moviesList = await moviesCollection.find({}).toArray();
	if (!moviesList) throw 'Could not get all movies';
	return moviesList;
}

async function sortMovies(moviesList) {
	// TODO ADD ERROR CHECKING
	
	var titlesMoviesList = [];
	var sortedMoviesList = [];

	for (let i = 0; i < moviesList.length; i++) {
		titlesMoviesList.push(moviesList[i].movieTitle.toLowerCase());
  }

	titlesMoviesList.sort();

	for (let i = 0; i < titlesMoviesList.length; i++) {
		for (let j = 0; j < moviesList.length; j++) {
			if(titlesMoviesList[i] == moviesList[j].movieTitle.toLowerCase()) {
				sortedMoviesList.push(moviesList[j]);
			}
		}
	}

	return sortedMoviesList;
}

async function searchShowByTerm(showSearchTerm) {
	// TODO ADD ERROR CHECKING
	
	const moviesCollection = await movies();
	const moviesList = await moviesCollection.find({}).toArray();
	if (!moviesList) throw 'Could not get all movies';
	
	let searchedMoviesList = [];
	
	for (let i = 0; i < moviesList.length; i++) {
		if(moviesList[i].movieTitle.toLowerCase().includes(showSearchTerm)) {
			searchedMoviesList.push(moviesList[i]);
		}
	}

	return searchedMoviesList;
}

async function clearMovies() {
	// TODO ADD ERROR CHECKING
	
	const moviesCollection = await movies();
	moviesCollection.drop();
	return true;
}

module.exports =
{
	addMovie,
	getMovie,
	getAllMovies,
	clearMovies,
	sortMovies,
	searchShowByTerm
}
