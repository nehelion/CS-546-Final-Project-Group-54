function addGenre() {
  let currentList = document.getElementById("genreList");
	var originalElement = currentList.getElementsByTagName('li');
	var tmpValues = new Array();
	
	for(var i = 0; i < originalElement.length; i++) {
		tmpValues[i] = originalElement[i].getElementsByTagName('select')[0].value;
	}
	
  currentList.innerHTML +=
		'<li><label class="label" for="genre">' +
		'<select class="addmovie_genre" id="genre" name="genre">' +
		'<option value="Action">Action</option>' + 
		'<option value="Comedy">Comedy</option>' + 
		'<option value="Drama">Drama</option>' + 
		'<option value="Horror">Horror</option>' + 
		'<option value="Scifi">Sci-Fi</option>' + 
		'<option value="Romance">Romance</option>' + 
		'</select></label></li>';
		
	var newElements = currentList.getElementsByTagName('li');
		
	for(var i = 0; i < tmpValues.length; i++) {
		newElements[i].getElementsByTagName('select')[0].value = tmpValues[i];
	}
}

function addActors() {
  let currentList = document.getElementById("actorsList");
	var originalElement = currentList.getElementsByTagName('li');
	var tmpValues = new Array();
	
	for(var i = 0; i < originalElement.length; i++) {
		tmpValues[i] = originalElement[i].getElementsByTagName('input')[0].value;
	}
	
  currentList.innerHTML += 
		'<li><label class="label" for="actors">' +
		'<input type="text" id="actors" name="actors" />' +
		'</label></li>';
		
	var newElements = currentList.getElementsByTagName('li');
		
	for(var i = 0; i < tmpValues.length; i++) {
		newElements[i].getElementsByTagName('input')[0].value = tmpValues[i];
	}
}

function addDirectors() {
  let currentList = document.getElementById("directorsList");
	var originalElement = currentList.getElementsByTagName('li');
	var tmpValues = new Array();
	
	for(var i = 0; i < originalElement.length; i++) {
		tmpValues[i] = originalElement[i].getElementsByTagName('input')[0].value;
	}
	
  currentList.innerHTML += 
		'<li><label class="label" for="directors">' +
		'<input type="text" id="directors" name="directors" />' +
		'</label></li>';
		
	var newElements = currentList.getElementsByTagName('li');
		
	for(var i = 0; i < tmpValues.length; i++) {
		newElements[i].getElementsByTagName('input')[0].value = tmpValues[i];
	}
}

function addWhereToWatch() {
  let currentList = document.getElementById("whereToWatchList");
	var originalElement = currentList.getElementsByTagName('li');
	var tmpValues = new Array();
	
	for(var i = 0; i < originalElement.length; i++) {
		tmpValues[i] = originalElement[i].getElementsByTagName('input')[0].value;
	}
	
  currentList.innerHTML += 
		'<li><label class="label" for="whereToWatch">' +
		'<input type="text" id="whereToWatch" name="whereToWatch" />' +
		'</label></li>';
		
	var newElements = currentList.getElementsByTagName('li');
		
	for(var i = 0; i < tmpValues.length; i++) {
		newElements[i].getElementsByTagName('input')[0].value = tmpValues[i];
	}
}
