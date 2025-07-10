import { CandiModel } from "../models/candidate.model.js";




export const newCandidate = async (req,res) => { //console.log('ewq comming');

    try {
        const{name,email,contactInfo,jobRole,resume}= req.body;
        const user = await CandiModel.findOne({email});
        if(user)
                return res.status(409).json({messag:'You already applied with this email.. try with anothr email'})
        if(!name.trim() || !email.trim() || !contactInfo || !jobRole.trim())
                    return res.status(400).json({message:'Please provide all credentials...'});
        const newCandi = await CandiModel.create({name,email,contactInfo,jobRole,resume,status:'pending'}) ;
                res.status(200).json({message:'created',candidate:newCandi});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:'server error...'})
    }
};




export const getCAndidates = async (req,res) => {
    try {
        const {search='',status,sort='createdAt',order='asc'} = req.query;

        const orCondition = [
                    {name:{$regex:search,$options:'i'}},
                    {email:{$regex:search,$options:'i'}},
                    {jobRole:{$regex:search,$options:'i'}},
                    { contactInfo: { $regex: search,$options:'i'}},
                    {status:{$regex:search,$options:'i'}},
                ];


        const matchobj ={
            $match:{
                    $or: orCondition
            }
        };
        const sortObj = {
                 $sort:{[sort] : order== 'asc'?1:-1}
        }
        if (status) 
                matchobj.$match.status = status;

        const agg = [matchobj,sortObj]
        const rearchdResult = await CandiModel.aggregate(agg)

        res.status(200).json({
            rearchdResult
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:'server error...'})
    }
};

export const updateCandidateById = async (req, res) => {  //console.log(req.body,req.params);

    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'Please provide candidate ID' });
        }
        if (!status) {
            return res.status(400).json({ message: 'Please provide status to update' });
        }
        const updatedCandidate = await CandiModel.findByIdAndUpdate(id,{status},{new: true,runValidators:true});
        if (!updatedCandidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        res.status(200).json({
            message: 'Status updated successfully',
            candidate: updatedCandidate
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error...' });
    }
};



export const deleteCandidateById = async (req,res) => { // console.log('delete req');

    try {
        const{id} = req.params;
        if(!id)
            return res.status(400).json({messsage:'Plese provide the candidateid'});
        const deleteUser = await CandiModel.findByIdAndDelete(id);
        if(deleteUser)
            res.status(200).json({message:'deleted Successfully'})
        else
             res.status(404).json({message:'Candidate not found...'})

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:'server error...'})
    }
}