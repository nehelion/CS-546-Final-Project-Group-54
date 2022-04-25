const express = require('express');
const router = express.Router();
const data = require('../data');
const moviesData = data.movies;
const commentsData = data.comments;
const {ObjectID} = require('mongodb');

router.get('/:id', async (req, res) => 
{	
	try 
	{
		let searchMovie = await moviesData.getMovie(req.params.id);
		let commentsList = await commentsData.getAllComments(searchMovie);
		res.render('posts/movie', { title: "Movie Page", allData: searchMovie, comments: commentsList });
	} 
	catch (e) 
	{
		res.status(500);
		res.render('posts/private', { title: "Film Foray", error: e })
		return;
	}	
});

router.post('/:id/newcomment', async (req, res) => 
{	
	try 
	{
		let enteredComment = req.body.comment_post;
		
		console.log("GOT 0.2 : " + enteredComment);
		
		let searchMovie = await moviesData.getMovie(req.params.id);
		
		let newComment = await commentsData.addComment(
			'625f2fc8ebf2bb999876c2c9', 
			searchMovie, 
			"alexkulpin", 
			enteredComment);
		res.redirect('/movie/' + req.params.id);
	} 
	catch (e) 
	{
		res.status(500);
		res.render('posts/private', { title: "Film Foray", error: e })
		return;
	}	
});

module.exports = router;