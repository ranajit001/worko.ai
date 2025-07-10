import mongoose from "mongoose";

const CandiSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email is required'],
    lowercase: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'enter a valid email address',
    },
  },  
contactInfo: {
    type: String,
    required: [true, 'Contact info is required'],
    trim: true,
    minLength: [10, 'Contact info must be at least 10 characters'],
  },
  jobRole:{
    type:String,
    trim:true,
    enum:{
        values:['frontend','backend','fullstack'],
        message:'Please select the job role'
    },
    required:true,
  },
  resume:{
    type:String,
    trim:true,
  },
    status:{
        type:String,
        trim:true,
        enum:{
            values:['pending', 'reviewed', 'hired','rejected'],
            message:'Plesase select a valifd option',
            default:'pending'
        }
    }
}, {
  timestamps: true,
});


export const CandiModel = mongoose.model('candidate',CandiSchema)