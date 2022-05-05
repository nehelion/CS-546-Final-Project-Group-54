const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;
const moviesData = data.movies;
const commentsData = data.comments;
const movieReactionsData = data.movieReactions;

router.post('/', async (req, res) => {
  try {
		
		console.log("GOT HERE");
		
		moviesData.clearMovies();
		await moviesData.addMovie(
			"Avatar", 
			2009, 
			["Action", "Sci/Fi"], 
			7.8, 
			"A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes " +
			"torn between following his orders and protecting the world he feels is his home.", 
			["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"], 
			["James Cameron"], 
			["Netflix", "Hulu"]
		);
		
		
		
		
		await moviesData.addMovie(
			"Avatar2", 
			2009, 
			["Action", "Sci/Fi"], 
			7.8, 
			"A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes " +
			"torn between following his orders and protecting the world he feels is his home.", 
			["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"], 
			["James Cameron"], 
			["Netflix", "Hulu"]
		);
		
		
		
		
		await moviesData.addMovie(
			"Avatar3", 
			2009, 
			["Action", "Sci/Fi"], 
			7.8, 
			"A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes " +
			"torn between following his orders and protecting the world he feels is his home.", 
			["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"], 
			["James Cameron"], 
			["Netflix", "Hulu"]
		);
		
		
		
		
		await moviesData.addMovie(
			"Avatar4", 
			2009, 
			["Action", "Sci/Fi"], 
			7.8, 
			"A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes " +
			"torn between following his orders and protecting the world he feels is his home.", 
			["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"], 
			["James Cameron"], 
			["Netflix", "Hulu"]
		);
		
		
		
		
		await moviesData.addMovie(
			"Avatar5", 
			2009, 
			["Action", "Sci/Fi"], 
			7.8, 
			"A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes " +
			"torn between following his orders and protecting the world he feels is his home.", 
			["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"], 
			["James Cameron"], 
			["Netflix", "Hulu"]
		);
		
		
		
		
		await moviesData.addMovie(
			"Avatar6", 
			2009, 
			["Action", "Sci/Fi"], 
			7.8, 
			"A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes " +
			"torn between following his orders and protecting the world he feels is his home.", 
			["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"], 
			["James Cameron"], 
			["Netflix", "Hulu"]
		);
		
		
		
		
		await moviesData.addMovie(
			"Avatar7", 
			2009, 
			["Action", "Sci/Fi"], 
			7.8, 
			"A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes " +
			"torn between following his orders and protecting the world he feels is his home.", 
			["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"], 
			["James Cameron"], 
			["Netflix", "Hulu"]
		);
		
		
		
		
		await moviesData.addMovie(
			"Avatar8", 
			2009, 
			["Action", "Sci/Fi"], 
			7.8, 
			"A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes " +
			"torn between following his orders and protecting the world he feels is his home.", 
			["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"], 
			["James Cameron"], 
			["Netflix", "Hulu"]
		);
		
		
		
		
		await moviesData.addMovie(
			"Avatar9", 
			2009, 
			["Action", "Sci/Fi"], 
			7.8, 
			"A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes " +
			"torn between following his orders and protecting the world he feels is his home.", 
			["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"], 
			["James Cameron"], 
			["Netflix", "Hulu"]
		);
		
		
		
		
		await moviesData.addMovie(
			"Avatar10", 
			2009, 
			["Action", "Sci/Fi"], 
			7.8, 
			"A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes " +
			"torn between following his orders and protecting the world he feels is his home.", 
			["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"], 
			["James Cameron"], 
			["Netflix", "Hulu"]
		);
		
		
		
		
		await moviesData.addMovie(
			"Avatar11", 
			2009, 
			["Action", "Sci/Fi"], 
			7.8, 
			"A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes " +
			"torn between following his orders and protecting the world he feels is his home.", 
			["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"], 
			["James Cameron"], 
			["Netflix", "Hulu"]
		);
		
		
		
		
		await moviesData.addMovie(
			"Avatar12", 
			2009, 
			["Action", "Sci/Fi"], 
			7.8, 
			"A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes " +
			"torn between following his orders and protecting the world he feels is his home.", 
			["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"], 
			["James Cameron"], 
			["Netflix", "Hulu"]
		);
		
		
		
		
		await moviesData.addMovie(
			"Avatar13", 
			2009, 
			["Action", "Sci/Fi"], 
			7.8, 
			"A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes " +
			"torn between following his orders and protecting the world he feels is his home.", 
			["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"], 
			["James Cameron"], 
			["Netflix", "Hulu"]
		);
		
		
		
		
		await moviesData.addMovie(
			"Avatar14", 
			2009, 
			["Action", "Sci/Fi"], 
			7.8, 
			"A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes " +
			"torn between following his orders and protecting the world he feels is his home.", 
			["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"], 
			["James Cameron"], 
			["Netflix", "Hulu"]
		);
		
		
		
		
		await moviesData.addMovie(
			"Avatar15", 
			2009, 
			["Action", "Sci/Fi"], 
			7.8, 
			"A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes " +
			"torn between following his orders and protecting the world he feels is his home.", 
			["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"], 
			["James Cameron"], 
			["Netflix", "Hulu"]
		);
		
		
		
		
		await moviesData.addMovie(
			"Avatar16", 
			2009, 
			["Action", "Sci/Fi"], 
			7.8, 
			"A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes " +
			"torn between following his orders and protecting the world he feels is his home.", 
			["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"], 
			["James Cameron"], 
			["Netflix", "Hulu"]
		);
		
		
		
		
		await moviesData.addMovie(
			"Avatar17", 
			2009, 
			["Action", "Sci/Fi"], 
			7.8, 
			"A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes " +
			"torn between following his orders and protecting the world he feels is his home.", 
			["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"], 
			["James Cameron"], 
			["Netflix", "Hulu"]
		);
		
		
		
		
		await moviesData.addMovie(
			"Avatar18", 
			2009, 
			["Action", "Sci/Fi"], 
			7.8, 
			"A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes " +
			"torn between following his orders and protecting the world he feels is his home.", 
			["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"], 
			["James Cameron"], 
			["Netflix", "Hulu"]
		);
		
		
		
		
		await moviesData.addMovie(
			"Avatar19", 
			2009, 
			["Action", "Sci/Fi"], 
			7.8, 
			"A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes " +
			"torn between following his orders and protecting the world he feels is his home.", 
			["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"], 
			["James Cameron"], 
			["Netflix", "Hulu"]
		);
		
		
		
		
		await moviesData.addMovie(
			"Avatar20", 
			2009, 
			["Action", "Sci/Fi"], 
			7.8, 
			"A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes " +
			"torn between following his orders and protecting the world he feels is his home.", 
			["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"], 
			["James Cameron"], 
			["Netflix", "Hulu"]
		);
		
		
		res.redirect('/');
  }
	catch(e) {
    res.status(500);
    res.render('posts/login', { title: "Login Screen"});
  }
});

module.exports = router;