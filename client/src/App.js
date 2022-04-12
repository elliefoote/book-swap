import React, { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.js';

import BookDetail from './views/BookDetail.js';
import BookList from './views/BookList.js';
import Error404View from './views/Error404View.js';
import HomeView from './views/HomeView.js';
import MyBooks from './views/MyBooks.js';
import EditBook from './views/EditBook.js';
import MyMessages from './views/MyMessages.js';
import AddBook from './views/AddBook.js';

function App() {
  const [books, setBooks] = useState([]);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
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

  useEffect(() => {
    getUsers();
  }, []);

  // GET all users
  async function getUsers() {
    try {
      let response = await fetch("/users");
      if (response.ok) {
        let users = await response.json();
        setUsers(users);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  // BOOKS FUNCTIONS

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
        setSubmitSuccess(true);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  // EDIT book
  const editBook = async (updatedBook, editID) => {
    updatedBook.addedby = currentUser;
    let options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBook)
    };
    let id = editID;
    try {
      let response = await fetch(`/books/${id}`, options);
      if (response.ok) {
        let books = await response.json();
        setBooks(books);
        setSubmitSuccess(true);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  // Reset submit success prop
  const resetSubmit = () => {
    setSubmitSuccess(false);
  }

  // MESSAGES FUNCTIONS

  // ADD new message
  const addNewMessage = async (newMessage) => {
    // Set the current user as the sender of the message
    newMessage.sender = currentUser;

    // Convert recipient name (a username) into recipient ID (a number)
    let recipient = users.filter(user => user.username === newMessage.recipient);
    let recipientID = recipient[0].userid;
    console.log(recipientID);
    newMessage.recipient = recipientID;

    // Set the options
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessage)
    };
    try {
      let response = await fetch("/messages", options);
      if (response.ok) {
        let messages = await response.json();
        setMessages(messages);
        setSubmitSuccess(true);
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

// DELETE message
const deleteMessage = async id => {
  console.log('The delete message got called in App.js')
  let options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  };
  try {
    let response = await fetch(`/messages/${id}`, options);
    if (response.ok) {
      let messages = await response.json();
      setMessages(messages);
    } else {
      console.log(`Server error: ${response.status} ${response.statusText}`);
    }
  } catch (err) {
    console.log(`Server error: ${err.message}`);
  }
};


  return (
    <div className="App bg-light">
        <Navbar currentUser={currentUser}/>
        <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="books" element={<BookList books={books} />} />
                <Route path="mybooks" element={<MyBooks books={books} currentUser={currentUser} deleteBook={bookID => deleteBook(bookID)}/>} />
                <Route path="mybooks/addnew" element={<AddBook addBookCB={(newBook) => addNewBook(newBook)} submitSuccess={submitSuccess} resetSubmitSuccess={() => resetSubmit()}/>} />
                <Route path="mybooks/edit/:id" element={<EditBook submitSuccess={submitSuccess} resetSubmitSuccess={() => resetSubmit()} books={books} editBook={(book, editID) => editBook(book, editID)}/>} />
                <Route path="mymessages" element={<MyMessages resetSubmitSuccess={() => resetSubmit()} submitSuccess={submitSuccess} currentUser={currentUser} messages={messages} deleteMessage={messageID => deleteMessage(messageID)} addNewMessage={message => addNewMessage(message)} />} />
                <Route path="books/:id" element={<BookDetail resetSubmitSuccess={() => resetSubmit()} submitSuccess={submitSuccess} books={books} currentUser={currentUser} addNewMessage={message => addNewMessage(message)}/>} />
                <Route path="*" element={<Error404View />} />
        </Routes>

    </div>
  );
}

export default App;
