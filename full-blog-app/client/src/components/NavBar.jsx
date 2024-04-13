import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../Slices/UserSlice";

export default function NavBar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.users.loggedIn);
  const location = useLocation();
  const handleLogOut = () => {
    dispatch(logout());
    navigate('/')
    // Vous pouvez ajouter une logique ici pour gérer les redirections ou afficher un message de succès en fonction du résultat du login
  };

  return (
    <div>
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/">
            <a
              href=""
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <span className="self-center text-2xl font-semibold whitespace-nowrap  border-b-4  border-blue-600 border-l-4">
                BLOG<span className="bg-blue-600 p-0 rounded ">Me</span>
              </span>
            </a>
          </Link>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
      
              <li>
                <Link to="/">
                  <a
                    href="#"
                    className={`hover:border-b-2 ${window.location.pathname === '' ? 'border-blue-600' : 'hover:border-b-2 border-blue-600'}`}
                    aria-current="page"
                  >
                    Home
                  </a>
                </Link>
              </li>
                  {!loggedIn ? 
                  <>
                  
                  <li>
                    <Link to="/authors">
                      <a
                        href="#"
                        className={`py-2 px-3 text-gray-900 md:p-0 ${location.pathname === '/authors' ? 'border-b-2 border-blue-600' : 'hover:border-b-2 border-blue-600'}`}
                      >
                        Authors
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/signin">
                      <a
                        href="#"
                        className={`py-2 px-3 text-gray-900 md:p-0 ${location.pathname === '/signin' ? 'border-b-2 border-blue-600' : 'hover:border-b-2 border-blue-600'}`}
                      >
                        Sign In
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup">
                      <a
                        href="#"
                        className={`py-2 px-3 text-gray-900 md:p-0 ${location.pathname === '/signup' ? 'border-b-2 border-blue-600' : 'hover:border-b-2 border-blue-600'}`}
                      >
                        Sign Up
                      </a>
                    </Link>
                  </li>
                  
                  </>
                  :
                  <>
                  

                  <li>
                    <Link to="/addBlog">
                      <a
                        href="#"
                        className={`py-2 px-3 text-gray-900 md:p-0 ${location.pathname === '/addBlog' ? 'border-b-2 border-blue-600' : 'hover:border-b-2 border-blue-600'}`}
                      >
                        Add Blog
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/authors">
                      <a
                        href="#"
                        className={`py-2 px-3 text-gray-900 md:p-0 ${location.pathname === '/authors' ? 'border-b-2 border-blue-600' : 'hover:border-b-2 border-blue-600'}`}
                      >
                        Authors
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/MyBlogs">
                      <a
                        href="#"
                        className={`py-2 px-3 text-gray-900 md:p-0 ${location.pathname === '/MyBlogs' ? 'border-b-2 border-blue-600' : 'hover:border-b-2 border-blue-600'}`}
                      >
                        My Blogs
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/Profile">
                      <a
                        href="#"
                        className={`py-2 px-3 text-gray-900 md:p-0 ${location.pathname === '/Profile' ? 'border-b-2 border-blue-600' : 'hover:border-b-2 border-blue-600'}`}
                      >
                        Profile
                      </a>
                    </Link>
                  </li>
                    <li>
                        <a
                          href="#"
                          className="block py-2 px-3 text-gray-900 hover:border-b-2 border-blue-600  md:hover:bg-transparent md:border-0  md:p-0 cursor-pointer"
                          onClick={handleLogOut}
                        >
                          Logout
                        </a>
                    </li>
                  
                  </>
                  }





            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
