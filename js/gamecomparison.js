
const btnToBattle$$ = document.getElementById('btnToBattleGame');
const divBattle$$ = document.getElementById('divBattleGame');
const inputFighterTwo$$ = document.createElement('input');
inputFighterTwo$$.type = 'text';
inputFighterTwo$$.id = 'selectFighter'; 
const btnToSelectFighter$$ = document.createElement('button');
btnToSelectFighter$$.textContent = 'ENTER';
const divFighterRandom$$ = document.createElement('div');
divFighterRandom$$.classList.add('container-random__fighter');
divBattle$$.appendChild(divFighterRandom$$);
const divFighterSelected$$ = document.createElement('div');
divFighterSelected$$.classList.add('container-selected__fighter');
divBattle$$.appendChild(divFighterSelected$$);
const divResultFight$$ = document.createElement('div');
divResultFight$$.classList.add('container-result');
divBattle$$.appendChild(divResultFight$$);
const btnToResult$$ = document.createElement('button');
btnToResult$$.textContent = 'COMPARAR';
let totalStatsRandom = 0;
let totalStatsSelected = 0;
let pokemonOne;
let pokemonTwo;
//crear el randomFigther
async function randomFetchApi() {
    //divBattle$$.innerHTML = '';
    let url = baseUrl + (Math.floor(Math.random() * 151) + 1);
    const response = await fetch(url);
    const result = await response.json();
    getInfoFighterOne(result);
    console.log(result);
}
btnToBattle$$.addEventListener('click', randomFetchApi);

function getInfoFighterOne(result) {
    totalStatsRandom = 0;
    let statsOne = [];
    for (let i = 0; i < result.stats.length; i++) {
        statsOne.push(result.stats[i].base_stat);
        totalStatsRandom += result.stats[i].base_stat;
    }
    pokemonOne = {
        name: result.name,
        imageFront: result.sprites['front_default'],
        hp: statsOne[0],
        attack: statsOne[1],
        defense: statsOne[2],
        special_attack: statsOne[3],
        special_defense: statsOne[4],
        speed: statsOne[5]
    };
    console.log(pokemonOne);
    drawRandomFighter(pokemonOne);
}

function drawRandomFighter(pokemonOne) {
    divFighterRandom$$.innerHTML = '';
    divFighterSelected$$.innerHTML = '';
    divResultFight$$.innerHTML = '';
    //creo h2 para insertarlo en divFighterRandom$$
    const h2RandomFighter$$ = document.createElement('h2');
    h2RandomFighter$$.textContent = pokemonOne.name;
    h2RandomFighter$$.textContent = h2RandomFighter$$.textContent.charAt(0).toUpperCase() + h2RandomFighter$$.textContent.slice(1);
    divFighterRandom$$.appendChild(h2RandomFighter$$);
    //creo img para meterla en divFighterRandom$$
    const imgRandomFighter$$ = document.createElement('img');
    imgRandomFighter$$.src = pokemonOne.imageFront;
    divFighterRandom$$.appendChild(imgRandomFighter$$);
    //creo ul y sus li para stats
    const ulRandomFighter$$ = document.createElement('ul');
    const liHpRandom$$ = document.createElement('li');
    liHpRandom$$.textContent = `HP: ${pokemonOne.hp}`;
    const liAttackRandom$$ = document.createElement('li');
    liAttackRandom$$.textContent = `Ataque: ${pokemonOne.attack}`;
    const liDefenseRandom$$ = document.createElement('li');
    liDefenseRandom$$.textContent = `Defensa: ${pokemonOne.defense}`;
    const liSpecialAttackRandom$$ = document.createElement('li');
    liSpecialAttackRandom$$.textContent = `At. Especial: ${pokemonOne.special_attack}`;
    const liSpecialDefenseRandom$$ = document.createElement('li');
    liSpecialDefenseRandom$$.textContent = `Df. Especial: ${pokemonOne.special_defense}`;
    const liSpeedRandom$$ = document.createElement('li');
    liSpeedRandom$$.textContent = `Velocidad: ${pokemonOne.speed}`;
    //agrego los li a la ul
    ulRandomFighter$$.appendChild(liHpRandom$$);
    ulRandomFighter$$.appendChild(liAttackRandom$$);
    ulRandomFighter$$.appendChild(liDefenseRandom$$);
    ulRandomFighter$$.appendChild(liSpecialAttackRandom$$);
    ulRandomFighter$$.appendChild(liSpecialDefenseRandom$$);
    ulRandomFighter$$.appendChild(liSpeedRandom$$);
    //agrego la ul a divFighterRandom$$
    divFighterRandom$$.appendChild(ulRandomFighter$$);
    divFighterSelected$$.appendChild(inputFighterTwo$$);
    divFighterSelected$$.appendChild(btnToSelectFighter$$);
}
//crear el selectFighter
async function selectFighter() {
    let url = baseUrl + inputFighterTwo$$.value;
    const response = await fetch(url);
    const result = await response.json();
    getInfoFighterTwo(result);
}
btnToSelectFighter$$.addEventListener('click', selectFighter);

