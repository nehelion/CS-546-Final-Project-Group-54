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

		await moviesData.clearMovies();
		
		// remove responses in all users
		
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
			"The Dark Knight",
			2008,
			["Action", "Drama"],
			9.0,
			"When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
			["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
			["Christopher Nolan"],
			["HBO Max", "TBS", "TNT"]
		);


		await moviesData.addMovie(
			"Inception",
			2010,
			["Action", "Sci/Fi"],
			8.8,
			"A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
			["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
			["Christopher Nolan"],
			["HBO Max", "Netflix"]
		);


		await moviesData.addMovie(
			"Terminator 2: Judgment Day",
			2009,
			["Action", "Sci/Fi"],
			7.8,
			"A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her ten-year-old son John from a more advanced and powerful cyborg.",
			["Arnold Schwarzenegger", "Linda Hamilton", "Edward Furlong"],
			["James Cameron"],
			["HBO Max"]
		);


		await moviesData.addMovie(
			"Spider-Man: No Way Home",
			2009,
			["Action", "Sci/Fi"],
			8.4,
			"With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.",
			["Tom Holland", "Zendaya", "Benedict Cumberbatch"],
			["Jon Watts"],
			["Prime Video"]
		);

		await moviesData.addMovie(
			"Indiana Jones and the Raiders of the Lost Ark",
			2009,
			["Action"],
			8.4,
			"In 1936, archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before Adolf Hitler's Nazis can obtain its awesome powers.",
			["Harrison Ford", "Karen Allen", "Paul Freeman"],
			["Steven Spielberg"],
			["Paramount+"]
		);

		await moviesData.addMovie(
			"Interstellar",
			2014,
			["Drama", "Sci/Fi"],
			8.6,
			"A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
			["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
			["Christopher Nolan"],
			["Paramount+", "FXNOW"]
		);

		await moviesData.addMovie(
			"Jurassic Park",
			1993,
			["Action", "Sci/Fi"],
			7.8,
			"A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
			["Sam Neill", "Laura Dern", "Jeff Goldblum"],
			["Steven Spielberg"],
			["HBO Max"]
		);

		await moviesData.addMovie(
			"Forrest Gump",
			1994,
			["Drama", "Romance"],
			8.8,
			"The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
			["Tom Hanks", "Robin Wright", "Gary Sinise"],
			["Robert Zemeckis"],
			["Paramount+", "Netflix"]
		);

		await moviesData.addMovie(
			"Casablanca",
			1942,
			["Drama", "Romance"],
			8.5,
			"A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis in French Morocco.",
			["Humphrey Bogart", "Ingrid Bergman", "Paul Henreid"],
			["Michael Curtiz"],
			["HBO Max"]
		);

		await moviesData.addMovie(
			"Good Will Hunting",
			1997,
			["Drama", "Romance"],
			7.8,
			"Will Hunting, a janitor at M.I.T., has a gift for mathematics, but needs help from a psychologist to find direction in his life.",
			["Robin Williams", "Matt Damon", "Ben Affleck"],
			["Gus Van Sant"],
			["HBO Max"]
		);

		await moviesData.addMovie(
			"Breakfast at Tiffany's",
			1961,
			["Comedy", "Drama", "Romance"],
			7.6,
			"A young New York socialite becomes interested in a young man who has moved into her apartment building, but her past threatens to get in the way.",
			["Audrey Hepburn", "George Peppard", "Patricia Neal"],
			["Blake Edwards"],
			["Paramount+"]
		);

		await moviesData.addMovie(
			"The Shining",
			1980,
			["Drama", "Horror"],
			7.8,
			"A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.",
			["Jack Nicholson", "Shelley Duvall", "Danny Lloyd"],
			["Stanley Kubrick"],
			["HBO Max"]
		);

		await moviesData.addMovie(
			"Halloween",
			1978,
			["Horror"],
			7.7,
			"Fifteen years after murdering his sister on Halloween night 1963, Michael Myers escapes from a mental hospital and returns to the small town of Haddonfield, Illinois to kill again.",
			["Donald Pleasence", "Jamie Lee Curtis", "Tony Moran"],
			["John Carpenter"],
			["AMC+"]
		);

		await moviesData.addMovie(
			"Insidious",
			2010,
			["Horror"],
			6.8,
			"A family looks to prevent evil spirits from trapping their comatose child in a realm called The Further.",
			["Patrick Wilson", "Rose Byrne", "Ty Simpkins"],
			["James Wan"],
			["Prime Video"]
		);

		await moviesData.addMovie(
			"A Quiet Place",
			2018,
			["Drama", "Sci/Fi", "Horror"],
			7.5,
			"In a post-apocalyptic world, a family is forced to live in silence while hiding from monsters with ultra-sensitive hearing.",
			["Emily Blunt", "John Krasinski", "Millicent Simmonds"],
			["John Krasinski"],
			["ABC", "FXNOW", "Paramount+"]
		);

		await moviesData.addMovie(
			"Dumb and Dumber",
			1994,
			["Comedy"],
			7.3,
			"After a woman leaves a briefcase at the airport terminal, a dumb limo driver and his dumber friend set out on a hilarious cross-country road trip to Aspen to return it.",
			["Jim Carrey", "Jeff Daniels", "Lauren Holly"],
			["Peter Farrelly"],
			["HBO Max"]
		);

		await moviesData.addMovie(
			"The Hangover",
			2009,
			["Comedy"],
			7.7,
			"Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.",
			["Zach Galifianakis", "Bradley Cooper", "Justin Bartha"],
			["Todd Phillips"],
			["HBO Max"]
		);

		await moviesData.addMovie(
			"Step Brothers",
			2008,
			["Comedy"],
			6.9,
			"Two aimless middle-aged losers still living at home are forced against their will to become roommates when their parents marry.",
			["Will Ferrell", "John C. Reilly", "Mary Steenburgen"],
			["Adam McKay"],
			["NBC", "Peacock", "Bravo Now"]
		);

		await moviesData.addMovie(
			"Groundhog Day",
			1993,
			["Action", "Sci/Fi", "Comedy"],
			8.1,
			"A self-centered Pittsburgh weatherman finds himself inexplicably trapped in a small town as he lives the same day over and over again.",
			["Bill Murray", "Andie MacDowell", "Chris Elliott"],
			["Harold Ramis"],
			["Paramount+", "EPIX"]
		);


		res.redirect('/');
	}
	catch (e) {
		res.status(500);
		res.render('posts/private', { title: "Main Screen", error: e });
	}
});

module.exports = router;