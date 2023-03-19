import { createHTMLTag } from './functions.js';

const wrapper = createHTMLTag({ tag: 'div', className: ['wrapper'], parent: document.body });
const nextPrevContainer = createHTMLTag({ tag: 'div', className: ['nextPrevContainer'], parent: wrapper });
const cardList = createHTMLTag({ tag: 'div', className: ['cardList'], parent: wrapper });
const prevBtn = createHTMLTag({ tag: 'button', className: ['prevBtn'], parent: nextPrevContainer, text: '⟨' });
const nextBtn = createHTMLTag({ tag: 'button', className: ['nextBtn'], parent: nextPrevContainer, text: '⟩' });

const urlParams = new URLSearchParams(window.location.search);
const urlParam_name = urlParams.get("name");

async function getPokemonData() {
  let data;
  if (localStorage.getItem(urlParam_name)) {
    data = JSON.parse(localStorage.getItem(urlParam_name));
  } else {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${urlParam_name}`);
    data = await response.json();
    localStorage.setItem(urlParam_name, JSON.stringify(data));
  }
  return data;
}

getPokemonData().then((pokemon) => {
  const card = createHTMLTag({ tag: 'div', className: ['card'], parent: cardList });
  const h3 = createHTMLTag({ tag: 'div', className: ['title'], parent: card, text: pokemon.name });

  pokemon.abilities.forEach((element) => {
    const p = createHTMLTag({ tag: 'p', className: ['ability'], parent: card, text: 'ability: ' + element.ability.name });
  })
});

// Another way
/* 
const data = localStorage.getItem(urlParam_name) ? Promise.resolve(JSON.parse(localStorage.getItem(urlParam_name))) :
  fetch(`https://pokeapi.co/api/v2/pokemon/${urlParam_name}`)
    .then((response) => response.json())
    .then((result) => {
      localStorage.setItem(urlParam_name, JSON.stringify(result))
      return result;
    });

data.then((pokemon) => {
  const card = createHTMLTag({ tag: 'div', className: ['card'], parent: cardList });
  const h3 = createHTMLTag({ tag: 'div', className: ['title'], parent: card, text: pokemon.name });

  pokemon.abilities.forEach((element) => {
    const p = createHTMLTag({ tag: 'p', className: ['ability'], parent: card, text: 'ability: ' + element.ability.name });
  })
});

 */