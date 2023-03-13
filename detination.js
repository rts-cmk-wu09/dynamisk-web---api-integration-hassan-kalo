const wrapper = document.createElement("div");
wrapper.classList.add("wrapper");
document.body.append(wrapper);


const nextPrevContainer = document.createElement('div')
const nextBtn = document.createElement('button')
nextBtn.innerText = '⟨'
//nextBtn.addEventListener('click',nextBtnHandler)
const prevBtn = document.createElement('button') 
prevBtn.innerText = '⟩'
//prevBtn.addEventListener('click',prevBtnHandler)
nextPrevContainer.append(prevBtn,nextBtn)
wrapper.append(nextPrevContainer)



const urlParams = new URLSearchParams(window.location.search);
const urlParam_name = urlParams.get("name");

fetch(`https://pokeapi.co/api/v2/pokemon/${urlParam_name}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    const h3 = document.createElement('h3')
    h3.innerText = data.name
    wrapper.append(h3)

    data.abilities.forEach((element)=>{
      const p = document.createElement('p')
      p.innerText = 'ability: ' + element.ability.name
      wrapper.append(p)
    })
    
  });
