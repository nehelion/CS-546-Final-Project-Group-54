const mongoCollections = require('./../config/mongoCollections');
const movies = mongoCollections.movies;

async function addMovie(movieTitle, releaseYear, genre, rating, description, actors, directors, whereToWatch)
{
  console.log("inside addMovie");
  const moviesCollection = await movies();
  let dupMovie = await moviesCollection.findOne({movieTitle: movieTitle});
  if (dupMovie !== null) throw "There is already a movie with that title.";
  let newMovie = {
    movieTitle: movieTitle,
    releaseYear: releaseYear,
    genre: genre,
    rating: rating,
    description: description,
    actors: actors,
    directors: directors,
    whereToWatch: whereToWatch
  }
  const insertDetails = await moviesCollection.insertOne(newMovie);
  if (insertDetails.insertedCount === 0) throw "Could not add movie, try again!"
  return {movieInserted: true};
}

async function getMovie(id) 
{	
	/*
	if (!id) throw "You must provide an id to search for";
	if (typeof id !== 'string') throw "Id must be a string";
	if (id.trim().length === 0) throw "Id cannot be an empty string or just spaces";
  id = id.trim();
  if (!ObjectId.isValid(id)) throw "Invalid object ID";
	const moviesCollection = await movies();
	const movie = await moviesCollection.findOne({ _id: ObjectId(id) });
	*/
	const moviesCollection = await movies();
	let movie = await moviesCollection.findOne({'movieTitle': "MovieOne"});
	if (movie === null) throw "No movie with that id";
	return movie;
}

async function test() 
{
  return {test: true};
}

module.exports = 
{
  addMovie,
	getMovie,
  test
}
