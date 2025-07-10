import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'plese provide name'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'please proide email'],
    lowercase: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'enter a valid email address',
    },
  },
  orgName: {
    type: String,
    trim: true,
    default:''
  },
  role:{
    type:String,
    default:'admin',
    trim:true
  },
  
  contactInfo: {
    type: String,
    required: [true, 'Contact info is required'],
    trim: true,
    minLength: [10, 'Contact info must be at least 10 characters'],
  }
}, {
  timestamps: true,
});

export const UserModel = mongoose.model('user', UserSchema);


