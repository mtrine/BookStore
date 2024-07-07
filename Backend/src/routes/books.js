const booksController = require('../controllers/booksController');
const router= require('express').Router();

router.get('/',booksController.getAllBooks);
router.post('/addbook',booksController.addBook);
router.delete('/:id',booksController.deleteBook);


module.exports = router;