import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import Error404View from './Error404View.js';

import "./BookDetail.css";
import BookForm from "../components/BookForm.js";

export default function BookDetail(props) {
  const [show404, setShow404] = useState("false");
  const [addOrEdit, setAddOrEdit] = useState("edit");
  let { id } = useParams();  // get book ID from URL
  const [bookToEdit, setBookToEdit] = useState({});
    
  useEffect(() => {
      getBookToEdit(id);
    }, []);
  
  const getBookToEdit = async id => {
      try {
        let response = await fetch(`/books/${id}`);
        if (response.ok) {
          let bookToEdit = await response.json();
          setBookToEdit(bookToEdit);
        } else {
          if (response.status === 404) {setShow404(true)};
          console.log(`Server error: ${response.status} ${response.statusText}`);
        }
      } catch (err) {
        console.log(`Server error: ${err.message}`);
      }
    };

    const editBookCB = (book) => {
        let editID = id; 
        props.editBook(book, editID);
    }

  return (
    <div>
        <h3>Edit Book</h3>

        {props.submitSuccess && <p>Update successful! You can add another book below or go back to <Link className="link" to="/mybooks">My Books</Link>.</p>}


        <div className="container">    
        <h4>Current Data</h4>
        <ul>
            <li>Title: {bookToEdit.title}</li>
            <li>Authors: {bookToEdit.authors}</li>
            <li>Genre: {bookToEdit.genre}</li>
            <li>Description: {bookToEdit.summary}</li>
            <li>Condition: {bookToEdit.bookcondition}</li>
            <li>Image URL: {bookToEdit.imgurl}</li>
        </ul>
        </div>
        
        <BookForm addOrEdit={addOrEdit} bookToEdit={bookToEdit} editBookCB={(book) => editBookCB(book)}/>

    </div>
  );
}