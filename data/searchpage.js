const mongoCollections = require('./../config/mongoCollections');
const movies = mongoCollections.movies;
const { ObjectId } = require('mongodb');

let exportedMethod = 
{
	async searchShowByTerm(showSearchTerm) 
	{
		console.log("INSIDE: 1");
	
		const moviesCollection = await movies();
		const moviesList = await moviesCollection.find({}).toArray();
		if (!moviesList) throw 'Could not get all movies';
		
		console.log("INSIDE: 2");
	
		let searchedMoviesList = [];
		
		console.log("INSIDE: 3");
	
		for (let i = 0; i < moviesList.length; i++) 
		{
			if(moviesList[i].movieTitle.toLowerCase().includes(showSearchTerm))
			{
				searchedMoviesList.push(moviesList[i]);
			}
		}
		
		console.log("INSIDE: 4");
	
		return searchedMoviesList;
	},
};

module.exports = exportedMethod;
