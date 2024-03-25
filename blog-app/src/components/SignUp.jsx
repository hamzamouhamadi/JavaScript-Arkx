import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from 'react-router-dom';
import { useState } from 'react';


export default function SignUp(){
const schema = z.object({
  name: z.string().nonempty().min(3),
  email: z.string().email(),
  password: z.string().min(5),
});


  const handelChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setdata({...data,[name]:value})
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    // Handle form submission with validated data
    console.log(data);
    props.setusers([...props.users,data])
  };

  return (
    <div>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label
            for=""
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Full Name
          </label>
          <input
            type="text"
            {...register('name')}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Your full name"
            required
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className="mb-5">
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"

            {...register('email')}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@kkkkkk.com"
            required
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="mb-5">
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            {...register('password')}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register
          </button>
      </form>
    </div>
  );
}
