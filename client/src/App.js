import React, { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.js';

import BookDetail from './views/BookDetail.js';
import BookList from './views/BookList.js';
import Error404View from './views/Error404View.js';
import HomeView from './views/HomeView.js';
import MyBooks from './views/MyBooks.js';
import MyMessages from './views/MyMessages.js';
import NewBookForm from './views/NewBookForm.js';

function App() {
  const [books, setBooks] = useState([]);
  const [messages, setMessages] = useState([])
  const [currentUser, setCurrentUser] = useState(1); // Proxy for logged-in user
  
  useEffect(() => {
    getBooks();
  }, []);
  
  // GET all books
  async function getBooks() {
    try {
      let response = await fetch("/books");
      if (response.ok) {
        let books = await response.json();
        setBooks(books);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  useEffect(() => {
    getMessages();
  }, []);
  
  // GET all messages
  async function getMessages() {
    try {
      let response = await fetch("/messages");
      if (response.ok) {
        let messages = await response.json();
        setMessages(messages);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  // ADD new book
  const addNewBook = async (newBook) => {
    newBook.addedby = currentUser;
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook)
    };
    try {
      let response = await fetch("/books", options);
      if (response.ok) {
        let books = await response.json();
        setBooks(books);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  // DELETE book
  const deleteBook = async id => {
    let options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    };
    try {
      let response = await fetch(`/books/${id}`, options);
      if (response.ok) {
        let books = await response.json();
        setBooks(books);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  };

  return (
    <div className="App">
        <Navbar />
        <div className="d-flex justify-content-end align-items-center pe-3">
            <div className="mt-3"><p>Welcome, <b>User {currentUser}</b>!</p></div>
            <button className="btn btn-primary btn-sm ms-3">Log out</button>
        </div>
        <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="books" element={<BookList books={books} />} />
                <Route path="mybooks" element={<MyBooks books={books} currentUser={currentUser} deleteBook={bookID => deleteBook(bookID)}/>} />
                <Route path="mybooks/addnew" element={<NewBookForm addBookCB={(newBook) => addNewBook(newBook)}/>} />
                <Route path="mymessages" element={<MyMessages currentUser={currentUser} messages={messages} />} />
                <Route path="books/:id" element={<BookDetail books={books} />} />
                <Route path="*" element={<Error404View />} />
        </Routes>

    </div>
  );
}

export default App;
