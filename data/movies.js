const mongoCollections = require('./../config/mongoCollections');
const movies = mongoCollections.movies;
const { ObjectId } = require('mongodb');

async function addMovie(movieTitle, releaseYear, genre, rating, description, actors, directors, whereToWatch)
{
  console.log("inside addMovie");
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

async function getMovie(id) 
{	
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

async function getAllMovies() 
{	
	const moviesCollection = await movies();
	const moviesList = await moviesCollection.find({}).toArray();
	if (!moviesList) throw 'Could not get all movies';
	return moviesList;
}

async function sortMovies(moviesList)
{
	var titlesMoviesList = [];
	var sortedMoviesList = [];
	
	for (let i = 0; i < moviesList.length; i++) 
	{
		titlesMoviesList.push(moviesList[i].movieTitle);
    }
	
	titlesMoviesList.sort();
	
	for (let i = 0; i < titlesMoviesList.length; i++) 
	{
		for (let j = 0; j < moviesList.length; j++) 
		{
			if(titlesMoviesList[i] == moviesList[j].movieTitle)
			{
				sortedMoviesList.push(moviesList[j]);
			}
		}
	}
	
	return sortedMoviesList;
}

async function clearMovies() 
{	
	const moviesCollection = await movies();
	moviesCollection.drop();
	return true;
}

async function test() 
{
	return {test: true};
}

module.exports = 
{
	addMovie,
	getMovie,
	getAllMovies,
	clearMovies,
	sortMovies,
	test
}



