import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { fetchUsers } from "../Slices/UserSlice";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../Slices/BlogSlice";
function Users({users,loading,error}) {
  //const [users, setUsers] = useState([]);
  const posts = useSelector(state=>state.posts.posts)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchUsers())
    //dispatch(fetchPosts())
  },[dispatch])
  // const postCount =(id)=>{
  //   const count = posts.find(post => post._id === id)?.length;
  //   return count
  // }
  // const user = ()=>{
  //   users.map(u=>u._id)
  // }
  // const fetchUsers = async () => {
  //   try {
  //     const res = await axios.get(`http://localhost:5000/allUsers`);
  //     if (!res.data) {
  //       throw new Error("APi response data is empty");
  //     }
  //     setUsers(res.data);
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  return (
    <div>
      <NavBar />
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
          <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Authors
            </h2>
            <p class="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
              Here you can see the blogs of each author.
            </p>
          </div>
          <div class="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
            {users.map((user) => (
              <div class="items-center justify-between bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                <div className="flex ">
                <Link to={`/UserBlogs/${user._id}`}>
                  <a href="#">
                    <img
                      class="w-20 rounded-lg sm:rounded-none sm:rounded-l-lg"
                      src="https://st5.depositphotos.com/3848923/67880/i/450/depositphotos_678806178-stock-photo-cute-man-cartoon-white-background.jpg"
                      alt="User Avatar"
                    />
                  </a>
                </Link>
                <div class="p-5">
                  <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <a href="#">{user.username}</a>
                  </h3>
                   <span class="text-gray-500 dark:text-gray-400">
                    {user.email}
                  </span>
                  {/*
                  <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                    Michael drives the technical strategy of the flowbite
                    platform and brand.
                  </p> */}
                  <ul class="flex space-x-4 sm:mt-0">
                    <li>
                      <a
                        href="https://web.facebook.com/mainmouhamadihamza"
                        class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                      >
                        <svg
                          class="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>
 
                    <li>
                      <a
                        href="https://github.com/hamzamouhamadi"
                        class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                      >
                        <svg
                          class="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>
 
                  </ul>
                </div>
                </div>
                <p className=" mr-2">....</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

const mapStateToProps = state => ({
  users: state.users.Users,
  loading: state.users.loading,
  error: state.users.error
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
