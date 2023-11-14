const buttonsType$$ = Array.from(document.getElementById('buttonsType').children);
const pokedexType$$ = document.querySelector('#pokedexType');
const removeTypes$$ = document.querySelector('#btnToRemoveType');
const numberOfPokemon = 151;
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

for (let i = 0; i < buttonsType$$.length; i++) {
    buttonsType$$[i].addEventListener('click', () => {
    const selectedType = buttonsType$$[i].classList;
    pokedexType$$.style.height = '470px';
    pokedexType$$.style.border = '5px solid rgb(203, 0, 0)';
    pokedexType$$.style.borderRadius = '20px';
    pokedexType$$.style.backgroundColor = 'rgb(255, 255, 255)';
    fetchPokemonApi(selectedType);
  });
}

removeTypes$$.addEventListener('click', () => {
    pokedexType$$.innerHTML = '';
    pokedexType$$.style.height = '';
    pokedexType$$.style.border = '';
    pokedexType$$.style.borderRadius = '';
    pokedexType$$.style.backgroundColor = '';
});

async function fetchPokemonApi(selectedType) {
    for (let i = 1; i <= numberOfPokemon; i++) {
        const url = baseUrl + i;
        const response = await fetch(url);
        const result = await response.json();
        if (pokemonMatchesType(result.types, selectedType)) {
            displayPokemon(result);
        }
        console.log(result.types);
    } 
}

function pokemonMatchesType(pokemonTypes, selectedType) {
    for (const type of pokemonTypes) {
        if (selectedType.contains(type.type.name)) {
            return true;
        }
    }
    return false;
}

function displayPokemon(pokemon) {
    //crea el div container-card
    const containerCard = document.createElement('div');
    containerCard.classList.add('container-card');
    containerCard.dataset.aos = 'flip-left';
    //crea contenedor de imagenes
    const containerImages = document.createElement('div');
    containerImages.classList.add('container-images');
    const imgFront = document.createElement('img');
    imgFront.src = pokemon.sprites['front_default'];
    const imgBack = document.createElement('img');
    imgBack.classList.add('img-back');
    containerImages.appendChild(imgFront);
    containerImages.appendChild(imgBack);
    imgBack.src = pokemon.sprites['back_default'];
    //crea nombre del pokemon
    const h2 = document.createElement('h2');
    h2.textContent = pokemon.name;
    h2.textContent = h2.textContent.charAt(0).toUpperCase() + h2.textContent.slice(1);
    //crea ul para datos del pokemon
    const ul = document.createElement('ul');
    //agrega numero del pokemon
    const liNumber = document.createElement('li');
    liNumber.textContent = `Nº: ${pokemon.id}`;
    ul.appendChild(liNumber);
    //agrega tipo/s del pokemon
    for (const type of pokemon.types) {
        const liType = document.createElement('li');
        liType.textContent = `Tipo: ${type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}`;
        ul.appendChild(liType);
      }
    //agrega habilidad/es del pokemon
    for (const ability of pokemon.abilities) {
        const liAbilities = document.createElement('li');
        liAbilities.textContent = `Habilidad: ${ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}`;
        ul.appendChild(liAbilities);
    }  
    //agrega peso del pokemon
    const liWeight = document.createElement('li');
    liWeight.textContent = `Peso: ${pokemon.weight / 10} Kg`;
    ul.appendChild(liWeight);
    //añade todo al container card y este a su vez al dvi pokedexType$$
    containerCard.appendChild(containerImages);
    containerCard.appendChild(h2);
    containerCard.appendChild(ul);
    pokedexType$$.appendChild(containerCard);
}