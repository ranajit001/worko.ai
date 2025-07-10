
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()


export const auth = (role)=>(req,res,next)=>{
    const accessToken = req.headers.authorization?.split(' ')[1];
    if(!accessToken)
        return  res.status(401).json({ message: 'Access token missing' });
    try {
        const verify = jwt.verify(accessToken,process.env.JWT_SECRET);
        req.user = verify;
        if(!role.includes(verify.role))
            return res.status(403).json({message:'unautorized...'});
        next()
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:'server error...'})
        
    }
}