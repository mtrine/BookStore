const Users = require('../models/User');
const Cart = require('../models/Cart');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: __dirname + '/.env'});
let refreshTokens = [];
const authController={
    //REGISTER
    registerUser: async (req, res) => {
        try {
            const  salt =await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            //Create new user
            const newUser = await Users.create({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            });
            //Create cart for new user
            await Cart.create({
                UserId: newUser.id
            });
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    generateAccessToken:(user)=>{
        return jwt.sign({
            id:user.id,
            admin:user.admin,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:"30s"
        }
        )
    },
    //Generate refresh token
    generateRefreshToken:(user)=>{
        return jwt.sign({
            id:user.id,
            admin:user.admin,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:"365d"
        }

    )
    },
    //LOGIN
    loginUser: async(req,res)=>{
        try {
            const users=await Users.findOne({where:{username:req.body.username}});
            if(!users){
                return res.status(400).json({message:"Wrong username "});
            }
            const validPassword =  await bcrypt.compare(
                req.body.password, 
                users.password
            );
            if(!validPassword){
                return res.status(400).json({message:"Wrong password"});
            }
            if(validPassword&&users){
                const accessToken=authController.generateAccessToken(users);
                const refreshToken=authController.generateRefreshToken(users);
                refreshTokens.push(refreshToken);
                res.cookie("refreshToken",refreshToken,{
                    httpOnly:true,
                    path:"/",
                    secure:false,
                    sameSite:"strict"
                });
                const{password,...other}=users.dataValues;
                res.status(200).json({...other,accessToken});
            }

        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    //REFRESH TOKEN
    refreshtoken:async(req,res)=>{
        //Take refresh token from cookies
        const refreshToken=req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(400).json({message:"User not authenticated"});
        }   
        if(!refreshTokens.includes(refreshToken)){
            return res.status(400).json({message:"Refresh token is not valid"});
        }
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
            if(err){
                return res.status(400).json({message:err.message});
            }
            const newAccessToken=authController.generateAccessToken(user);
            const newRefreshToken=authController.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshToken",newRefreshToken,{
                httpOnly:true,
                path:"/",
                secure:false,
                sameSite:"strict"
            });
            res.status(200).json({accessToken:newAccessToken});
        });
    },
    logout:async(req,res)=>{
        res.clearCookie("refreshToken");
        refreshTokens=refreshTokens.filter(token=>token!==req.cookies.refreshToken);
        res.status(200).json({message:"Logged out"});
    }
};
module.exports = authController;
//STORE TOKEN
//1) LOCAL STORAGE: DỄ BỊ TẤN CÔNG 
//2) COOKIES: AN TOÀN HƠN SAU KHI TẠO RA TOKEN THÌ LƯU VÀO COOKIES
//3) REDUX STORE