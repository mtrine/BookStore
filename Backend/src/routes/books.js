const router = require('express').Router();
const booksController = require('../controllers/booksController');
const middlewareController = require('../controllers/middlewareController');
router.get('/', middlewareController.verifyToken, booksController.getAllBooks);
router.post('/addBook', booksController.addBook);
router.get('/:id', middlewareController.verifyToken, booksController.getDetailBook);
router.put('/:id',middlewareController.verifyTokenAndAdminAuth ,booksController.updateBook);
module.exports = router;