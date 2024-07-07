const Users= require('../models/User');

const usersController={
    getAllUsers: async (req, res) => {
        try {
            const user = await  Users.findAll();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await Users.findByPk(req.params.id);
            if(!user){
                return res.status(404).json({message: "User not found"});
            }
            // await user.destroy();
            res.status(200).json({message: "User deleted"});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}
module.exports = usersController;