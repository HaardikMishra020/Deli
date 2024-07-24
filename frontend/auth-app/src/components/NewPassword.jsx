
import  { useState } from 'react';
import axiosInstance from '../api/axios';
import Navigation from './Navigation';
import Footer from './Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const NewPassword = () => {
    const location = useLocation();
    const navigate=useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // const [email, setEmail] = useState('');
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      try {
        await axiosInstance.post('/auth/password/reset', { token, password });
        toast.success('Password reset successfully');
        setTimeout(()=>{
          navigate('/login');
        },2000);
        
      } catch (error) {
        toast.error('Failed to reset password');
      }
  
  };

  return (
    <>
    <Navigation/>
    
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 my-28 mx-auto">
    <form className="space-y-6" onSubmit={handleSubmit}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Reset Password </h5>
        <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
        </div>
        <button type="submit" className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Reset Password</button>
    </form>
</div>
<Footer/>
</>
  );
};

export default NewPassword;
