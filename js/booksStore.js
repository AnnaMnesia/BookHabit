// Import key constants
import { BOOKS_API_URL, BOOKS_LIST_KEY, READ_LIST_KEY } from './constants.js';

//RAM storage
let booksList = new Map();
let readingList = new Map();

// Function for fetching books list from API
export const fetchBooksList = async () => {
    // request the books list and store response
    const response = await fetch(BOOKS_API_URL);

    // parse response data and store
    const books = await response.json();

    // store books list in RAM and localStorage
    storeBookList(books);
};



// Function to store an array of book objects to the RAM storage as well as caching it to the localStorage
export const storeBookList = (books) => {
    // populate the RAM-stored map with the passed books with their ID as its key
    books.forEach(book => {
        booksList.set(book.id, book);
    });

    // caching it to the localStorage as an array of [[ID, book]]
    localStorage.setItem(BOOKS_LIST_KEY, JSON.stringify([...booksList.entries()]));
    // or 
    // localStorage.setItem(BOOKS_LIST_KEY, JSON.stringify(Array.from(booksList.entries())));
};

// Getter-Function for the stored bookList
export const getBooksList = () => {
    // if RAM-store is empty
    if (booksList.size === 0) {
        // fetch from localStorage and create a map out of it
        // if it is not present, an empty map is created
        booksList = new Map(JSON.parse(localStorage.getItem(BOOKS_LIST_KEY)));
    }

    // return either way
    return booksList;
};

// Function to add a book's id to the reading list map
export const addToReadingList = (bookId) => {
    if (!readingList.has(bookId)) {
        // store book's ID and a flag for isRead to readingList map
        readingList.set(bookId, false);

        // cache it to localStorage
        localStorage.setItem(READ_LIST_KEY, JSON.stringify([...readingList.entries()]));
        // or
        // localStorage.setItem(READ_LIST_KEY, JSON.stringify(Array.from(readingList.entries())));
    }
};

// Function to retrieve a usable list of the reading list map for the UI with title ans isRead status 
export const getReadingList = () => {
    // if RAM-store is empty
    if (readingList.size === 0) {
        // fetch from localStorage and create a map out of it
        // if it is not present, an empty map is created
        readingList = new Map(JSON.parse(localStorage.getItem(READ_LIST_KEY)));
    }

    // create a new array from the map entries
    const list = [...readingList.entries()].map(entry => {
        // extract the stored book ID
        const id = entry[0];

        // extract the isRead status
        const isRead = entry[1];

        // construct and return object with id, title and isRead status

        return {
            id: id,
            title: booksList.get(id).title,
            isRead: isRead
        };
    });

    return list;
};

// Function to toggle the isRead status of a certain book by it's id
export const toggleRead = (bookId) => {
    // get the stored reading status
    const isRead = readingList.get(bookId);

    // toggle the reading status in the map
    readingList.set(bookId, !isRead);

    // cache to localStorage
    localStorage.setItem(READ_LIST_KEY, JSON.stringify([...readingList.entries()]));
};

// Function to clear the reading list completely
export const clearReadingList = () => {
    // clear reading list in RAM
    readingList.clear();

    // remove form localStorage cache
    localStorage.removeItem(READ_LIST_KEY);
};

// export { fetchBooksList, storeBookList, getBookList, addToReadingList, getReadingList, toggleRead, clearReadingList } from './booksStore.js'