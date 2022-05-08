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
      notFound: true
    })
  }

  try {
		const result = await moviesData.searchShowByTerm(data.showSearchTerm);
	
    if (result.length === 0) {
			res.status(404);
      res.render('posts/searchpage', {
        error: "Error 404: Show Not Found",
        notFound: true
      })
    }

    res.render("posts/searchpage", {
      result: result,
      showSearchTerm: data.showSearchTerm
    });
  } 
	catch (e) {
		res.status(404);
    res.render('posts/searchpage', {
			error: "Search Failed!"
    })
  }
});

module.exports = router;
