const jwt = require("jsonwebtoken");

const middlewareController = {
    // verifyToken
    verifyToken: (req, res, next) => {
        const token = req.headers.token; // Thông thường, token được truyền qua tiêu đề 'Authorization'
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) {
                    return res.status(403).json({ message: "Token is not valid" });
                }
                req.user = user; // Chỉnh sửa 'res.user' thành 'req.user'
                next();
            });
        } else {
            res.status(401).json({ message: "You are not authenticated" });
        }
    },
    verifyTokenAndAdminAuth: (req, res, next) => {
        try {
            middlewareController.verifyToken(req, res, () => { // Đảm bảo thứ tự tham số đúng
                if (req.user.id == req.params.id || req.user.admin) {
                    next();
                } else {
                    res.status(403).json({ message: "You are not allowed to do that" });
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = middlewareController;
