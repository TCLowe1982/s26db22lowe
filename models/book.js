const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    title: String,
    author: String,
    isbn: String,
    pages: {
        type: Number,
        min: 1,
        max: 10000
    },
    price: {
        type: Number,
        min: 0,
        max: 1000
    },
    genre: String
});

module.exports = mongoose.model("Book", bookSchema);
