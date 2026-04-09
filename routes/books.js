var express = require('express');
const book_controlers= require('../controllers/book');
var router = express.Router();

/* GET books */
router.get('/', book_controlers.book_view_all_Page );

/* GET detail book page */
router.get('/detail', book_controlers.book_view_one_Page);

/* GET create book page */
router.get('/create', book_controlers.book_create_Page);

/* POST create book */
router.post('/create', book_controlers.book_create_Page_post);

/* GET update book page */
router.get('/update', book_controlers.book_update_Page);

/* POST update book */
router.post('/update', book_controlers.book_update_Page_post);

/* GET delete book page */
router.get('/delete', book_controlers.book_delete_Page);

/* POST delete book */
router.post('/delete', book_controlers.book_delete_Page_post);

module.exports = router;
