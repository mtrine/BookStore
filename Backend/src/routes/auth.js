const authController = require('../controllers/authController');
const middlewareController = require('../controllers/middlewareController');

const router = require('express').Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
//Refresh token
router.post('/refresh', authController.refreshtoken);
router.post('/logout', middlewareController.verifyToken,authController.logout);
module.exports = router;