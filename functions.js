import { allDataArr, searchInput, listContainer, digitsContainer, pageNumDiv, nextPrevContainer } from './index.js';

export function createHTMLTag(options) {
    const x = document.createElement(options.tag);
    if (options.className) { x.classList.add(...options.className) }
    if (options.text) { x.innerText = options.text; }
    if (options.id) { x.id = options.id; }
    if (options.type) { x.type = options.type; }
    if (options.href) { x.href = options.href; }
    if(options.event){x.addEventListener(options.event,options.func)}
    if (options.parent) { options.parent.append(x); }
    return x;
}

export function searchHandler() {
    const filteredDataArr = allDataArr.filter((pokemon) =>
        pokemon.name.startsWith(searchInput.value)
    );

    listContainer.innerHTML = ''
    nextPrevContainer.remove()
    digitsContainer.remove()
    pageNumDiv.remove()
    filteredDataArr.forEach((element) => {
        const a = createHTMLTag({ tag: 'a', href: '#', text: element.name });
        listContainer.append(a);
    });
}