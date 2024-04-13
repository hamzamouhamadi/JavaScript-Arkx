import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function BlogDetails() {
    const {id} = useParams()
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBlogDetails = async()=>{
        try {
          const res = await axios.get(`http://localhost:5000/post/${id}`,{ withCredentials: true });
          if(!res.data){
            throw new Error ('APi response data is empty')
          }
          setBlogs(res.data)
        } catch (error) {
          setError(error.message)
        } finally {
          setIsLoading(false);
        }
      };
    
      useEffect(() => {
        fetchBlogDetails();
      }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {blogs.map((blog,index)=>(
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden" key={index}>
        <div className="p-8">
          <img className="w-full h-64 object-cover" src={blog.image.url} alt="" />
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm font-semibold text-gray-500 underline">{blog.category}</span>
            <span className="text-sm font-semibold text-gray-500">{blog.publicationDate}</span>
          </div>
          <h1 className="text-3xl font-bold mt-4">{blog.title}</h1>
          <p className="text-gray-500 mt-2">{blog.content}</p>
        </div>
      </div>
      ))}
    </div>
  )
}
