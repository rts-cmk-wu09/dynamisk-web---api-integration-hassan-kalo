import { createHTMLTag, searchHandler } from './functions.js';

export let allDataArr, dataCount, currentPage = 1, offSet = 0, limit = 20
const wrapper = createHTMLTag({ tag: 'div', className: ['wrapper'], parent: document.body });
export const searchInput = createHTMLTag({ tag: 'input', className: ['search-input'], type: 'search', event: 'keyup', func: searchHandler, parent: wrapper })
export const nextPrevContainer = createHTMLTag({ tag: 'div', className: ['nextPrevContainer'], parent: wrapper })
export const digitsContainer = createHTMLTag({ tag: 'div', className: ['digitsContainer'], parent: wrapper })
const prevButton = createHTMLTag({ tag: 'button', className: ['prevBtn'], id: 'prevBtn', text: "❮", event: 'click', func: pagination, parent: nextPrevContainer })
const nextButton = createHTMLTag({ tag: 'button', className: ['nextBtn'], id: 'nextBtn', text: "❯", event: 'click', func: pagination, parent: nextPrevContainer })
export const listContainer = createHTMLTag({ tag: 'div', className: ['listContainer'], parent: wrapper })
export const pageNumDiv = createHTMLTag({ tag: 'div', className: ['pageNumDiv'], parent: wrapper })

fetch(`https://pokeapi.co/api/v2/pokemon?limit=1281`)
    .then((response) => response.json())
    .then((data) => {
        allDataArr = data.results;
        dataCount = data.count;
        pageNumDiv.innerText = currentPage;
        for (let i = offSet; i < offSet + limit; i++) {
            const a = createHTMLTag({ tag: 'a', href: '#', text: allDataArr[i].name });
            listContainer.append(a);
        }
        offSet = offSet + limit;
        for (let i = 0; i < Math.ceil(dataCount / limit); i++) {
            const btn = createHTMLTag({ tag: 'button', text: i + 1, className: [`pageNumBtn`, `pageNumBtn${i + 1}`] });
            digitsContainer.append(btn);
            btn.addEventListener("click", pagination);
        }
    });

// return exits the function. break exits the switch
function pagination(e) {
    switch (e.target.id) {
        case 'nextBtn':
            if (currentPage >= Math.ceil(allDataArr.length / limit)) {
                alert('last page');
                return;
            }
            currentPage++;
            offSet += limit;
            break;
        case 'prevBtn':
            if (currentPage <= 1) {
                alert('first page');
                return;
            }
            currentPage--;
            offSet -= limit;
            break;
        default:
            currentPage = parseInt(e.target.innerText);
            offSet = (currentPage - 1) * limit;
            break;
    }

    listContainer.innerHTML = '';
    pageNumDiv.innerText = currentPage;
    document.querySelectorAll('.pageNumBtn').forEach((element) => (element.style.color = 'black'));
    document.querySelector(`.pageNumBtn${currentPage}`).style.color = 'red';

    for (const data of allDataArr.slice(offSet, offSet + limit)) {
        const a = createHTMLTag({ tag: 'a', href: '#', text: data.name });
        listContainer.append(a);
    }
}

