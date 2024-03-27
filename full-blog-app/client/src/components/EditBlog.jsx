import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function EditBlog(props) {
  const { id } = useParams();
  const blog = props.blogs.find((b) => b.id == id)
  const [Newtitle, setNewTitle] = useState("");
  const [Newdescription, setNewDescription] = useState("");

  
  function handleEdit() {
    const index = props.blogs.findIndex(blog => blog.id == id);
    console.log("Your andex is : ",index);
    if (index !== -1) {
      const updatedBlogs = [...props.blogs];
      updatedBlogs[index] = {
        ...updatedBlogs[index],
        title: Newtitle,
        description: Newdescription
      };
      props.setblogs(updatedBlogs);
    }
  }

  return (
    <div>
          <div class="bg-white shadow p-4 py-8">
        <div class="heading text-center font-bold text-2xl m-5 text-gray-800 bg-white">Update Blog</div>
        <div class="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
            <input class="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" name='Newtitle' value={Newtitle} onChange={(e)=>setNewTitle(e.target.value)} type="text"/>
            <textarea class="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"  name='Newdescription' value={Newdescription} onChange={(e)=>setNewDescription(e.target.value)} ></textarea>
            <div class="buttons flex justify-end">
                <Link to="/"><div onClick={handleEdit} class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Update</div></Link>
            </div>
        </div>
    </div>
    </div>
  );
}
