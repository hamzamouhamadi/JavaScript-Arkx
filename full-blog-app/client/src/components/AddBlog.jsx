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
    <div class="bg-white shadow p-4 py-8">
        <div class="heading text-center font-bold text-2xl m-5 text-gray-800 bg-white">New Blog</div>
        <div class="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
            <input class="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellcheck="false" name='title' value={title} onChange={(e)=>settitle(e.target.value)} placeholder="Title" type="text"/>
            <textarea class="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" spellcheck="false" name='description' value={description} onChange={(e)=>setdescription(e.target.value)} placeholder="Describe everything about this post here"></textarea>
            <div class="buttons flex justify-end">
                <Link to="/"><div onClick={addblog} class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Post</div></Link>
            </div>
        </div>
    </div>
  )
}
