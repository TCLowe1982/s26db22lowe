var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

console.log('Loading app.js...');

require('dotenv').config();
const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString); 


//Get the default connection
var db = mongoose.connection;

//Bind connection to error event 
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){console.log("Connection to DB succeeded")});

Book = require("./models/book");

// We can seed the collection if needed
async function recreateDB() {
  // Delete everything
  await Book.deleteMany();

  let book1 = new Book({
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0-06-112008-4",
    pages: 324,
    price: 15.99,
    genre: "Fiction"
  });

  let book2 = new Book({
    title: "1984",
    author: "George Orwell",
    isbn: "978-0-452-28423-4",
    pages: 328,
    price: 14.99,
    genre: "Dystopian"
  });

  let book3 = new Book({
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0-7432-7356-5",
    pages: 180,
    price: 12.99,
    genre: "Classic"
  });

  await book1.save();
  await book2.save();
  await book3.save();

  console.log("Database seeded");
}

let reseed = false;
if (reseed) { recreateDB(); }

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');

console.log('Routes loaded successfully');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/grid', gridRouter);
app.use('/selector', pickRouter);
app.use('/resource', resourceRouter);
app.get('/bombs', function(req, res) {
  res.render('bombs', { title: 'Search Results bombs' });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log('App configuration complete');

module.exports = app;
