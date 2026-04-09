var Book = require('../models/book');

// List of all Books
exports.book_list = async function(req, res) {
    try{
        theBooks = await Book.find();
        res.send(theBooks);
    }
    catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
    }  
};

// for a specific Book.
exports.book_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};

// Handle Book create on POST.
exports.book_create_post = async function(req, res) {
    console.log(req.body)
    let document = new Book();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require JSON. We need to pull out the fields from req.body
    document.title = req.body.title;
    document.author = req.body.author;
    document.isbn = req.body.isbn;
    document.pages = req.body.pages;
    document.price = req.body.price;
    document.genre = req.body.genre;
    try{
        let result = await document.save();
        res.send(result);
    }
    catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
    }  
};

// Handle Book delete on DELETE.
exports.book_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete DELETE ' + req.params.id);
};

// Handle Book update form on PUT.
exports.book_update_put = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update PUT' + req.params.id);
};

// VIEWS
// Handle a show all view
exports.book_view_all_Page = async function(req, res) {
    try{
        theBooks = await Book.find();
        res.render('books', { title: 'Book Search Results', results: theBooks });
    }
    catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
    }  
};
