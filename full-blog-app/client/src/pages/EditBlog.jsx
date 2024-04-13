import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { fetchPosts } from "../Slices/BlogSlice";
import { editpost } from "../Slices/BlogSlice";
import { connect } from "react-redux";

function EditBlog({ posts, editpost, fetchPosts }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  useEffect(() => {
    // Charge les données du post à éditer lorsque le composant est monté
    // Utilisez l'action fetchPosts pour récupérer tous les posts, puis trouvez le post spécifique à modifier
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    // Une fois que les posts ont été chargés, trouvez le post spécifique à modifier
    const postToEdit = posts.find(post => post._id === id);
    if (postToEdit) {
      setBlogData({
        title: postToEdit.title,
        category: postToEdit.category,
        content: postToEdit.content
      });
    }
  }, [posts, id]);
  const handleSubmit = (e) => {
    e.preventDefault();
   editpost(id, blogData);
   navigate('/')
 };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:5000/post/update/${id}`,blogData
  //     );
  //     console.log(response.data);
  //     navigate("/");
  //   } catch (error) {
  //     console.error(error);
  //     // Handle errors, e.g., show an error message
  //   }
  // };

  return (
    <div>
      <NavBar />
      <section class="bg-white dark:bg-gray-900 ">
        <div class="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 class="mb-4 text-xl font-bold text-gray-900 text-center">
            Update product
          </h2>
          <form action="PUT" onSubmit={handleSubmit}>
            <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5  border border-gray-300 p-10 rounded shadow-2xl">
              <div class="sm:col-span-2">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  value={blogData.title}
                  onChange={handleChange}
                  placeholder="Update Title of your blog"
                  required=""
                />
              </div>

              <div>
                <label
                  for="category"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={blogData.category}
                  onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="Technologie">Technologie</option>
                  <option value="Cinema">Cinema</option>
                  <option value="Football">Football</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Sience">Sience</option>
                </select>
              </div>
              <div class="sm:col-span-2">
                <label
                  for="description"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="content"
                  value={blogData.content}
                  onChange={handleChange}
                  rows="8"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Update Your blog description here..."
                ></textarea>
              </div>
            </div>
            <div class="flex items-center justify-center space-x-4">
              <button
                type="submit"
                class="text-white bg-blue-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Update Blog
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
});

const mapDispatchToProps = (dispatch) => ({
  editpost: (postId, blogData) => dispatch(editpost(postId, blogData)),
  fetchPosts: () => dispatch(fetchPosts()), // Ajout de fetchPosts aux props
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBlog);
