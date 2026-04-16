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
exports.book_detail = async function(req, res) {
    console.log("detail"  + req.params.id)
    try {
        result = await Book.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
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
exports.book_delete = async function(req, res) {
    console.log("delete "  + req.params.id)
    try {
        result = await Book.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};

// Handle Book update form on PUT.
exports.book_update_put = async function(req, res) {
    try {
        let toUpdate = await Book.findById(req.params.id)
        // Update properties
        if(req.body.title) toUpdate.title = req.body.title;
        if(req.body.author) toUpdate.author = req.body.author;
        if(req.body.isbn) toUpdate.isbn = req.body.isbn;
        if(req.body.pages) toUpdate.pages = req.body.pages;
        if(req.body.price) toUpdate.price = req.body.price;
        if(req.body.genre) toUpdate.genre = req.body.genre;
        let result = await toUpdate.save();
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed}`);
    }
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

// Handle a show one view with id specified by query
exports.book_view_one_Page = async function(req, res) {
    console.log("single view for id "  + req.query.id)
    try{
        result = await Book.findById( req.query.id)
        res.render('bookinspect', { title: 'Book Detail', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a book.
// No body, no in path parameter, no query.
// Does not need to be async
exports.book_create_Page =  function(req, res) {
    console.log("create view")
    try{
        res.render('bookcreate', { title: 'Book Create'});
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a book.
exports.book_update_Page =  async function(req, res) {
    try{
        let result = await Book.findById(req.query.id)
        res.render('bookupdate', { title: 'Update Book', book: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle a delete one view with id from query
exports.book_delete_Page = async function(req, res) {
    try{
        result = await Book.findById(req.query.id)
        res.render('bookdelete', { title: 'Delete Book', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle form-based create POST
exports.book_create_Page_post = async function(req, res) {
    let document = new Book();
    document.title = req.body.title;
    document.author = req.body.author;
    document.isbn = req.body.isbn;
    document.pages = req.body.pages;
    document.price = req.body.price;
    document.genre = req.body.genre;
    try{
        let result = await document.save();
        res.redirect('/books');
    }
    catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
    }  
};

// Handle form-based update POST
exports.book_update_Page_post = async function(req, res) {
    console.log("Update POST body:", req.body);
    try {
        // Pull the current state of the object
        let toUpdate = await Book.findById(req.body.id)
        // Update properties only if they are defined
        if(req.body.title) toUpdate.title = req.body.title;
        if(req.body.author) toUpdate.author = req.body.author;
        if(req.body.isbn) toUpdate.isbn = req.body.isbn;
        if(req.body.pages) toUpdate.pages = req.body.pages;
        if(req.body.price) toUpdate.price = req.body.price;
        if(req.body.genre) toUpdate.genre = req.body.genre;
        let result = await toUpdate.save();
        console.log("Update successful:", result);
        res.redirect('/books');
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}}`);
    }
};

// Handle form-based delete POST
exports.book_delete_Page_post = async function(req, res) {
    try {
        result = await Book.findByIdAndDelete(req.body.id)
        res.redirect('/books');
    } catch (error) {
        res.status(500)
        res.send(`{"error": Error deleting}`);
    }
};
