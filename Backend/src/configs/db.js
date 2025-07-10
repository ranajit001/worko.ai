import mongoose from "mongoose";
import { config } from "dotenv";
config()
export const ConnectDB = async()=>{
    try {
       await mongoose.connect(process.env.MONGO_URL) 
       console.log('db connected...');
       
    } catch (error) {
        console.log(error.message);
        
    }
}