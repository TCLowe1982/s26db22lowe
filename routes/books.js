var express = require('express');
const book_controlers= require('../controllers/book');
var router = express.Router();

// A little function to check if we have an authorized user and continue on or
// redirect to login.
const secured = (req, res, next) => {
    if (req.user){
      return next();
    }
    res.redirect("/login");
  }

/* GET books */
router.get('/', book_controlers.book_view_all_Page );

/* GET detail book page */
router.get('/detail', book_controlers.book_view_one_Page);

/* GET create book page */
router.get('/create', secured, book_controlers.book_create_Page);

/* POST create book */
router.post('/create', secured, book_controlers.book_create_Page_post);

/* GET update book page */
router.get('/update', secured, book_controlers.book_update_Page);

/* POST update book */
router.post('/update', secured, book_controlers.book_update_Page_post);

/* GET delete book page */
router.get('/delete', secured, book_controlers.book_delete_Page);

/* POST delete book */
router.post('/delete', secured, book_controlers.book_delete_Page_post);

module.exports = router;
