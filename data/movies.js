const mongoCollections = require('./../config/mongoCollections';
const movies = mongoCollections.movies;

async function addMovie(movieTitle, releaseYear, genre, rating, description, actors, directors, whereToWatch) {
  console.log("inside addMovie");
  const moviesCollection = await movies();
  let dupMovie = await moviesCollection.findOne({title: title});
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
  const insertDetails = await usersCollection.insertOne(newMovie);
  if (insertDetails.insertedCount === 0) throw "Could not add movie, try again!"
  return {movieInserted: true};
}

async function test() {
  return {test: true};
}

module.exports = {
  addMovie,
  test
}
