//https://pokeapi.co/api/v2/move/{id or name}/ power
//https://pokeapi.co/api/v2/evolution-chain/{id}/ evolucion
/*
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

async function fecthApi(id){
    let url = baseUrl + id;
    const response = await fetch(url);
    const result = await response.json();
}

let gameCards = [];
for (let i = 0; i < 3; i++) {
    //crear numero aleatorio entre 1 y 151
    let randomId = Math.floor(Math.random() * 152);
    //counsultar si existe
    if (!gameCards.includes(randomId)) {
        gameCards.push(randomId)
    } else {
        i--;
    }
    //meterlo en el array
}
//hacer un map a gameCards con fetch dentro
let cards = gameCards.map(function (x) {
    return fecthApi(x);
});
console.log(gameCards);
console.log(cards);
*/

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
const btnToGuess$$ = document.getElementById('btnToGuessGame');
const divGuess$$ = document.getElementById('divGuessGame');

async function randomFetchApi() {
    let url = baseUrl + (Math.floor(Math.random() * 151) + 1);
    const response = await fetch(url);
    const result = await response.json();
    getInfoGuess(result);
}

btnToGuess$$.addEventListener('click', randomFetchApi);

function getInfoGuess(result) {
    const pokemon = {
        namePokemon: result.name,
        imageFront: result.sprites['front_default'],
        type: result.types.map(function (type) {
            return type.type.name;
        }),
        id: result.id,
        weight: result.weight
    };
    drawPkmnToGuess(pokemon);
    console.log(pokemon);
}

function drawPkmnToGuess(pokemon) {
    divGuess$$.innerHTML = '';
    //creo el container de pistas y sus pistas
    const divClues$$ = document.createElement('div');
    divClues$$.classList.add('container-clues');
    const pClueOne$$ = document.createElement('p');
    pClueOne$$.classList.add('p-clue');
    pClueOne$$.textContent = `Pista 1: su peso es ${pokemon.weight / 10} Kg`;
    divClues$$.appendChild(pClueOne$$);
    const pClueTwo$$ = document.createElement('p');
    pClueTwo$$.classList.add('p-clue');
    pClueTwo$$.textContent = `Pista 2: su Nº en la Pokédex es ${pokemon.id}`;
    divClues$$.appendChild(pClueTwo$$);
    const pClueThree$$ = document.createElement('p');
    pClueThree$$.classList.add('p-clue');
    pClueThree$$.textContent = `Pista 3: su tipo es ${pokemon.type}`;
    divClues$$.appendChild(pClueThree$$);                  
    divGuess$$.appendChild(divClues$$);
    //creo el contenedor del input de la respuesta
    const divAnswer$$ = document.createElement('div');
    divAnswer$$.classList.add('container-input__answer');
    const inputAnswer$$ = document.createElement('input');
    inputAnswer$$.type = 'text';
    inputAnswer$$.id = 'introAnswer';
    divAnswer$$.appendChild(inputAnswer$$);
    divGuess$$.appendChild(divAnswer$$);
    const btnToFindOut$$ = document.createElement('button');
    btnToFindOut$$.textContent = 'ENTER';
    divAnswer$$.appendChild(btnToFindOut$$);
    //creo el contenedor de la tarjeta adivinada
    const divGuessed$$ = document.createElement('div');
    divGuessed$$.classList.add('container-guessed');

    btnToFindOut$$.addEventListener('click', function() {
        if (inputAnswer$$.value === pokemon.namePokemon) {
            divGuessed$$.innerHTML = '';
            const imgGuessed$$ = document.createElement('img');
            imgGuessed$$.src = pokemon.imageFront;
            divGuessed$$.appendChild(imgGuessed$$);

            const h2Guessed$$ = document.createElement('h2');
            h2Guessed$$.textContent = pokemon.namePokemon;
            h2Guessed$$.textContent = h2Guessed$$.textContent.charAt(0).toUpperCase() + h2Guessed$$.textContent.slice(1);
            divGuessed$$.appendChild(h2Guessed$$);
        } else {
            divGuessed$$.innerHTML = '';
            const h2Guessed$$ = document.createElement('h2');
            h2Guessed$$.textContent = 'No, prueba otra vez';
            divGuessed$$.appendChild(h2Guessed$$);
        }
        console.log(divGuessed$$);
    });
    divGuess$$.appendChild(divGuessed$$);
}