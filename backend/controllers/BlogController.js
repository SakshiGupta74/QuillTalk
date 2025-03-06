import mongoose from 'mongoose';
import blogModel from "../models/blogModel.js";
import User from "../models/User.js";


//get all-blog
export const getAllBlogController = async(req,res)=>{
       try{
        const blogs = await blogModel.find({}).populate("user");
        if(!blogs){
            return res.status(200).send({
                success:'false',
                message:'No Blog Found',
            })
        }
        return res.status(200).send({
            success:'true',
            countBlog:blogs.length,
            message:'All Blogs Lists',
            blogs,
        })

       }catch(error){
        console.log(error);
        res.status(500).send({
            success:'false',
            message:'Error while getting Blogs',
            error,
        })
       }
}

//get single-blog
export const getBlogByIdController = async(req,res)=>{
    try{
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        if(!blog){
            return res.status(200).send({
                success:'false',
                message:'No Blog Found from this id'
            })
        }
        return res.status(200).send({
            success:'true',
            message:'Blog Found from this id',
            blog,
        })

    }catch(error){
        console.log(error);
        return res.status(400).send({
            success:'false',
            message:'Error while gettin Single Blog',
            error,
        })
    }

}

//create-blog
export const createBlogController = async(req,res)=>{
   try{
    const {title,description,image,user}  = req.body;
    console.log(req.body);
    //validation
    if(!title || !description || !image || !user){
        return res.status(201).send({
            success:'false',
            message:'All Fields ara required',
        })
    }

    const existingUser = await User.findById(user);

    if(!existingUser){
        return res.status(404).send({
            success:'false',
            message:'unable to find user'
        })
    }


    const newBlog = new blogModel({title,description,image,user})
    const session  = await mongoose.startSession()
    session.startTransaction()
    await newBlog.save({session})
    existingUser.blogs.push(newBlog)
    await existingUser.save({session})
    await session.commitTransaction();

    await newBlog.save();
    return res.status(400).send({
        success:'true',
        message:'Blog Created',
        newBlog,
    })

   }catch(error){
    console.log(error);
    res.status(400).send({
        success:'false',
        message:'Error while creating a blog',
        error,
    })
   }
}

//delete-blog
export const deleteBlogByIdController = async(req,res)=>{
    try{
         const blog  = await blogModel.findByIdAndDelete(req.params.id).populate("user");
         console.log(blog);
         await blog.user.blogs.pull(blog);
         await blog.user.save()
        return res.status(200).send({
            success:'true',
            message:'Blog Deleted successfully',
        })

    }catch(error){
        console.log(error)
        return res.status(400).send({
            success:"false",
            message:'Error while delete the record',
            error,
        })
    }

}

//update-blog
export const updateBlogByIdController = async(req,res)=>{
    try{
        const {id} = req.params;
        const{title,description,image} = req.body;
        const blog = await blogModel.findByIdAndUpdate(id,{...req.body},{new:true})
        return res.status(200).send({
            success:'true',
            message:'Blog Updated',
            blog,
        })

    }catch(error){
        console.log(error);
        return res.status(400).send({
            success:'false',
            message:'Error while updating Blog',
            error,
        })
    }

}

export const userBlogController = async(req,res)=>{
    try{

        const userBlog = await User.findById(req.params.id).populate("blogs");
        if(!userBlog){
            return res.status(404).send({
                success:'false',
                message:'blogs not found with this id',
            });
        }
        return res.status(200).send({
            success:'true',
            message:'user blogs',
            userBlog,
        });
    }catch(error){
        console.log(error);
        res.status(400).send({
            success:'false',
            message:"error in user blog",
            error
        })
    }
}