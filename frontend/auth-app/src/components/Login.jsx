// src/components/Login.js
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import toast from 'react-hot-toast';


const Login = () => {
    const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8055/auth/login', {
        email,
        password,
      });
      
      const userResponse = await axios.get('http://localhost:8055/users/me', {
        headers: {
          Authorization: `Bearer ${response.data.data.access_token}`,
        },
      });
      localStorage.setItem('userId',userResponse.data.data.id);
      localStorage.setItem('authToken', response.data.data.access_token);
    //   const token=localStorage.getItem('authToken');
    //   const userId=localStorage.getItem('userId');
    //   console.log(token);
    //   console.log(userId);
    // console.log(userResponse);
    toast.success('Successfully Logged in');
    setTimeout(()=>{
      navigate('/home');
    },2000);
      // navigate('/home');
      // Redirect or set user state
    } catch (err) {
      toast.error('Invalid login credentials');
      console.log(err);
      
    }
  };

  return (
    <>
    
    <Navigation/>
<div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 my-28 mx-auto">
    <form className="space-y-6" onSubmit={handleSubmit}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to DELI</h5>
        <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
        </div>
        <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        <div className="flex items-start">
            <a href="/forgot-password" className="ms-auto text-sm text-green-700 hover:underline dark:text-green-500">Lost Password?</a>
        </div>
        <button type="submit" className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Log In</button>
    </form>
</div>
    <Footer/>
    </>
  );
};

export default Login;
