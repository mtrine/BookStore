const Books = require('../models/Books');
const booksController = {
    getAllBooks:async (req, res) => {
        try {
            const books = await Books.findAll();
            res.status(200).json(books);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Get book err' });
        }
    },
    addBook:async (req, res) => {
        try {
            const { bookName, price, image } = req.body;
            const newBook = await Books.create({ bookName, price, image });
            res.status(201).json(newBook);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Add book err' });
        }
    },
    deleteBook:async (req, res) => {
        try {
            const book = await Books.findByPk(req.params.id);
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            await book.destroy();
            res.status(204).end();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Delete book err' });
        }
    },
    updateBook:async(req,res)=>{
        try {
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Update book err' });
        }
    }
};
module.exports = booksController;