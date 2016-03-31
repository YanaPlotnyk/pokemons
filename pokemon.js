var nextReccords;
var hostName = "http://pokeapi.co";

function getPokemons(url){
	$.ajax({url: url, dataType: "json", success: function(data){
		var arrayPokemons = data.objects;
		nextReccords = data.meta.next;
		showPokemons(arrayPokemons);
		filterPokemons();
	}});
}
getPokemons(hostName + "/api/v1/pokemon/?limit=12&offset=0");


function getPokemonById(id){
	$.ajax({url: hostName + "/api/v1/pokemon/"+id+"/", dataType: "json", success: function(data){
		var pokemon;
		pokemon = data;
	showPokemonById(pokemon);
	}});
}
function typePokemon(typeId) {
	$.ajax({url: hostName + "/api/v1/type/?limit="+typeId, dataType: "json", success: function(data){
		showTypePokemon(data);
	}});
}
$(document).ready(function(){
	$("#btn_load_more").click(function(){
		getPokemons(hostName + nextReccords);
	});
	$("#clear_filter").click(function(){
		$(".checkbox").each(function(i, obj) {
			$(this).prop('checked', false)
			});
		arrayCheckedType = [];
		filterPokemons();
	});
});

$(document).on("click", ".pokemon", function() {
	var id = $(this).attr("id");
	getPokemonById(id);
});

var arrayCheckedType = [];

$(document).on("click", ".checkbox", function() {
	var classes = $(this).next().attr("class");
	var typeClass = classes.split(" ")[1];
	if ($(this).is(':checked')) {
		arrayCheckedType.push(typeClass);
		//alert(arrayCheckedType);
	} else{
		for(var i in arrayCheckedType){
			if(arrayCheckedType[i] == typeClass){
			arrayCheckedType.splice(i,1);
			//alert(arrayCheckedType)
			break;
			}
		}
	}
	//alert(arrayCheckedType.length);
	filterPokemons();
});

function filterPokemons(){
	$(".pokemon").each(function(i, obj) {
		var visibility = true;
		for(k=0; k<arrayCheckedType.length; k++){
			if($(this).children("."+arrayCheckedType[k]).length == 0){
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
function showPokemons(arrayPokemons){
	for(i=0; i<arrayPokemons.length; i++) {
	var infoPokemon = "<div class='pokemon' id='" + arrayPokemons[i].national_id + "'>";
	infoPokemon += "<img class='img_pokemon' src='" + hostName + "/media/img/";
	infoPokemon += arrayPokemons[i].national_id;
	infoPokemon += ".png'/>";
	infoPokemon += "<p class='name_pokemon'>";
	infoPokemon += arrayPokemons[i].name;
	infoPokemon += "</p>";
		for(j=0; j<arrayPokemons[i].types.length; j++){
		infoPokemon += "<div class='default_type ";
		switch (arrayPokemons[i].types[j].name) { 
			case 'normal':
				infoPokemon += "normal_type'>";
				break;
			case 'fighting':
				infoPokemon += "fighting_type'>";
				break;
			case 'flying':
				infoPokemon += "flying_type'>";
				break;
			case 'poison':
				infoPokemon += "poison_type'>";
				break;	
			case 'ground':
				infoPokemon += "ground_type'>";
				break;
			case 'rock':
				infoPokemon += "rock_type'>";
				break;
			case 'bug':
				infoPokemon += "bug_type'>";
				break;
			case 'ghost':
				infoPokemon += "ghost_type'>";
				break;
			case 'steel':
				infoPokemon += "steel_type'>";
				break;
			case 'fire':
				infoPokemon += "fire_type'>";
				break;
			case 'water':
				infoPokemon += "water_type'>";
				break;
			case 'grass':
				infoPokemon += "grass_type'>";
				break;
			case 'electric':
				infoPokemon += "electric_type'>";
				break;
			case 'ice':
				infoPokemon += "ice_type'>";
				break;
			case 'dragon':
				infoPokemon += "dragon_type'>";
				break;
			case 'dark':
				infoPokemon += "dark_type'>";
				break;
			case 'fairy':
				infoPokemon += "fairy_type'>";
				break;
			case 'shadow':
				infoPokemon += "shadow_type'>";
				break;
			case 'psychic':
				infoPokemon += "psychic_type'>";
				break;
			case 'unknown':
				infoPokemon += "unknown_type'>";
				break;
			default:
				infoPokemon += "'>";
		}
			infoPokemon += arrayPokemons[i].types[j].name;
		infoPokemon += "</div>";
		}
		infoPokemon += "</div>";
	$("#all_pokemons").append(infoPokemon);		
	}
}
function pad (str, max) {
	str = str.toString();
	return str.length < max ? pad("0" + str, max) : str;
}

function showPokemonById(pokemon) {
	if($("div").is("#single_pokemon")){
		$("#single_pokemon").remove()
	}
	var infoPokemonById = "<div id='single_pokemon'>";
	infoPokemonById += "<img class='img_single_pokemon' src='" + hostName + "/media/img/";
	infoPokemonById += pokemon.national_id;
	infoPokemonById += ".png'/>";
	infoPokemonById += "<p class='name_pokemon'>";
	infoPokemonById += pokemon.name + " #" + pad(pokemon.national_id, 3);
	infoPokemonById += "</p>";
	infoPokemonById += "<table class='skills_pokemon'>";
	
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