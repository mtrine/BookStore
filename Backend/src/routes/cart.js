const router = require('express').Router();
const cartController = require('../controllers/cartController');
const middlewareController = require('../controllers/middlewareController');

router.get('/:userId',middlewareController.verifyToken , cartController.getCartByUser);
router.post('/addBookToCart',middlewareController.verifyToken, cartController.addBookToCart);
router.delete('/removeBookFromCart',cartController.deleteBookFromCart);
module.exports = router;