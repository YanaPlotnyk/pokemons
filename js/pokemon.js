//------- Constants -------------------------------

//Hostname of REST API server
var HOST_NAME = "http://pokeapi.co";

//Min length of string pokemon id presantation
var MIN_ID_LENGTH = 3;

//------- Global variables-------------------------

// URI for getting next pokemon records
var nextRecordsURI;
// Shows current checked pokemon types in filter
var filterCheckedTypes = [];

//------------- Functions -------------------------

/**
 * Displays pokemons on the page
 * @param pokemons pokemon list that should be added to the page
 */
function appendPokemonsToPage(pokemons){
	// Iterate through pokemon list and compute
	// pokemon div view for each pokemon object
	for(i=0; i < pokemons.length; i++) {
		var infoPokemon = "<div class='pokemon' id='" + pokemons[i].national_id + "'>";
		infoPokemon += "<img class='img-pokemon' src='" + HOST_NAME + "/media/img/";
		infoPokemon += pokemons[i].national_id;
		infoPokemon += ".png'/>";
		infoPokemon += "<p class='name-pokemon'>";
		infoPokemon += pokemons[i].name;
		infoPokemon += "</p>";

		// Iterate through pokemon types and
		// add corresponding type classes
		for(j=0; j < pokemons[i].types.length; j++){
			infoPokemon += "<div class='default-type ";
			switch (pokemons[i].types[j].name) {
				case 'normal':
					infoPokemon += "normal-type'>";
					break;
				case 'fighting':
					infoPokemon += "fighting-type'>";
					break;
				case 'flying':
					infoPokemon += "flying-type'>";
					break;
				case 'poison':
					infoPokemon += "poison-type'>";
					break;
				case 'ground':
					infoPokemon += "ground-type'>";
					break;
				case 'rock':
					infoPokemon += "rock-type'>";
					break;
				case 'bug':
					infoPokemon += "bug-type'>";
					break;
				case 'ghost':
					infoPokemon += "ghost-type'>";
					break;
				case 'steel':
					infoPokemon += "steel-type'>";
					break;
				case 'fire':
					infoPokemon += "fire-type'>";
					break;
				case 'water':
					infoPokemon += "water-type'>";
					break;
				case 'grass':
					infoPokemon += "grass-type'>";
					break;
				case 'electric':
					infoPokemon += "electric-type'>";
					break;
				case 'ice':
					infoPokemon += "ice-type'>";
					break;
				case 'dragon':
					infoPokemon += "dragon-type'>";
					break;
				case 'dark':
					infoPokemon += "dark-type'>";
					break;
				case 'fairy':
					infoPokemon += "fairy-type'>";
					break;
				case 'shadow':
					infoPokemon += "shadow-type'>";
					break;
				case 'psychic':
					infoPokemon += "psychic-type'>";
					break;
				case 'unknown':
					infoPokemon += "unknown-type'>";
					break;
				default:
					infoPokemon += "'>";
			}
			infoPokemon += pokemons[i].types[j].name;
			infoPokemon += "</div>";
		}
		infoPokemon += "</div>";
		$("#all-pokemons").append(infoPokemon);
	}
}

/**
 * Get list of pokemons from server and display
 * them on the page
 * @param url REST API url for getting list of pokemons
 */
function getPokemons(url){
	$.ajax({url: url, dataType: "json", success: function(data){
		var pokemons = data.objects;
		nextRecordsURI = data.meta.next;
		appendPokemonsToPage(pokemons);
		filterPokemons();
	}});
}

/**
 * Displays pokemon details
 * @param pokemon pokemon details
 */
