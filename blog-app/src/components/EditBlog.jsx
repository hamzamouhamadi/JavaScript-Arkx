import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function EditBlog(props) {
  const { id } = useParams();
  const blog = props.blogs.find((b) => b.id == id)
  const [Newtitle, setNewTitle] = useState(blog.title);
  const [Newdescription, setNewDescription] = useState(blog.description);

  
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
      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Title
          </label>
          <input
            type="text"
            value={Newtitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <textarea
            value={Newdescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>

        <Link to="/">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleEdit}
          >
            Save
          </button>
        </Link>
      </form>
    </div>
  );
}
