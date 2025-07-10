import express from "express";
import cors from 'cors';
import { config } from "dotenv";



import { UserRouter } from "./routers/user.router.js";
import { CandidateRouter } from "./routers/candidate.router.js";
import { ConnectDB } from "./configs/db.js";

config()

const app = express();
app.use(express.json());
app.use(cors());


app.use('/admin',UserRouter)
app.use('/',CandidateRouter)



const PORT = +process.env.PORT

app.listen(PORT,async()=>{
  await  ConnectDB()
  console.log('server started...');
  
})