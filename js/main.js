const div$$ = document.querySelector('#container');
const ol$$ = document.getElementById('pokedex');
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
const numberOfPokemon = 151;

async function pokedex() {

    for (let i = 0; i < numberOfPokemon; i++) {
        const url = baseUrl + (i + 1);

        try {
            const response = await fetch(url);
            const result = await response.json();
            pokemonData(result);
        } catch (error) {
            console.error(error);
        }
    }
}

function pokemonData(result) {
    const pokemon = {
        name: result.name,
        image: result.sprites['front_default'],
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

    // Separar en funciones
    const img = document.createElement('img');
    img.src = pokemon.image;

    const h2 = document.createElement('h2');
    h2.textContent = pokemon.name;

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
        liAbilities.textContent = `Habilidad: ${ability}`;
        ul.appendChild(liAbilities);
    });

    const liWeight = document.createElement('li');
    liWeight.textContent = `Peso: ${pokemon.weight} Kg`;
    ul.appendChild(liWeight);

    // Agregar elementos al contenedor ol$$
    ol$$.appendChild(img);
    ol$$.appendChild(h2);
    ol$$.appendChild(ul);
}

pokedex();

