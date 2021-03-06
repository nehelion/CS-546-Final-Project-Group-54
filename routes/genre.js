const express = require('express');
const router = express.Router();
const data = require('../data');
const moviesData = data.movies;
const {ObjectID} = require('mongodb');

router.get('/:genre', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(403).render('posts/login')
    }
    else {
      let movieList = await moviesData.getMoviesByGenre(req.params.genre);
      movieList = await moviesData.sortMovies(movieList);

      var genreList = []

      for (let i = 0; i < movieList.length; i++) {
        genreList.push({
          title:
            "<div class='genre-item'><a href='/movie/" + movieList[i]._id + "'>" +
            "<button class='genre-movie-thumbnail all-movies' type='submit'>" + movieList[i].movieTitle + "</button>" +
            "</a></div>"
        });
      }

      res.render('posts/genre', {
        allData: genreList, 
        givenGenre: req.params.genre 
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