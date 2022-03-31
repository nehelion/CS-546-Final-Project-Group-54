const path = require('path');
const axios = require('axios');

const constructorMethod = (app) => 
{
	app.get('/', (req, res) => 
	{
		res.render('shows/tvmaze');
	});
	
	app.post('/searchshows', async (req, res) => 
	{
		try 
		{
			data = await getShow(req.body.showSearchTerm);
		
			const slicedArray = data.slice(0, 5);
			
			if((req.body.showSearchTerm).trim() == ""){ raise; }
			
			res.render('shows/searchshows', {shows: slicedArray, showSearchTerm: req.body.showSearchTerm});
		} 
		catch (e) 
		{
			return res.status(400).json({error: e});
		}
	});
	
	app.get('/show/:id', async (req, res) => 
	{
		try 
		{
			htmldata = await getShowHtml(req.params.id);
			res.render('shows/show', {htmlShow: htmldata});
		} 
		catch (e) 
		{
			return res.status(404).json({error: e});
		}
	});
	
	app.use('*', (req, res) => 
	{
		res.status(404).json({ error: 'Not found' });
	});
};

const getShow = async function getShow(name)
{
	const { data } = await axios.get('http://api.tvmaze.com/search/shows?q=' + name);
	return data;
}

const getShowHtml = async function getShowHtml(id)
{
	const { data } = await axios.get('http://api.tvmaze.com/shows/' + id);
	return data;
}

module.exports = constructorMethod;