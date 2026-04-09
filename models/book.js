const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    title: String,
    author: String,
    isbn: String,
    pages: Number,
    price: Number,
    genre: String
});

module.exports = mongoose.model("Book", bookSchema);
