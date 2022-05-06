const express = require("express");
const router = express.Router();
const data = require('../data');
const moviesData = data.movies;

router.post("/", async (req, res) => {
  const data = req.body;
  
  if (data.showSearchTerm.trim().length === 0) {
		res.status(404);
    res.render('posts/searchpage', {
			error: "Error 400: Invalid Input. Try Again!",
      title: "Film Foray",
      notFound: true
    })
  }

  try {
		const result = await moviesData.searchShowByTerm(data.showSearchTerm);
	
    if (result.length === 0) {
			res.status(404);
      res.render('posts/searchpage', {
        error: "Error 404: Show Not Found",
        title: "Film Foray",
        notFound: true
      })
    }

    res.render("posts/searchpage", {
      result: result,
      showSearchTerm: data.showSearchTerm,
      title: "Shows Found",
    });
  } 
	catch (e) {
		res.status(404);
    res.render('posts/searchpage', {
			error: "Search Failed!",
      title: "Film Foray"
    })
  }
});

module.exports = router;
