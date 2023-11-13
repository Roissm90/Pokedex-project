const btnShowAll$$ = document.getElementById('showAll');
const mainAll$$ = document.getElementById('mainAll');
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
const numberOfPokemon = 151;

btnShowAll$$.addEventListener('click', fecthApi);

async function fecthApi() {
    mainAll$$.innerHTML = '';
    for (let i = 0; i < numberOfPokemon; i++) {
        let url = baseUrl + (i + 1);
        const response = await fetch(url);
        const result = await response.json();
        getInfo(result);
        console.log(result);
    }
}

function getInfo(result) {
    const pokemon = {
        name: result.name,
        id: result.id,
        image: result.sprites['front_default'],
        type: result.types.map(function (type) {
            return type.type.name;
        }),
    }
    drawCards(pokemon);
}

function drawCards(pokemon) {
    //creo cada div que contiene a cada pokemon
    const eachCard$$ = document.createElement('div');
    eachCard$$.classList.add('each-card');
    mainAll$$.appendChild(eachCard$$);
    //creo la imagen que aparecerá del pokemon correspondiente
    const image$$ = document.createElement('img');
    image$$.classList.add('each-image');
    image$$.src = pokemon.image;
    eachCard$$.appendChild(image$$);
    //creo el div oculto que aparecerá cuando :hover
    const eachHidden$$ = document.createElement('div');
    eachHidden$$.classList.add('hidden-info');
    eachCard$$.appendChild(eachHidden$$);
    //creo el contenido del div oculto
    const eachName$$ = document.createElement('h2');
    eachName$$.textContent = pokemon.name;
    eachName$$.textContent = eachName$$.textContent.charAt(0).toUpperCase() + eachName$$.textContent.slice(1);
    eachHidden$$.appendChild(eachName$$);
    const eachId$$ = document.createElement('p');
    if (pokemon.id < 10) {
        eachId$$.textContent = `#00${pokemon.id}`;
    } else if (pokemon.id < 100) {
        eachId$$.textContent = `#0${pokemon.id}`;
    } else {
        eachId$$.textContent = `#${pokemon.id}`;
    }
    eachHidden$$.appendChild(eachId$$);
    const eachType$$ = document.createElement('ul');
    for (const type of pokemon.type) {
        const liType$$ = document.createElement('li');
        liType$$.textContent = type;
        liType$$.textContent = liType$$.textContent.charAt(0).toUpperCase() + liType$$.textContent.slice(1);
        eachType$$.appendChild(liType$$);
    }
    eachHidden$$.appendChild(eachType$$);
    console.log(eachCard$$);
}