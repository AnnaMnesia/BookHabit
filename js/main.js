// import external functions
import { fetchBooksList, storeBookList, getBooksList, getReadingList, clearReadingList } from "./booksStore.js";
import { renderBooksList, renderReadingList } from './uiHelpers.js';


// initialize every as a IIFE (Immediately Invoked Function Expression)
// that way it is not accessible outside this function
(function () {
    // References to DOM elements
    const fetchBooksBtn = document.querySelector('#btn-fetch-books');
    const booksListContainer = document.querySelector('#books-list');
    const readingListContainer = document.querySelector('#reading-list');
    const clearReadingListBtn = document.querySelector('#btn-clear-reading-list');

    // Assign click listener to fetching button
    fetchBooksBtn.addEventListener('click', async evt => {
        console.log('Fetching books list');

        // Fetch and store books from API
        await fetchBooksList();

        // re-render whole list of books into booksListContainer
        renderBooksList(getBooksList(), booksListContainer, readingListContainer);
    });

    // Assign click listener to clear reading list button
    clearReadingListBtn.addEventListener('click', evt => {
        // clear the list
        clearReadingList();

        // re-render so it gets empty
        renderReadingList(getReadingList(), readingListContainer);
    });

    // Render everything the first time
    renderBooksList(getBooksList(), booksListContainer, readingListContainer);
    renderReadingList(getReadingList(), readingListContainer);
})();