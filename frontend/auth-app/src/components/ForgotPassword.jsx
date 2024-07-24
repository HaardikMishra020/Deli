// src/components/ForgotPassword.js
import  { useState } from 'react';
import axiosInstance from '../api/axios';
import Navigation from './Navigation';
import Footer from './Footer';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/auth/password/request', { email:email,reset_url:`http://localhost:5173/new-password/`});
      toast.success('Password Reset mail has been sent to your email')
    } catch (error) {
      console.log(error);
      toast.error('Failed to send reset link');
    }
  };

  return (
    <>
    <Navigation/>
    
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 my-28 mx-auto">
    <form className="space-y-6" onSubmit={handleSubmit}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Forgot Password </h5>
        <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
        </div>
        <button type="submit" className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Send Reset Link</button>
    </form>
</div>
<Footer/>
</>
  );
};

export default ForgotPassword;