function showPokemonDetails(pokemon) {
	// Check if detailed pokemon view exists
	// then remove it
	if($("div").is("#single-pokemon")){
		$("#single-pokemon").remove()
	}

	//Compute detailed pokemon div view
	var infoPokemonById = "<div id='single-pokemon'>";
	infoPokemonById += "<img class='img-single-pokemon' src='" + HOST_NAME + "/media/img/";
	infoPokemonById += pokemon.national_id;
	infoPokemonById += ".png'/>";
	infoPokemonById += "<p class='name-pokemon'>";
	infoPokemonById += pokemon.name + " #" + addPadding(pokemon.national_id);
	infoPokemonById += "</p>";
	infoPokemonById += "<table class='skills-pokemon'>";

	infoPokemonById += "<tr>";
	infoPokemonById += "<td>Type</td>";
	infoPokemonById += "<td>";
	for(i=0; i<pokemon.types.length; i++){
		infoPokemonById += "<p>";
		infoPokemonById += pokemon.types[i].name;
		infoPokemonById += "</p>";
	}
	infoPokemonById += "</td>";
	infoPokemonById +="</tr>";

	infoPokemonById += "<tr>";
	infoPokemonById += "<td>Attack</td>";
	infoPokemonById += "<td>" + pokemon.attack + "</td>";
	infoPokemonById +="</tr>";

	infoPokemonById += "<tr>";
	infoPokemonById += "<td>Defense</td>";
	infoPokemonById += "<td>" + pokemon.defense + "</td>";
	infoPokemonById +="</tr>";

	infoPokemonById += "<tr>";
	infoPokemonById += "<td>HP</td>";
	infoPokemonById += "<td>" + pokemon.hp + "</td>";
	infoPokemonById +="</tr>";

	infoPokemonById += "<tr>";
	infoPokemonById += "<td>SP attack</td>";
	infoPokemonById += "<td>" + pokemon.sp_atk + "</td>";
	infoPokemonById +="</tr>";

	infoPokemonById += "<tr>";
	infoPokemonById += "<td>SP defense</td>";
	infoPokemonById += "<td>" + pokemon.sp_def + "</td>";
	infoPokemonById +="</tr>";

	infoPokemonById += "<tr>";
	infoPokemonById += "<td>Speed</td>";
	infoPokemonById += "<td>" + pokemon.speed + "</td>";
	infoPokemonById +="</tr>";

	infoPokemonById += "<tr>";
	infoPokemonById += "<td>Weight</td>";
	infoPokemonById += "<td>" + pokemon.weight + "</td>";
	infoPokemonById +="</tr>";

	infoPokemonById += "<tr>";
	infoPokemonById += "<td>Total moves</td>";
	infoPokemonById += "<td>" + pokemon.moves.length + "</td>";
	infoPokemonById +="</tr>";

	infoPokemonById += "</table>";
	infoPokemonById += "</div>";
	$("#right").append(infoPokemonById);
}

/**
 * Get detailed pokemon from server
 * and display it on the page
 * @param id pokemon id
 */
function getPokemonById(id){
	$.ajax({url: HOST_NAME + "/api/v1/pokemon/" + id + "/", dataType: "json", success: function(data){
		var pokemon;
		pokemon = data;
		showPokemonDetails(pokemon);
	}});
}

/**
 * Shows only pokemons that
 * meet all filter checked types
 */
function filterPokemons(){
	//Iterates through each pokemon div view and checks
	// its type classes against filter
	$(".pokemon").each(function(i, obj) {
		var visibility = true;
		for(k=0; k<filterCheckedTypes.length; k++){
			if($(this).children("."+filterCheckedTypes[k]).length == 0){
				visibility = false;
				break;
			}
		}
		if (visibility) {
			$(obj).show();
		} else {
			$(obj).hide();
		}
	});
}

/**
 * Converts number to string and adds left
 * padding with zeros to have min length
 * @param number number to convert to string
 * @returns {string|*} converted string with paddings
 */
function addPadding (number) {
	number = number.toString();
	return number.length < MIN_ID_LENGTH ? addPadding("0" + number, MIN_ID_LENGTH) : number;
}

//-------- Events ------------------------------------

// Click event for pokemon div views
// to show detailed pokemon view
$(document).on("click", ".pokemon", function() {
	var id = $(this).attr("id");
	getPokemonById(id);
});

// Click event for filter checkboxes to filter
// visible pokemon div views
$(document).on("click", ".filter-checkbox", function() {
	// Get classes for next tag after current checkbox
	var classes = $(this).next().attr("class");
	//Converts classes string to array and get second element
	var typeClass = classes.split(" ")[1];
	//Update filter checked types
	if ($(this).is(':checked')) {
		filterCheckedTypes.push(typeClass);
	} else{
		for(var i in filterCheckedTypes){
			if(filterCheckedTypes[i] == typeClass){
				filterCheckedTypes.splice(i,1);
				break;
			}
		}
	}
	// Filter visible pokemons according
	// to filter checked types
	filterPokemons();
});

$(document).ready(function(){
	// Click event for button "Load more" to
	// show more pokemons
	$("#load-more").click(function(){
		getPokemons(HOST_NAME + nextRecordsURI);
	});
	

	// Click event for button "Clear filter"
	// to reset all filter options
	$("#clear-filter").click(function(){
		$(".filter-checkbox").each(function(i, obj) {
			$(this).prop('checked', false)
		});
		filterCheckedTypes = [];
		filterPokemons();
	});
});
/**
 * Show loading gif on the page
 * while sending ajax request
 */
$(document).ajaxStart(function () {
	$("#loading").show();
}).ajaxStop(function () {
	$("#loading").hide();
});

//Shows first 12 pokemons
getPokemons(HOST_NAME + "/api/v1/pokemon/?limit=12&offset=0");