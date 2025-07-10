import { UserModel } from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import argon2 from 'argon2';
import dotenv from 'dotenv'
dotenv.config()


const generateToken = (user)=>{
    const payload = {id:user._id,email:user.email,role:user.role}
    const accessToken = jwt.sign(payload,process.env.JWT_SECRET);
    //const refreshToken = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'15d'})
    return accessToken //,refreshToken
}

export const registr = async (req,res) => {
    const{name,email,password,contactInfo,orgName,role} = req.body
    try {
        if(!name.trim() || !email.trim() || !password.trim() || !contactInfo.trim())
                        return res.status(400).json({message:'Please provide all credentials...'});
        const user  = await UserModel.findOne({email});
        if(user)
            return res.status(409).json({mesage:'user already exists,Please login...'});
        const hash = await argon2.hash(password.trim());
        await UserModel.create({name,email,password:hash,orgName,role});
        res.status(201).json({message:'created, Now Please login'})

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:'server error'})
    }
};


export const login = async (req,res) => {
    try {
        const{email,password} = req.body;
        const user = await UserModel.findOne({email})?.toObject();
        if(!user)
            return res.status(404).json({message:'User not found, please signup...'})
        const verify = await argon2.verify(user.password,password);
        if(!verify)
                return res.status(401).json({message:'Invalid Pssword...'});
        delete user.password
        res.status(200).json({
            user,
            token:generateToken(user)
        })
    } catch (error) {
               console.log(error.mesage);
        res.status(500).json({message:'server error'}) 
    }
};





