import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { fetchUsersPosts ,fetchPosts} from "../Slices/BlogSlice";
import { connect } from "react-redux";
function UserPosts({fetchUsersPosts,loading,error,posts}) {
  const {id} = useParams();
    useEffect(() => {
    // Charge les données du post à éditer lorsque le composant est monté
    // Utilisez l'action fetchPosts pour récupérer tous les posts, puis trouvez le post spécifique à modifier
    fetchUsersPosts(id);
  }, []);

  useEffect(() => {
    // Une fois que les posts ont été chargés, trouvez le post spécifique à modifier
      posts.find(post => post._id === id);
  }, [posts, id]);

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }

  return (
    <div>
      <NavBar />
      {loading ? (
        <div class="grid h-screen place-items-center">
        <div role="status">
            <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
    </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <section class="bg-white dark:bg-gray-900">
          <div class="mx-auto max-w-screen-sm text-center  mt-8">
            <h2 class=" text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              My Blogs
            </h2>
          </div>
          
            {posts?.length !== 0 ? 
              (<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 grid gap-8 grid-cols-3">
            
              {posts.map((blog) => (
                <div class="">
                  <article class="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
                    <a href="#">
                      <img className="rounded-t-lg h-32 w-60" src={blog.image.url}alt="" />
                    </a>
                    <span className="text-sm font-semibold text-gray-500 underline">{blog.category}</span>  
                    <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <a href="#">{blog.title}</a>
                    </h2>
                    <p class="mb-5 h-20 font-light text-gray-500 dark:text-gray-400">
                      {truncateText(blog.content, 100)}
                    </p>
                    
                    <div class="flex justify-between items-center">
                      <div class="flex items-center space-x-4">
                        <img
                          class="w-7 h-7 rounded-full"
                          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                          alt="Jese Leos avatar"
                        />
                        <span class="font-medium ">Hamza </span>
                      </div>
                      <Link to={`/BlogDetails/${blog._id}`}>
                      <a
                        href="#"
                        class="inline-flex items-center font-medium  hover:underline text-blue-600"
                      >
                        Read more
                      </a>
                      </Link>
                    </div>
                  </article>
                </div>
              ))}
            
              </div>)
            :
            <p className="text-center mt-20 text-4xl">THERE IS NO BLOGS FOR THIS AUTHOR .<span className="text-red-600">!</span></p>
            }
        </section>
      )}
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  loading: state.posts.loading,
  error: state.posts.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsersPosts: (postId) => dispatch(fetchUsersPosts(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);