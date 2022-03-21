import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import Error404View from './Error404View.js';
import './EditBook.css';

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

  useEffect(() => {
        props.resetSubmitSuccess();
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
         
        {props.submitSuccess && <div id="submit-container" className="border bg-light d-flex justify-content-center align-items-center py-2 mb-2"><p id="submit-text"className="text-success">Update successful! You can edit more details below or go back to <Link className="link" to="/mybooks">My Books</Link>.</p></div>} 
         
        {bookToEdit && <BookForm addOrEdit={addOrEdit} bookToEdit={bookToEdit} editBookCB={(book) => editBookCB(book)}/>}

    </div>
  );
}