const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;
const moviesData = data.movies;
const commentsData = data.comments;
const movieReactionsData = data.movieReactions;
const {ObjectID} = require('mongodb');

router.get('/:id', async (req, res) => 
{	
	try 
	{
		let user = await usersData.getUser(req.session.user.userName);
		
		let searchMovie = await moviesData.getMovie(req.params.id);
		let commentsList = await commentsData.getAllComments(searchMovie);
		
		let reactions = {status: "NA", rating: "NA"};
		
		for (let i = 0; i < user.movieReactions.length; i++) 
		{
			if(user.movieReactions[i].movieId == req.params.id)
			{
				reactions.status = user.movieReactions[i].status;
				reactions.rating = user.movieReactions[i].rating;
			}
		}
		
		res.render('posts/movie', { title: "Movie Page", allData: searchMovie, comments: commentsList, reactions: reactions });
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
		
		let searchMovie = await moviesData.getMovie(req.params.id);
		
		let newComment = await commentsData.addComment(
			searchMovie, 
			req.session.user.userName, 
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

router.post('/:id/status', async (req, res) => 
{	
	try 
	{
		let enteredResponse = req.body.sentResponse;
		let newResponse = await movieReactionsData.addStatusReaction(req.session.user.userName, req.params.id, enteredResponse);
			
		res.redirect('/movie/' + req.params.id);
	} 
	catch (e) 
	{
		res.status(500);
		res.render('posts/private', { title: "Film Foray", error: e })
		return;
	}
});

router.post('/:id/rating', async (req, res) => 
{	
	try 
	{
		let enteredResponse = req.body.sentResponse;
		let newResponse = await movieReactionsData.addRatingReaction(req.session.user.userName, req.params.id, enteredResponse);
			
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