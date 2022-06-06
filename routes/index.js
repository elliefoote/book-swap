var express = require("express");
var router = express.Router();
const db = require("../model/helper");
var fetch = require("node-fetch");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ title: "Express" });
});

// ROUTES FOR USERS TABLE
router.get("/users", (req, res) => {
  db("SELECT * FROM users;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// ROUTES FOR BOOKS TABLE

// Get all books
router.get("/books", (req, res) => {
  db("SELECT * FROM books;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send({ error: err.message }));
});

// Get book by ID
router.get("/books/:book_id", async (req, res) => {
  let id = req.params.book_id;
  let sqlCheckID = `SELECT Books.*, Users.username, Users.wishlist 
                    FROM books 
                    JOIN Users ON Books.Addedby = Users.UserID
                    WHERE bookid = ${id}`;
  try {
    let result = await db(sqlCheckID);
    if (result.data.length === 0) {
      res.status(404).send({ error: "Book not found!" });
    } else {
      res.send(result.data[0]);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Add new book
router.post("/books", async (req, res) => {
  let { addedby, title, authors, imgurl, isbn, genre, summary, bookcondition } =
    req.body;
  let sql = `insert into books (addedby, title, authors, imgurl, isbn, genre, summary, bookcondition) 
            values (${addedby}, '${title}', '${authors}', '${imgurl}', '${isbn}', '${genre}', '${summary}', '${bookcondition}')`;
  try {
    await db(sql);
    let result = await db("select * from books");
    let books = result.data;
    res.status(201).send(books);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Edit book
router.put("/books/:book_id", async (req, res) => {
  let id = req.params.book_id;
  let { addedby, title, authors, imgurl, isbn, genre, summary, bookcondition } =
    req.body;
  let sqlCheckID = `SELECT * FROM books WHERE bookid = ${id}`;
  let sqlUpdate = `
    UPDATE books SET 
    addedby = ${addedby},    
    title = '${title}',
    authors = '${authors}',
    imgurl = '${imgurl}', 
    isbn = '${isbn}',
    genre = '${genre}',
    summary = '${summary}',
    bookcondition = '${bookcondition}' 
    WHERE bookid = ${id};
  `;
  try {
    let result = await db(sqlCheckID);
    if (result.data.length === 0) {
      res.status(404).send({ error: "Book not found!" });
    } else {
      await db(sqlUpdate);
      let result = await db("select * from books");
      let books = result.data;
      res.status(201).send(books);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Delete book
router.delete("/books/:book_id", async (req, res) => {
  let id = req.params.book_id;
  let sqlCheckID = `SELECT * FROM books WHERE bookid = ${id}`;
  let sqlDelete = `DELETE FROM books WHERE bookid = ${id}`;
  try {
    let result = await db(sqlCheckID);
    if (result.data.length === 0) {
      res.status(404).send({ error: "Book not found!" });
    } else {
      await db(sqlDelete);
      let result = await db("select * from books");
      let books = result.data;
      res.status(201).send(books);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// ROUTES FOR MESSAGES TABLE

// Get all messages
router.get("/messages", (req, res) => {
  let sqlGetMessages = `SELECT Messages.*, fromUsers.username AS sendername, toUsers.username AS recipientname
                        FROM Messages 
                        JOIN (users AS fromUsers) ON (Messages.Sender = fromUsers.userid) 
                        JOIN (users AS toUsers) ON (Messages.Recipient = toUsers.userid)
                        ORDER BY timestamp DESC`;
  db(sqlGetMessages)
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// Add new message
router.post("/messages", async (req, res) => {
  let { messagesubject, body, sender, recipient } = req.body;
  let sqlPost = `insert into messages (messagesubject, body, sender, recipient) 
            values ('${messagesubject}', '${body}', ${sender}, ${recipient})`;
  let sqlGetMessages = `SELECT Messages.*, fromUsers.username AS sendername, toUsers.username AS recipientname
            FROM Messages 
            JOIN (users AS fromUsers) ON (Messages.Sender = fromUsers.userid) 
            JOIN (users AS toUsers) ON (Messages.Recipient = toUsers.userid)
            ORDER BY timestamp DESC`;
  try {
    await db(sqlPost);
    let result = await db(sqlGetMessages);
    let messages = result.data;
    res.status(201).send(messages);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Delete message
router.delete("/messages/:message_id", async (req, res) => {
  let id = req.params.message_id;
  let sqlCheckID = `SELECT * FROM messages WHERE messageid = ${id}`;
  let sqlDelete = `DELETE FROM messages WHERE messageid = ${id}`;
  let sqlGetMessages = `SELECT Messages.*, fromUsers.username AS sendername, toUsers.username AS recipientname
            FROM Messages 
            JOIN (users AS fromUsers) ON (Messages.Sender = fromUsers.userid) 
            JOIN (users AS toUsers) ON (Messages.Recipient = toUsers.userid)
            ORDER BY timestamp DESC`;
  try {
    let result = await db(sqlCheckID);
    if (result.data.length === 0) {
      res.status(404).send({ error: "Message not found!" });
    } else {
      await db(sqlDelete);
      let result = await db(sqlGetMessages);
      let messages = result.data;
      res.status(201).send(messages);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
