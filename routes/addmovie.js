const express = require('express');
const router = express.Router();
const data = require('../data');
const moviesData = data.movies;


router.get('/', async (req, res) => {
    res.render('posts/addmovie', { title: "Add Movie Page", allData: req.session.user })
});
router.post('/', async (req, res) => {
  //console.log('test');
  try {
    console.log("POSTING HERE");
    //const {movieTitle, releaseYear, genre, rating, description, actors, directors, whereToWatch} = req.body;

    //let addingMovie = await moviesData.addMovie(movieTitle, releaseYear, genre, rating, description, actors, directors, whereToWatch);
    //let addingMovie = await moviesData.addMovie(req.body.movieTitle, req.body.releaseYear, req.body.genre, req.body.rating, req.body.description, req.body.actors, req.body.directors, req.body.whereToWatch);
	//let addingMovie = await moviesData.addMovie();
    /*if (addingMovie.movieInserted) {
      res.render('posts/addmovie', { title: "Add Movie Page", allData: req.session.user, error: "Movie Successfully Added!"});
    } else {
      res.status(500);
      res.render('posts/addmovie', { title: "Add Movie Page", allData: req.session.user, error: "Internal Server Error"});
      //return;
    }*/
    let testing = await moviesData.test(); //doesnt work either
    console.log("POSTING DONE " + testing.test);
	
	await moviesData.addMovie("MovieOne", 1997, "Action", 7.0, "First Movie", "Actors", "Directors", "Watch Here");
	res.redirect('/private');
	
    //return;
  } catch(e) {
    res.status(500);
    res.render('posts/addmovie', { title: "Add Movie Page", allData: req.session.user, error: e });
    //return;
  }
})

module.exports = router;