function getInfoFighterTwo(result) {
    totalStatsSelected = 0;
    let statsTwo = [];
    for (let i = 0; i < result.stats.length; i++) {
        statsTwo.push(result.stats[i].base_stat);
        totalStatsSelected += result.stats[i].base_stat;
    }
    pokemonTwo = {
        name: result.name,
        imageFront: result.sprites['front_default'],
        hp: statsTwo[0],
        attack: statsTwo[1],
        defense: statsTwo[2],
        special_attack: statsTwo[3],
        special_defense: statsTwo[4],
        speed: statsTwo[5]
    };
    console.log(pokemonTwo);
    drawSelectFighter(pokemonTwo);
}

function drawSelectFighter(pokemonTwo) {
    divFighterSelected$$.innerHTML = '';
    divResultFight$$.innerHTML = '';
    //creo h2 para insertarlo en divFighterSelect$$
    const h2SelectFighter$$ = document.createElement('h2');
    h2SelectFighter$$.textContent = pokemonTwo.name;
    h2SelectFighter$$.textContent = h2SelectFighter$$.textContent.charAt(0).toUpperCase() + h2SelectFighter$$.textContent.slice(1);
    divFighterSelected$$.appendChild(h2SelectFighter$$);
    //creo img para meterla en divFighterSelect$$
    const imgSelectFighter$$ = document.createElement('img');
    imgSelectFighter$$.src = pokemonTwo.imageFront;
    divFighterSelected$$.appendChild(imgSelectFighter$$);
    //creo ul y sus li para stats
    const ulSelectFighter$$ = document.createElement('ul');
    const liHpSelect$$ = document.createElement('li');
    liHpSelect$$.textContent = `HP: ${pokemonTwo.hp}`;
    const liAttackSelect$$ = document.createElement('li');
    liAttackSelect$$.textContent = `Ataque: ${pokemonTwo.attack}`;
    const liDefenseSelect$$ = document.createElement('li');
    liDefenseSelect$$.textContent = `Defensa: ${pokemonTwo.defense}`;
    const liSpecialAttackSelect$$ = document.createElement('li');
    liSpecialAttackSelect$$.textContent = `At. Especial: ${pokemonTwo.special_attack}`;
    const liSpecialDefenseSelect$$ = document.createElement('li');
    liSpecialDefenseSelect$$.textContent = `Df. Especial: ${pokemonTwo.special_defense}`;
    const liSpeedSelect$$ = document.createElement('li');
    liSpeedSelect$$.textContent = `Velocidad: ${pokemonTwo.speed}`;
    //agrego los li a la ul
    ulSelectFighter$$.appendChild(liHpSelect$$);
    ulSelectFighter$$.appendChild(liAttackSelect$$);
    ulSelectFighter$$.appendChild(liDefenseSelect$$);
    ulSelectFighter$$.appendChild(liSpecialAttackSelect$$);
    ulSelectFighter$$.appendChild(liSpecialDefenseSelect$$);
    ulSelectFighter$$.appendChild(liSpeedSelect$$);
    //agrego la ul a divFighterRandom$$
    divFighterSelected$$.appendChild(ulSelectFighter$$);
    //agrego el boton de comparacion
    divResultFight$$.appendChild(btnToResult$$);
    inputFighterTwo$$.value = '';
}

btnToResult$$.addEventListener('click', drawResults);

function drawResults() {
    console.log(totalStatsRandom + ' y ' + totalStatsSelected);
    divResultFight$$.innerHTML = '';
    const divWinner$$ = document.createElement('div');
    const pWinner$$ = document.createElement('p');
    pWinner$$.textContent = 'Ganador';
    const h2Winner$$ = document.createElement('h2');
    const imageWinner$$ = document.createElement('img');
    if (totalStatsRandom > totalStatsSelected) {
        h2Winner$$.textContent = pokemonOne.name;
        h2Winner$$.textContent = h2Winner$$.textContent.charAt(0).toUpperCase() + h2Winner$$.textContent.slice(1);
        imageWinner$$.src = pokemonOne.imageFront;
    } else if (totalStatsRandom < totalStatsSelected) { 
        h2Winner$$.textContent = pokemonTwo.name;
        h2Winner$$.textContent = h2Winner$$.textContent.charAt(0).toUpperCase() + h2Winner$$.textContent.slice(1);
        imageWinner$$.src = pokemonTwo.imageFront;
    } else {
        pWinner$$.textContent = '';
        h2Winner$$.textContent = 'Empate, que batala tan igualada';
        imageWinner$$.src = './assets/imagen-error.png';
        imageWinner$$.classList.add('empate');
    }
    divWinner$$.appendChild(pWinner$$);
    divWinner$$.appendChild(imageWinner$$);
    divWinner$$.appendChild(h2Winner$$);
    divResultFight$$.appendChild(divWinner$$);
}