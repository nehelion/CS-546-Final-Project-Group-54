const express = require('express');
const router = express.Router();
const data = require('../data');
const moviesData = data.movies;

router.get('/', async (req, res) => {
    res.render('posts/addmovie', {allData: req.session.user })
});

router.post('/', async (req, res) => {
  try {
		if(req.body.description === undefined) {
			req.body.description = "";
		}
		
		if(!Array.isArray(req.body.genre) && 
		  typeof req.body.genre == 'string' && 
			req.body.genre.trim().length !== 0) {
			req.body.genre = [req.body.genre];
		}
		
		if(!Array.isArray(req.body.actors) && 
		  typeof req.body.actors == 'string' && 
			req.body.actors.trim().length !== 0) {
			req.body.actors = [req.body.actors];
		}
		
		if(!Array.isArray(req.body.directors) && 
		  typeof req.body.directors == 'string') {
			req.body.directors = [req.body.directors];
		}
		
		if(!Array.isArray(req.body.whereToWatch) && 
		  typeof req.body.whereToWatch == 'string') {
			req.body.whereToWatch = [req.body.whereToWatch];
		}
		
		let addingMovie = await moviesData.addMovie(
			req.body.movieTitle, 
			req.body.releaseYear, 
			req.body.genre, 
			req.body.rating, 
			req.body.description, 
			req.body.actors, 
			req.body.directors, 
			req.body.whereToWatch);
    if (addingMovie.movieInserted) {
      res.redirect('/private');
    } 
		else {
      res.status(500);
      res.render('posts/addmovie', {allData: req.session.user, error: "Internal Server Error"});
    }
  } 
	catch(e) {
    res.status(500);
    res.render('posts/addmovie', {allData: req.session.user, error: e });
  }
})

module.exports = router;
