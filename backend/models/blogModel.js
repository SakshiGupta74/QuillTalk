import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "title is required"]
    },
    description: {
        type: String,
        require: [true, "description is required"]
    },
    image: {
        type: String,
        require: [true, "image is required"]
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        require:[true,'userId is require']
    }
},
    { timestamp: true }
);

const blogModel = mongoose.model("blog", blogSchema);

export default blogModel;