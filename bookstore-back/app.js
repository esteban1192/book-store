var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

books = require("./books.json");

app.get('/books', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Retrieved all books',
    data: books
  });
});

app.post('/book', (req, res, next) => {
  const { title, author, price, stockQuantity } = req.body;

  if (title===undefined || author===undefined || price === undefined || stockQuantity===undefined) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide title, author, price, and stockQuantity for the book.'
    });
  }

  const newBook = {
    title,
    author,
    price,
    stockQuantity
  };
  books.push(newBook);

  // Respond with the added book
  res.status(201).json({
    status: 'success',
    message: 'Book added successfully',
    data: newBook
  });
});

app.put('/book/:id', (req, res) => {
  const bookIndex = req.params.id;

  const { title, author, price, stockQuantity } = req.body;

  if (!books[bookIndex]) {
    return res.status(404).json({
      status: 'error',
      message: 'Book not found'
    });
  }

  if (!title || !author || !price || !stockQuantity) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide title, author, price, and stockQuantity for the book.'
    });
  }

  books[bookIndex] = {
    ...books[bookIndex],
    title,
    author,
    price,
    stockQuantity
  };

  res.status(200).json({
    status: 'success',
    message: 'Book updated successfully',
    data: books[bookIndex]
  });
});

app.delete('/book/:id', (req, res, next) => {
  const bookId = parseInt(req.params.id);

  if (isNaN(bookId) || bookId < 0 || bookId >= books.length) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid book ID provided'
    });
  }

  const deletedBook = books.splice(bookId, 1)[0];

  res.status(200).json({
    status: 'success',
    message: 'Book deleted successfully',
    deletedBook: deletedBook
  });
});

app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
