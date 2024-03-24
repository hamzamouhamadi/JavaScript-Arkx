import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function EditBlog(props) {
    const {id} = useParams();
    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    
    
    function handleEdit() {
        const blog = props.blog.find(item=>item.id == id)
        const {title,description} = blog;
        props.setBlogs([
          ...props.blogs,
          {
            id: blog.id,
            title: title,
            description: description
          }
        ]);
      }
      
  return (
    <div>
        <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            for=""
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title 
          </label>
          <input
            type="text"
            name='title'
            value={title}
            onChange={(e)=>settitle(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="mb-5">
          <label
            for=""
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            type="text"
            name='description'
            value={description}
            onChange={(e)=>setdescription(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>

        <Link to="/">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleEdit}
        >
          Save
        </button>
        </Link>
      </form>
    </div>
  )
}
