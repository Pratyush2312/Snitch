import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    passwordHash:{
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'seller'],
        default: 'user'
    },
    refreshToken: {
        type: String
    }

}); 

const User=mongoose.model('Users', userSchema);
export default User;