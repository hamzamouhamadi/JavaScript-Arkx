import React, { useEffect, useState } from "react";

export default function SignIn(props) {
  
  const [loged, setloged] = useState(false);
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const [value, setValue] = useState('')

  const handelChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setdata({ ...data, [name]: value });
  };

  function handelSubmit(event) {
    event.preventDefault();
    let user = props.users.find(
      (user) => user.email == data.email && user.password == data.password
    );
    if (user) {
      setloged(!loged);
      console.log(loged);
    } else {
      alert("User not found");
      console.log(loged);
    }
    localStorage.setItem('myValue', value);
    alert('Value saved successfully!');
  }

  useEffect(() => {
    if (loged) {
      window.location.href = "/logedhome";
    }
  }, [loged]);
    // useEffect to fetch the stored value from localStorage on component mount
    useEffect(() => {
      const storedValue = localStorage.getItem('myValue');
      if (storedValue) {
        setValue(storedValue);
      }
    }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      <form className="max-w-sm mx-auto" onSubmit={handelSubmit}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handelChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@kkk.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handelChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="value"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your name
          </label>
          <input
            type="text"
            name="value"
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Log in
          </button>
      </form>
    </div>
  );
}
