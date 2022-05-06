const express = require('express');
const router = express.Router();
const data = require('../data');
const moviesData = data.movies;
const usersData = data.users;

router.get('/', async (req, res) => {
  try {
    if (!req.session.user) {
			return res.status(403).render('posts/login', { title: "Login Screen"})
		}
		else {
			let movies = await moviesData.getAllMovies();
		
			movies = await moviesData.sortMovies(movies);

			var movieList = [];

			for (let i = 0; i < movies.length; i++) {
				movieList.push({
					title:
						"<div class='item'><a href='/movie/" + movies[i]._id + "'>" +
						"<button class='movie-thumbnail all-movies' type='submit'>" + movies[i].movieTitle + "</button>" +
						"</a></div>"
				});
			}

			let likedMovies = await usersData.getAllLikedMovies(req.session.user.userName);

			var likedMovieList = [];

			try {
				for (let i = 0; i < likedMovies.length; i++) {
					let addingMovie = await moviesData.getMovie(likedMovies[i]);
					likedMovieList.push(addingMovie);
				}
				likedMovieList = await moviesData.sortMovies(likedMovieList);
			}
			catch (e) {
				res.status(500);
				res.render('posts/private', { title: "Film Foray", error: e })
				return;
			}

			var likedMovieListHtml = [];
			
			if(likedMovieList.length == 0) {
				likedMovieListHtml.push({
					title: "<div class='item'><a class='no_liked_error'>You haven't liked any movie yet!</a></div>"
				});
			}
			else {
				for (let i = 0; i < likedMovieList.length; i++) {
					likedMovieListHtml.push({
						title: "<div class='item'><a href='/movie/" + likedMovieList[i]._id + "'>" +
							"<button class='movie-thumbnail liked-movies' type='submit'>" + likedMovieList[i].movieTitle + "</button>" +
							"</a></div>"
					});
				}
			}

			res.render('posts/private', { 
				title: "Logged In", 
				userDetails: req.session.user, 
				movies: movieList, 
				likedMovies: likedMovieListHtml 
			})
		}
  } 
	catch (e) {
    res.status(404).json({
      error: '404: Page Not found'
    });
  }
});

module.exports = router;