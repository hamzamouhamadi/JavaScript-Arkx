import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";
import { addPost } from "../Slices/BlogSlice";
import { connect, useDispatch, useSelector } from "react-redux";

function AddBlog({addPost}) {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const user = useSelector(state=>state.users.user)
  //console.log(user);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('image', file);
    formData.append('authorId', user._id);
    console.log("formdata",formData);
    //   var data = {...formData, authorId:user._id}
      addPost(formData);
      
    navigate('/')
  };
  
  return (
    <div>
      <NavBar />
      <section className="bg-white dark:bg-gray-900 ">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 text-center">
            Add Blog
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5  border border-gray-300 p-10 rounded shadow-2xl">
              <div className="sm:col-span-2">
                <label htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Title of your blog"
                  required=""
                />
              </div>

              <div>
                <label
                htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={handleCategoryChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="Technologie">Technologie</option>
                  <option value="Cinema">Cinema</option>
                  <option value="Football">Football</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Sience">Sience</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="content"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={content}
                  onChange={handleContentChange}
                  rows="8"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Write a blog description here..."
                ></textarea>
              </div>
              <div>
              <label htmlFor="image">Image:</label>
            <input type="file" id="image" name="image" onChange={handleFileChange} accept="image/*"></input>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <button
                type="submit"
                className="text-white bg-blue-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Add Blog
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}

const mapDispatchToProps = {
  addPost, // This will automatically bind the addPost action creator to the component's props
};

export default connect(null, mapDispatchToProps)(AddBlog);
                  // const [error, setError] = useState(null);
                  // const [isLoading, setIsLoading] = useState(false);
                
                  // const handleSubmit = async (e) => {
                  //   e.preventDefault();
                  //   const formData = new FormData();
                  //   formData.append('title', title);
                  //   formData.append('content', content);
                  //   formData.append('category', category);
                  //   formData.append('image', file);
                  //   setError(null);
                  //   setIsLoading(true);
                
                  //   try {
                  //     const response = await axios.post(
                  //       "http://localhost:5000/post/addPost",
                  //       formData,{
                  //         headers: {
                  //           'Content-Type': 'multipart/form-data'
                  //         }
                  //       }
                  //     );
                  //     console.log("Blog added successfully:", response.data);
                  //     navigate('/')
                  //   } catch (error) {
                  //     setError(error.response.data.message);
                  //   } finally {
                  //     setIsLoading(false);
                  //   }
                  // };