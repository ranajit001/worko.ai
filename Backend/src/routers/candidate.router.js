import { getCAndidates,newCandidate,updateCandidateById,deleteCandidateById } from "../controllers/candidate.controller.js";


import express from 'express'

export const CandidateRouter = express.Router();

CandidateRouter.post('/apply',newCandidate)
.get('/',getCAndidates)
.put('/:id/status',updateCandidateById)
.delete('/delete/:id',deleteCandidateById)

