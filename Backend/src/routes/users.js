const middlewareController = require('../controllers/middlewareController');
const usersController = require('../controllers/usersController');

const router= require('express').Router();

//GET ALL USERS
router.get('/',middlewareController.verifyToken,usersController.getAllUsers);
//DELETE USER
router.delete('/:id', middlewareController.verifyTokenAndAdminAuth,usersController.deleteUser);
module.exports = router;