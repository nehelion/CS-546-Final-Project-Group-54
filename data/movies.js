const mongoCollections = require('./../config/mongoCollections');
const movies = mongoCollections.movies;
const { ObjectId } = require('mongodb');

async function addMovie(movieTitle, releaseYear, genre, rating, description, actors, directors, whereToWatch) {
	// check existance
	if (movieTitle === undefined || releaseYear === undefined || genre === undefined
    || rating === undefined || description === undefined || actors === undefined
    || directors === undefined || whereToWatch === undefined) {
    throw "One or more fields are undefined!"
  }
	
	// check movieTitle 
	if (!movieTitle) 
		throw "You must provide a movieTitle";
  if (typeof movieTitle !== 'string') 
		throw "movieTitle name must be a string";
  if (movieTitle.trim().length === 0)
    throw "movieTitle cannot be an empty string or just spaces";
  if (!(/^[a-zA-Z0-9]+$/gi.test(movieTitle)))
		throw "movieTitle should only contain alphanumeric characters";
	
	// check releaseYear 
	if (!releaseYear) 
		throw "You must provide a releaseYear";
  if (isNaN(releaseYear))
    throw "Release year is not a number!"
  if (releaseYear > new Date().getFullYear()) 
		throw "Not a valid year";
	
	// check genre 
	if (!genre || !Array.isArray(genre))
    throw "You must provide an array of genres";
	if (genre.length === 0) 
		throw "You must supply at least one genre";
  for (i in genre) {
    if (typeof genre[i] !== 'string' || genre[i].trim().length === 0) {
      throw "One or more genres is not a string or is an empty string";
    }
    genre[i] = genre[i].trim();
  }
	
	// check rating 
	if (!rating) 
		throw "You must provide a rating";
  if (isNaN(rating))
    throw "Rating year is not a number!"
  if (rating < 0 || rating > 10) 
		throw "Rating must be between values of 0 and 10 inclusive";
	
	// check description 
	if (!description) 
		throw "No description data was provided";
	
	// check actors 
	if (!actors || !Array.isArray(actors))
    throw "You must provide an array of actors";
	if (actors.length === 0) 
		throw "You must supply at least one actor";
  for (i in actors) {
    if (typeof actors[i] !== 'string' || actors[i].trim().length === 0) {
      throw "One or more actors is not a string or is an empty string";
    }
    actors[i] = actors[i].trim();
  }
	
	// check directors 
	if (!directors || !Array.isArray(directors))
    throw "You must provide an array of directors";
  for (i in directors) {
    if (typeof directors[i] !== 'string') {
      throw "One or more directors is not a string or is an empty string";
    }
    directors[i] = directors[i].trim();
  }
	
	// check whereToWatch 
	if (!whereToWatch || !Array.isArray(whereToWatch))
    throw "You must provide an array of whereToWatch";
  for (i in whereToWatch) {
    if (typeof whereToWatch[i] !== 'string') {
      throw "One or more whereToWatch is not a string or is an empty string";
    }
    whereToWatch[i] = whereToWatch[i].trim();
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
	// check id
	if (!id) 
		throw "You must provide an id to search for";
	if (typeof id !== 'string') 
		throw "Id must be a string";
	if (id.trim().length === 0) 
		throw "Id cannot be an empty string or just spaces";
	id = id.trim();
	if (!ObjectId.isValid(id)) 
		throw "Invalid object ID";

	const moviesCollection = await movies();
	let movie = await moviesCollection.findOne({ _id: ObjectId(id) });
	if (movie === null) throw "No movie with that id";
	return movie;
}

async function getAllMovies() {
	const moviesCollection = await movies();
	const moviesList = await moviesCollection.find({}).toArray();
	if (!moviesList) throw "Could not get all movies";
	return moviesList;
}

async function sortMovies(moviesList) {
	// check moviesList 
	if (!moviesList) 
		throw "An issue occured on the server, no moviesList data was passed";
	
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
	// check showSearchTerm 
	if (!showSearchTerm) 
		throw "You must provide a showSearchTerm";
  if (typeof showSearchTerm !== 'string') 
		throw "showSearchTerm name must be a string";
  if (showSearchTerm.trim().length === 0)
    throw "showSearchTerm cannot be an empty string or just spaces";
  if (!(/^[a-zA-Z0-9]+$/gi.test(showSearchTerm)))
		throw "showSearchTerm should only contain alphanumeric characters";
	
	const moviesCollection = await movies();
	const moviesList = await moviesCollection.find({}).toArray();
	if (!moviesList) 
		throw "Could not get all movies";
	
	let searchedMoviesList = [];
	
	for (let i = 0; i < moviesList.length; i++) {
		if(moviesList[i].movieTitle.toLowerCase().includes(showSearchTerm.toLowerCase())) {
			searchedMoviesList.push(moviesList[i]);
		}
	}

	return searchedMoviesList;
}

async function clearMovies() {
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
