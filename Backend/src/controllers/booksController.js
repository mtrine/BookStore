const Books = require('../models/Books');
const Genres = require('../models/Genres');
const Authors=require('../models/Authors');
const Publisher = require('../models/Publisher');
const booksController={
    getAllBooks: async (req, res) => {
        try {
            const books = await Books.findAll({
                include: [Genres, Authors, Publisher]
            }
        );
            res.status(200).json(books);
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: "Internal server error"});
        }
    },
    addBook: async (req, res) => {
        try {
            const {bookName, price, image, releaseYear ,description, genres,author,publisher} = req.body;
            const newBook = await Books.create({
                bookName, 
                price, 
                image, 
                releaseYear,
                description
            });
            if(genres&&genres.length>0){
                await Promise.all(genres.map(async (genreName) => {
                    let genre = await Genres.findOne({ where: { genreName } });
                    if (genre) {
                        await newBook.addGenres(genre); // Đảm bảo sử dụng await ở đây
                    } else {
                        genre = await Genres.create({ genreName });
                        await newBook.addGenres(genre); // Đảm bảo sử dụng await ở đây
                    }
                }));
            }
            // Thêm tác giả vào sách
            if (author) {
                let authorRecord = await Authors.findOne({ where: { authorName: author } });
                if (!authorRecord) {
                    authorRecord = await Authors.create({ authorName: author });
                }
                await newBook.setAuthor(authorRecord); // Assuming setAuthor is the correct method
            }

            // Thêm nhà xuất bản vào sách
            if (publisher) {
                let publisherRecord = await Publisher.findOne({ where: { publisherName: publisher } });
                if (!publisherRecord) {
                    publisherRecord = await Publisher.create({ publisherName: publisher });
                }
                await newBook.setPublisher(publisherRecord); // Assuming setPublisher is the correct method
            }

            res.status(201).json(newBook);
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: "Internal server error"});
        }
    },
    getDetailBook: async (req, res) => {
        try {
            const book = await Books.findByPk(req.params.id, {
                include: [Genres, Authors, Publisher]
            });
            if (book) {
                res.status(200).json(book);
            } else {
                res.status(404).json({msg: "Book not found"});
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: "Internal server error"});
        }
    },
    updateBook: async(req, res) => {
        try {
            const {bookName, price, image, releaseYear ,description, genres,author,publisher} = req.body;
            const book = await Books.findByPk(req.params.id);
            if (book) {
                await book.update({
                    bookName, 
                    price, 
                    image, 
                    releaseYear,
                    description
                });
                if(genres&&genres.length>0){
                    await book.setGenres([]); // Xóa tất cả genres của sách
                    await Promise.all(genres.map(async (genreName) => {
                        let genre = await Genres.findOne({ where: { genreName } });
                        if (genre) {
                            await book.addGenres(genre); // Đảm bảo sử dụng await ở đây
                        } else {
                            genre = await Genres.create({ genreName });
                            await book.addGenres(genre); // Đảm bảo sử dụng await ở đây
                        }
                    }));
                }
                // Thêm tác giả vào sách
                if (author) {
                    let authorRecord = await Authors.findOne({ where: { authorName: author } });
                    if (!authorRecord) {
                        authorRecord = await Authors.create({ authorName: author });
                    }
                    await book.setAuthor(authorRecord); // Assuming setAuthor is the correct method
                }

                // Thêm nhà xuất bản vào sách
                if (publisher) {
                    let publisherRecord = await Publisher.findOne({ where: { publisherName: publisher } });
                    if (!publisherRecord) {
                        publisherRecord = await Publisher.create({ publisherName: publisher });
                    }
                    await book.setPublisher(publisherRecord); // Assuming setPublisher is the correct method
                }
                res.status(200).json(book);
            } else {
                res.status(404).json({msg: "Book not found"});
            }
        } catch (error) {
            console.log("Update book Err: ",error);
            
        }
    }
}
module.exports = booksController;