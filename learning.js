/* 
Pokemon api - ekstraopgave 2 - mulighed for at søge

Tilføj et søgefelt til index siden, så man ikke skal bladre hen til sin favorit-pokemon. Det kan være du skal bruge et url-parameter til at få fat i søgeresultatet..? 
*/

const wrapper = document.createElement("div");
wrapper.classList.add("wrapper");
document.body.append(wrapper);
const listContainer = document.createElement("div");
listContainer.classList = "listContainer";
const searchInput = document.createElement('input')
searchInput.type = 'search'
searchInput.classList = 'search-input'
const nextPrevContainer = document.createElement("div");
const nextBtn = document.createElement("button");
const prevBtn = document.createElement("button");
const aPrev = document.createElement("a");
const aNext = document.createElement("a");
aPrev.innerText = "❮";
aNext.innerText = "❯";
prevBtn.append(aPrev);
nextBtn.append(aNext);
nextPrevContainer.append(prevBtn, nextBtn);
const pageDiv = document.createElement('div')
wrapper.append(searchInput,nextPrevContainer, listContainer,pageDiv);
prevBtn.addEventListener("click", prevBtnHandler);
nextBtn.addEventListener("click", nextBtnHandler);

let dataNext;
let dataPrev;
let totalNumOfpages
let currentPage
fetch("https://pokeapi.co/api/v2/pokemon")
  .then((response) => response.json())
  .then((data) => {
    console.log('data', data)
    console.log('dataResultInit', data.results)
    totalNumOfpages = data.count
    currentPage = 1
    data.results.forEach((element) => {
      const a = document.createElement("a");
      a.innerText = element.name;
      a.href = "destination.html?name=" + element.name;
      a.dataset.api = element.url;
      listContainer.append(a);

      dataNext = data.next;
      dataPrev = data.previous;
    });
    
    pageDiv.innerText = currentPage + ' ud af 65'
  })
  .catch((error) => console.error(error));
//offset=20  20انطلق من
// href="https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"

function nextBtnHandler() {
  

  // `https://pokeapi.co/api/v2/pokemon?offset=${x}&limit=20`
  if(dataNext==null){
    console.log('last page')
  }else{
    currentPage++
    pageDiv.innerText = currentPage  + ' ud af 65'
    //pageDiv.innerText = currentPage
    fetch(dataNext)
    .then((response) => response.json())
    .then((data) => {
      console.log('dataNext', data.results)
      dataNext = data.next;
      dataPrev = data.previous;
      listContainer.innerHTML = "";
      data.results.forEach((element) => {
        const a = document.createElement("a");
        a.innerText = element.name;
        a.href = "destination.html?name=" + element.name;
        a.dataset.api = element.url;
        listContainer.append(a);
      });
    });
  }
  
}

function prevBtnHandler() {
  
  if (dataPrev == null) {
    console.log("first pageeeeeeeeè");
  } else {
    currentPage--
    pageDiv.innerText = currentPage + ' ud af 65'
    fetch(dataPrev)
      .then((response) => response.json())
      .then((data) => {
      dataNext = data.next;
      dataPrev = data.previous;
        listContainer.innerHTML = "";
        data.results.forEach((element) => {
          const a = document.createElement("a");
          a.innerText = element.name;
          a.href = "destination.html?name=" + element.name;
          a.dataset.api = element.url;
          listContainer.append(a);
        });
      });
  }
}


let allDataArr
searchInput.addEventListener('keyup', searchHandler)
fetch(`https://pokeapi.co/api/v2/pokemon?limit=1281`)
    .then((response) => response.json())
    .then(data => {
      allDataArr = data.results
    });

function searchHandler(){
  const filteredDataArr = allDataArr.filter(pokemon => pokemon.name.startsWith(searchInput.value));
  filteredDataArr.forEach(element =>{
    console.log(element)
    
  })
    console.log('---------------------')
}

//////////////////////////////////////////////
/* 
const searchPokemon = async (pokemonName) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  if (!response.ok) {
    throw new Error(`Could not fetch data for ${pokemonName}`);
  }
  const data = await response.json();
  return data;
};

// Example usage
searchPokemon("a")
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
 */
//////////////////////////////////////////////
/* 
const searchPokemonByName = (name) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon?limit=1281`)
    .then((response) => response.json())
    .then(data => {
      const filteredData = data.results.filter(pokemon => pokemon.name.startsWith(name));
      return filteredData
    });
};
// Example usage
searchPokemonByName("p")
  .then(filteredData => {
    //console.log('------------------------',data);
    console.log("filteredData",filteredData)
  })
  .catch(error => {
    console.error(error);
});
 */
/////////////////////////////////////////////

//////////////////////////////////////////////