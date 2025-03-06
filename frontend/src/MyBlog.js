import react, { useEffect, useState } from 'react';
import logo from './assets/quilltalk-Photoroom.svg';
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import BlogCard from './components/BlogCard.js';
import axios from 'axios';


function MyBlog(){
    const [blogs,setBlogs] = useState([]);
    const [userName, setUserName] = useState('');

    //get userblog
    const getUserBlogs = async() =>{
        const userId = localStorage.getItem('userId');
        console.log(userId); // Retrieve userId from localStorage
        if (userId) {
            try {
              const { data } = await axios.get(`http://localhost:4000/blog/user-blog/${userId}`);
              console.log(data);
              if (data?.success) {
                setBlogs(data?.userBlog.blogs);
                setUserName(data?.userBlog.name);  // Store blogs in state
              }
            }
         catch (error) {
            console.error('Error fetching user blogs:', error.message);
        }
    }
    };


    useEffect(() =>{
    
        getUserBlogs();  // Pass the userId to fetch the user's blogs
    
    },[])
    const navigate = useNavigate();
    const onprofile = async (e) =>{
      setTimeout(() => {
        navigate('/profile')
    }, 1000)
    }
    const onAllBlog = async (e) =>{
      setTimeout(() => {
        navigate('/AllBlog')
    }, 1000)
    }
    const onCreateBlog = async (e) =>{
      setTimeout(() => {
        navigate('/CreateBlog')
    }, 1000)
    }
    const onDeleteBlog = async (e) =>{
      setTimeout(() => {
        navigate('/DeleteBlog')
    }, 1000)
    }
return(
        <div className='bg-white'>
        
              <header className="relative inset-x-0 top-0 bottom-0">
                <nav className="flex items-center justify-between p-4 sm:px-4 py-2 bg-grey-800" aria-label="Global">
                  <div className="flex lg:flex-1">
                    <a href="#" className="block">
                      <img
                        className="h-20 w-20 transition-transform transform hover:scale-110 active:scale-90"
                        src={logo}
                        alt="Logo"
                      />
                    </a>
                  </div>
        
                  {/* Navigation Links */}
                  <div className="flex items-center gap-x-6">
                    <div  className="text-teal-500 font-semibold underline">
                      My Blog
                    </div>
                    <a href="#" className="text-black-500 font-semibold hover:underline hover:text-teal-500" onClick={onAllBlog}>
                      All Blog
                    </a>
                    <a href="#" className="text-black-500 font-semibold hover:underline hover:text-teal-500" onClick={onCreateBlog}>
                      Create Blog
                    </a>
                    
                    <div onClick={onprofile}>
                    <FaUser className='className="text-custom-xl cursor-pointer hover:text-red-500' />
                    </div>
                  </div>
                </nav>
              </header>
              <div className='bg-teal-500 min-h-[87.4vh]'>
                <div className='pt-16'>
                        {blogs && blogs.map((blog) =>
                          <BlogCard title={blog.title}
                            description={blog.description}
                            image={blog.image}
                            username={userName}
                            time={blog.createdAt} />
                        )
                        }
                  console.log(username);
               
                </div>
              

              </div>
        </div>

    );
}



export default MyBlog;