const express = require('express');
const router = express.Router();
const data = require('../data');
const moviesData = data.movies;

router.get('/', async (req, res) => {
    res.render('posts/addmovie', { title: "Add Movie Page", allData: req.session.user })
});

router.post('/', async (req, res) => {
  try {
    let actorsArray = req.body.actors.trim().split(',');
    let directorsArray = req.body.directors.trim().split(',');
    let whereToWatchArray = req.body.whereToWatch.trim().split(',');
    let addingMovie = await moviesData.addMovie(req.body.movieTitle, req.body.releaseYear, [req.body.genre], req.body.rating, req.body.description, actorsArray, directorsArray, whereToWatchArray);
    if (addingMovie.movieInserted) {
      res.render('posts/addmovie', { title: "Add Movie Page", allData: req.session.user, error: "Movie Successfully Added!"});
      res.redirect('/private');
    } else {
      res.status(500);
      res.render('posts/addmovie', { title: "Add Movie Page", allData: req.session.user, error: "Internal Server Error"});
    }

  } catch(e) {
    res.status(500);
    res.render('posts/addmovie', { title: "Add Movie Page", allData: req.session.user, error: e });
  }
})

router.post('/seed', async (req, res) =>
{
  try
	{
		moviesData.clearMovies();
		await moviesData.addMovie("Movie One", 1997, ["Action", "Drama"], 7.0, "First Movie", ["Actor May", "Actor Van"], ["Alex", "Steven"], ["Netflix", "Hulu"]);
		await moviesData.addMovie("Movie Two", 2001, ["Action"], 8.5, "Second Movie", ["Actor Sven"], ["Ashton"], ["Netflix"]);
		await moviesData.addMovie("Movie Three", 2021, ["Drama"], 9.0, "Third Movie", [], ["Alex"], ["Sphinx"]);
		res.redirect('/private');
  }
	catch(e)
	{
    res.status(500);
    res.render('posts/addmovie', { title: "Add Movie Page", allData: req.session.user, error: e });
  }
})

module.exports = router;
