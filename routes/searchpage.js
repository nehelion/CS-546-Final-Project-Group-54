const express = require("express");
const router = express.Router();
const data = require('../data');
const searchData = data.searchpage;

router.post("/", async (req, res) => {
  const data = req.body;
  
  if (data.showSearchTerm.trim().length === 0) {
    const errInput = true;
    res.status(400), {
      showSearchTerm: data.showSearchTerm,
      title: "Error 400: Invalid Input. Try Again!",
      errInput: errInput,
    };
    return;
  }

  try 
  {
	console.log("BEFORE: " + data.showSearchTerm);
	
	const result = await searchData.searchShowByTerm(data.showSearchTerm);
	
	console.log("AFTER: " + result.length);
	
    if (result.length === 0) 
	{
		errNotFound = true;
		res.status(404), 
		{
			showSearchTerm: data.showSearchTerm,
			title: "Error 404: Show Not Found",
			errNotFound: errNotFound,
		};
		return;
    }

    res.render("posts/searchpage", {
      result: result,
      showSearchTerm: data.showSearchTerm,
      title: "Shows Found",
    });
  } catch (e) {
    res.status(404).json({ error: "Search Failed!" });
  }
});

module.exports = router;
