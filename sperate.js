function pagination(e) {
    if (e.target.id === "nextBtn" || e.target.id === "prevBtn") {
        handleNextPrevBtnClick(e.target.id === "prevBtn" ? -1 : 1);
    } else if (e.target.classList.contains("pageNumBtn")) {
        const pageNum = parseInt(e.target.innerText);
        const pageOffset = pageNum - currentPage;
        handlePageNumBtnClick(pageOffset, pageNum);
    }
}

function handleNextPrevBtnClick(pageOffset) {
    const isFirstPage = currentPage <= 1;
    const isLastPage = currentPage >= Math.ceil(dataCount / limit);

    if ((currentPage <= 1 && pageOffset < 0) || (currentPage >= Math.ceil(dataCount / limit) && pageOffset > 0)) {
        alert(pageOffset < 0 ? 'first page' : 'last page');
    } else {
        currentPage += pageOffset;
        offSet += pageOffset * limit;
        updatePageContent();
    }
}

function handlePageNumBtnClick(pageOffset, pageNum) {
    currentPage += pageOffset;
    offSet += pageOffset * limit;
    updatePageContent(pageNum);
}

function updatePageContent(pageNum) {
    pageNumDiv.innerText = currentPage;
    document.querySelectorAll('.pageNumBtn').forEach(element => element.style.color = "black");
    document.querySelector(`.pageNumBtn${currentPage}`).style.color = "red";
    listContainer.innerHTML = "";

    for (let i = offSet; i < offSet + limit; i++) {
        const data = allDataArr[i];

        if (data) {
            const a = createHTMLTag({ tag: 'a', href: '#', text: data.name });
            listContainer.append(a);
        }
    }

    displayingFirstPage = (pageNum === 1);
    displayingLastPage = (pageNum === Math.ceil(dataCount / limit));
}
