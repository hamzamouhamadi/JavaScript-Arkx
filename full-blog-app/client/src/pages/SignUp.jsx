import { useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { Link, useNavigate } from "react-router-dom";
export default function SignUp() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/register', user);
      console.log('Signup successful', res.data);
      navigate('/signin')
      // Optionally, you can redirect the user to another page upon successful signup
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <NavBar/>
      <div class="flex min-h-screen items-center justify-center">
        <div class="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
          <h4 class="block font-sans text-center text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            Sign Up
          </h4>
          <form
            class="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div class="mb-4 flex flex-col gap-6">
              <div class="relative h-11 w-full min-w-[200px]">
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  class="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-600 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=""
                />
                <label htmlFor="username"  class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Name
                </label>
              </div>
              <div class="relative h-11 w-full min-w-[200px]">
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  class="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-600 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=""
                />
                <label htmlFor="email" class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Email
                </label>
              </div>
              <div class="relative h-11 w-full min-w-[200px]">
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  class="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-600 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=""
                />
                <label htmlFor="password" class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Password
                </label>
              </div>
            </div>

            <button
              class="mt-6 block w-full select-none rounded-lg bg-blue-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>
            <p class="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
              Already have an account?
              <Link to="/signin">
              <a
                class="font-semibold text-blue-600 transition-colors hover:text-blue-700"
                href="#"
              >
                Sign In
              </a>
              </Link>
            </p>
          </form>
          {error && <p>{error}</p>}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
