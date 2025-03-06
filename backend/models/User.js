import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    blogs: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'blog',
            require:[true]
        }
    ]
},
    { timestamp: true }
);

const User = mongoose.model('User', UserSchema);

export default User;
