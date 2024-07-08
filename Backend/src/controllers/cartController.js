const Books = require('../models/Books');
const Cart = require('../models/Cart');
const CartBooks = require('../models/CartBooks');

const cartController = {
    getCartByUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const cart = await Cart.findOne({
                where: { userId },
                include: [Books]
            });
            res.status(200).json(cart);
        } catch (error) {
            console.log("getCartByUser Err: "+error);
            res.status(500).json({message: "Internal server error"});
        }   
    },
    addBookToCart: async (req, res) => {
        try {
            const { userId, bookId } = req.body;

            // Tìm giỏ hàng của người dùng
            let cart = await Cart.findOne({ where: { userId } });

            // Nếu không tìm thấy giỏ hàng, tạo mới
            if (!cart) {
                cart = await Cart.create({ userId });
            }

            // Tìm sách cần thêm vào giỏ hàng
            const book = await Books.findByPk(bookId);
            
            // Kiểm tra xem sách có tồn tại không
            if (!book) {
                return res.status(404).json({ message: "Book not found" });
            }

            // Kiểm tra xem sách đã có trong giỏ hàng chưa
            let cartBook = await CartBooks.findOne({
                where: {
                    CartId: cart.id,
                    BookId: bookId
                }
            });

            // Nếu sách chưa có trong giỏ hàng, tạo mới và đặt quantity là 1
            if (!cartBook) {
                cartBook = await CartBooks.create({
                    CartId: cart.id,
                    BookId: bookId,
                    quantity: 1 // Số lượng mặc định là 1 khi thêm sách vào giỏ hàng
                });
            } else {
                // Nếu sách đã có trong giỏ hàng, tăng số lượng lên 1
                cartBook.quantity += 1;
                await cartBook.save();
            }

            // Lấy giỏ hàng đã cập nhật để trả về
            const updatedCart = await Cart.findOne({
                where: { userId },
                include: [Books]
            });

            res.status(200).json(updatedCart);
        } catch (error) {
            console.log("addBookToCart Err: "+error);
            res.status(500).json({message: error.message});
        }
    },
    deleteBookFromCart: async (req, res) => {
        try {
            const { cartId, bookId } = req.body;
            const bookNeedDelete = await CartBooks.findOne({
                where: {
                    CartId: cartId,
                    BookId: bookId
                }
            });
            if (!bookNeedDelete) {
                return res.status(404).json({message: "Book not found"});
            }
            await bookNeedDelete.destroy();
            res.status(200).json({message: "Delete book success"});
        } catch (error) {
            console.log("deleteBook Err: "+error);
            res.status(500).json({message: error.message});
        }
    }
}
module.exports = cartController;