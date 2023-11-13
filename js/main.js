const div$$ = document.querySelector('#containerName');
const divName$$ = document.getElementById('pokedexName');
const inputName = document.querySelector('#searchName');
const inputNumber = document.querySelector('#searchNumber');
const inputType = document.querySelector('#searchType');
const searchName = document.querySelector('#searchNameButton');
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
const numberOfPokemon = 151;

searchName.addEventListener('click', pokedexName);

async function pokedexName(){
    const valueInputName = inputName.value.toLowerCase();
    let url = baseUrl + valueInputName;
    if(valueInputName !== '') {
        try {
            const response = await fetch(url);
            const result = await response.json();
            pokemonDataName(result);
        } catch (error) {
            console.error(error);
        }
    }
}

function pokemonDataName(result) {
    const pokemon = {
        namePokemon: result.name,
        imageFront: result.sprites['front_default'],
        imageBack: result.sprites['back_default'],
        type: result.types.map(function (type) {
            return type.type.name;
        }),
        abilities: result.abilities.map(function (ability) {
            return ability.ability.name;
        }),
        id: result.id,
        weight: result.weight
    };
    console.log(pokemon);
    addElementsPokemonName(pokemon);
}
function addElementsPokemonName(pokemon) {
    //Crear elementos HTML y su contenido
    divName$$.innerHTML = ''; //reiniciar el contenido del div
    const containerImages = document.createElement('div');
    containerImages.classList.add('container-images');
    const imgFront = document.createElement('img');
    imgFront.src = pokemon.imageFront;
    const imgBack = document.createElement('img');
    imgBack.classList.add('img-back');
    containerImages.appendChild(imgFront);
    containerImages.appendChild(imgBack);
    imgBack.src = pokemon.imageBack;
    const h2 = document.createElement('h2');
    h2.textContent = pokemon.namePokemon;
    h2.textContent = h2.textContent.charAt(0).toUpperCase() + h2.textContent.slice(1);
    const ul = document.createElement('ul');
    const liNumber = document.createElement('li');
    liNumber.textContent = `Nº: ${pokemon.id}`;
    ul.appendChild(liNumber);
    pokemon.type.forEach(function (type) {
        const liType = document.createElement('li');
        liType.textContent = `Tipo: ${type.charAt(0).toUpperCase() + type.slice(1)}`;
        ul.appendChild(liType);
    })
    pokemon.abilities.forEach(function (ability) {
        const liAbilities = document.createElement('li');
        liAbilities.textContent = `Habilidad: ${ability.charAt(0).toUpperCase() + ability.slice(1)}`;
        ul.appendChild(liAbilities);
    });
    const liWeight = document.createElement('li');
    liWeight.textContent = `Peso: ${pokemon.weight} Kg`;
    ul.appendChild(liWeight);
    // Agregar elementos al contenedor ol$$
    divName$$.appendChild(containerImages);
    divName$$.appendChild(h2);
    divName$$.appendChild(ul);
}

