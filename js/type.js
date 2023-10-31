//Buscador de tipos
const buttonsType = Array.from(document.getElementById('buttonsType').children);
const pokedexType$$ = document.querySelector('#pokedexType');
const removeTypes$$ = document.querySelector('#btnToRemoveType');

for (let i = 0; i < buttonsType.length; i++) {
    buttonsType[i].addEventListener('click', () => pokedexType(i));
}

async function pokedexType(index) {
    const matchingPokemon = []; // Crear una lista para los Pokémon que coincidan con el tipo
    for (let i = 0; i < numberOfPokemon; i++) {
        let url = baseUrl + (i + 1);
        try {
            const response = await fetch(url);
            const result = await response.json();
            if (pokemonMatchesType(result.types, buttonsType[index].classList)) {
                matchingPokemon.push(result); // Agregar Pokémon a la lista
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Mostrar detalles de todos los Pokémon que coincidan con el tipo
    matchingPokemon.forEach(function (pokemon) {
        pokemonDataType(pokemon);
    });
    console.log(matchingPokemon);
}

function pokemonDataType(result) {
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
    addElementsPokemonType(pokemon);
}

function pokemonMatchesType(types, typeClassList) {
    return types.some(function (type) {
        return typeClassList.contains(type.type.name);
    });
}

function addElementsPokemonType(pokemon) {
    //Crear elementos HTML y su contenido
    const containerCard = document.createElement('div');
    containerCard.classList.add('container-card')
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
        liType.textContent = `Tipo: ${type}`;
        ul.appendChild(liType);
    })
    pokemon.abilities.forEach(function (ability) {
        const liAbilities = document.createElement('li');
        liAbilities.textContent = '';
        liAbilities.textContent = `Habilidad: ${ability}`;
        ul.appendChild(liAbilities);
    });
    const liWeight = document.createElement('li');
    liWeight.textContent = `Peso: ${pokemon.weight} Kg`;
    ul.appendChild(liWeight);
    // Agregar elementos al contenedor pokedexType$$
    containerCard.appendChild(containerImages);
    containerCard.appendChild(h2);
    containerCard.appendChild(ul);
    pokedexType$$.appendChild(containerCard);
}

removeTypes$$.addEventListener('click', function() {
    pokedexType$$.innerHTML = '';
})