import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [showModal, setShowModal] = useState(false);
  function toggleModal() {
    setShowModal(!showModal);
  }
  
  const Navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState({
    username :"",
    email:""
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsers({ ...users, [name]: value });
  };
  const API_URL = "http://localhost:5000/profile";
  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(API_URL, { withCredentials: true });
      if (!res.data) {
        throw new Error("APi response data is empty");
      }
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/update`,users
      );
      console.log("response",response.data);
      Navigate("/Profile");
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {user.map((user, index) => (
          <div
            className="max-w-md w-full bg-white rounded-lg shadow-md  mx-auto"
            key={index}
          >
            <div className="flex flex-col items-center px-6 py-4">
              <img
                className="w-24 h-24 rounded-full mb-4"
                src="https://st5.depositphotos.com/3848923/67880/i/450/depositphotos_678806178-stock-photo-cute-man-cartoon-white-background.jpg"
                alt="Profile Picture"
              />
              <p className="text-xl leading-tight mb-2">{user.username}</p>
              <p className="text-sm leading-tight text-gray-600 mb-4">
                {user.email}
              </p>
            </div>
            <div className="border-t border-gray-200">
              <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-b-lg " onClick={toggleModal}>
                Update Profile
              </button>
            </div>
          </div>
        ))}
      </div>
      
          {showModal && (
            <div id="crud-modal" tabindex="-1"  class=" overflow-y-auto  fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-md max-h-full">
                
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            Update Profile
                        </h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={toggleModal}>
                            <svg class="w-3 h-3"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
        
        
                    <form class="p-4 md:p-5" onSubmit={handleSubmit}>
                        <div class="grid gap-4 mb-4 grid-cols-2">
                            <div class="col-span-2">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" name="username" value={users.username} onChange={handleChange} id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"  placeholder="" required=""/>
                            </div>
                            <div class="col-span-2">
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="email" value={users.email} onChange={handleChange} id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"  placeholder="" required=""/>
                            </div>
                        </div>
                        
                        <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div> 
          )}
    </div>
  );
}
