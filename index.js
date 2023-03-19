import { createHTMLTag, searchHandler } from './functions.js';
const navBtnsArr = [];
const limit = 20;
export let allDataArr, activeBtn, dataCount, currentPage = parseInt(localStorage.getItem('currentPage')) || 1, offSet = parseInt(localStorage.getItem('offSet')) || 0;
const wrapper = createHTMLTag({ tag: 'div', className: ['wrapper'], parent: document.body });
export const searchInput = createHTMLTag({ tag: 'input', className: ['search-input'], type: 'search', event: 'keyup', func: searchHandler, parent: wrapper }, {
    fontSize: '20px',
    color: 'blue',
})
export const nextPrevContainer = createHTMLTag({ tag: 'div', className: ['nextPrevContainer'], parent: wrapper })
export const digitsContainer = createHTMLTag({ tag: 'div', className: ['digitsContainer'], parent: wrapper }, {
    whiteSpace: 'nowrap',
    overflowX: 'auto',
    paddingTop: '20px',
    paddingBottom: '20px'
})
const prevButton = createHTMLTag({ tag: 'button', className: ['prevBtn'], id: 'prevBtn', text: "❮", event: 'click', func: pagination, parent: nextPrevContainer })
const nextButton = createHTMLTag({ tag: 'button', className: ['nextBtn'], id: 'nextBtn', text: "❯", event: 'click', func: pagination, parent: nextPrevContainer })
export const listContainer = createHTMLTag({ tag: 'div', className: ['listContainer'], parent: wrapper })
export const pageNumDiv = createHTMLTag({ tag: 'div', className: ['pageNumDiv'], parent: wrapper })


// Check if the data is already saved locally
if (localStorage.getItem('allDataArr')) {
    // If the data is saved locally, use it
    allDataArr = JSON.parse(localStorage.getItem('allDataArr'));
    dataCount = localStorage.getItem('dataCount');
    pagination();
} else {
    // If the data is not saved locally, fetch it
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=1281`)
        .then((response) => response.json())
        .then((data) => {
            allDataArr = data.results;
            dataCount = data.count;
            // Save the data locally
            localStorage.setItem('allDataArr', JSON.stringify(allDataArr));
            localStorage.setItem('dataCount', dataCount);
        })
        .then(()=>pagination())
}

// return exits the function. break exits the switch
function pagination(e) {
    if(e === undefined){
        for (let i = 0; i < Math.ceil(dataCount / limit); i++) {
            const btn = createHTMLTag({ tag: 'button', text: i + 1, className: [`pageNumBtn`, `pageNumBtn${i + 1}`] }, {
                cursor: 'pointer',
                userSelect: 'none'
            });
            digitsContainer.append(btn);
            btn.addEventListener("click", pagination);
            navBtnsArr.push(btn)
        }
        for (let i = offSet; i < offSet + limit; i++) {
            const a = createHTMLTag({ tag: 'a', href: '#', text: allDataArr[i].name }, {
                display: 'block'
            });
            listContainer.append(a);
        }
        pageNumDiv.innerText = currentPage;
        navBtnsArr[currentPage - 1].style.color = 'green'
    }
    else{
        switch (e.target.id) {
            case 'nextBtn':
                if (currentPage >= Math.ceil(allDataArr.length / limit)) {
                    alert('last page');
                    return;
                }
                currentPage++;
                localStorage.setItem('currentPage', currentPage)
                offSet += limit;
                localStorage.setItem('offSet', offSet)
                break;
            case 'prevBtn':
                if (currentPage <= 1) {
                    alert('first page');
                    return;
                }
                currentPage--;
                localStorage.setItem('currentPage', currentPage)
                offSet -= limit;
                localStorage.setItem('offSet', offSet)
                break;
            default:
                currentPage = parseInt(e.target.innerText);
                localStorage.setItem('currentPage', currentPage)
                offSet = (currentPage - 1) * limit;
                localStorage.setItem('offSet', offSet)
                break;
        }
    
        listContainer.innerHTML = '';
        pageNumDiv.innerText = currentPage;
        navBtnsArr.forEach((element) => (element.style.color = 'black'));
        navBtnsArr[currentPage - 1].style.color = 'green'
    
        for (const data of allDataArr.slice(offSet, offSet + limit)) {
            const a = createHTMLTag({ tag: 'a', href: '#', text: data.name }, {
                display: 'block'
            });
            listContainer.append(a);
        }
    }
}

