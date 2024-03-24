import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AddBlog(props) {
  const [title, settitle] = useState("")
  const [description, setdescription] = useState("")
  const Id = props.blogs.length + 1
  function addblog(){
    props.setblogs([...props.blogs,{id : Id,title: title, description: description}])
  }
  return (
    <div>
        <form class="max-w-sm mx-auto">
        <div class="mb-5">
          <label
            for=""
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="title"
            value={title}
            onChange={(e)=>settitle(e.target.value)}
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder=""
            required
          />
        </div>
        <div class="mb-5">
          <label
            for=""
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <input
            type="text"
            name='description'
            value={description}
            onChange={(e)=>setdescription(e.target.value)}
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder=""
            required
          />
        </div>

        <Link to="/">
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={addblog}
        >
          Add blog
        </button></Link>
      </form>
    </div>
  )
}
