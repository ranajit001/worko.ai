import { login,registr } from "../controllers/user.controller.js";

import express from 'express'

export const UserRouter = express.Router();


UserRouter
.post('/register',registr)
.post('/login',login)