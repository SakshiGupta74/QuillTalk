import React, { useEffect, useState } from 'react';
import logo from './assets/quilltalk-Photoroom.svg';
import { useNavigate } from 'react-router-dom';
import profile from './Profile.js';
import axios from 'axios';
import BlogCard from './components/BlogCard.js';

function AllBlog() {
  const [blogs, setBlogs] = useState([])

  //get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/blog/all-blog');
      if (data?.success) {
        setBlogs(data?.blogs)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllBlogs();
  }, [])
  const navigate = useNavigate();
  const onprofile = async (e) => {
    setTimeout(() => {
      navigate('/profile')
    }, 1000)
  }
  const onBack = async (e) => {
    setTimeout(() => {
      navigate('/MyBlog')
    }, 1000)
  }
  return (

    <div className=' bg-teal-500 min-h-[87.4vh]'>
      <div className='pt-16'>
        {blogs && blogs.map((blog) =>
          <BlogCard title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.name}
            time={blog.createdAt} />
        )}

      </div>
      
        <button
          className="absolute top-2 right-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-red-500 hover:text-white active:bg-red-700 font-medium"
          onClick={onBack}
        >
          BACK
        </button>
      </div>

  




  );
}

export default AllBlog;