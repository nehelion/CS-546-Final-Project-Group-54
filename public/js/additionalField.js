function addGenre() {
  let currentList = document.getElementById("genreList");
  //line below doesnt work properly if split into multiple lines, same for rest
  currentList.innerHTML += '<li><label class="label" for="genre">Genre: <select id="genre" name="genre"><option value="Action">Action</option><option value="Comedy">Comedy</option><option value="Drama">Drama</option><option value="Horror">Horror</option><option value="Scifi">Sci/Fi</option><option value="Romance">Romance</option></select></label></li>';
}

function addActors() {
  let currentList = document.getElementById("actorsList");
  currentList.innerHTML += '<li><label class="label" for="actors">Actors:<input type="text" id="actors" name="actors" /></label></li>';
}

function addDirectors() {
  let currentList = document.getElementById("directorsList");
  currentList.innerHTML += '<li><label class="label" for="directors">Directors:<input type="text" id="directors" name="directors" /></label></li>';
}

function addWhereToWatch() {
  let currentList = document.getElementById("whereToWatchList");
  currentList.innerHTML += '<li><label class="label" for="whereToWatch">Where To Watch:<input type="text" id="whereToWatch" name="whereToWatch" /></label></li>';
}
