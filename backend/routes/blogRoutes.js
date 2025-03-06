import express from 'express';
import {
    getAllBlogController,
    getBlogByIdController,
    createBlogController,
    deleteBlogByIdController,
    updateBlogByIdController,
    userBlogController
} from '../controllers/BlogController.js';

const router = express.Router();

//get all blog
router.get('/all-blog', getAllBlogController);

//get single blog
router.get('/single-blog/:id', getBlogByIdController);

//create -blog
router.post('/create-blog', createBlogController);

//delete-blog
router.delete('/delete-blog/:id', deleteBlogByIdController);

//update-blog
router.put('/update-blog/:id', updateBlogByIdController);

//get user blog
router.get('/user-blog/:id',userBlogController);

export default router;