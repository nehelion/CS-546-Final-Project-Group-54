const express = require('express');
const router = express.Router();
const data = require('../data');
const moviesData = data.movies;
const mongoose = require('mongoose');

router.get('/', async (req, res) => 
{	
	try 
	{
		var movieId = '626025afc71d571026e1ca41';
		//var movieId = mongoose.Types.ObjectId('626025afc71d571026e1ca41');
		let searchMovie = await moviesData.getMovie(movieId);
		res.render('posts/movie', { title: "Movie Page", allData: searchMovie });
	} 
	catch (e) 
	{
		res.status(500);
		res.render('posts/private', { title: "Film Foray", error: e })
		return;
	}	
});

module.exports = router;