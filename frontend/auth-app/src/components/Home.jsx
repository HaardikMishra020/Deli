import axios from "axios";
import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Home = () => {
    const productByIds=async(id)=>{
        try {
            const authToken=localStorage.getItem('authToken');
            const response = await axios.get(`http://localhost:8055/items/products/${id}`,{
                headers:{
                    Authorization:`Bearer ${authToken}`
                },
            });
            return response.data.data;
          } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
          }
        
    }
    const [data,setData]=useState([]);
    useEffect(()=>{
        const fetch=async()=>{
            const authToken=localStorage.getItem('authToken');
            const userId=localStorage.getItem('userId');
            const ress=await axios.get('http://localhost:8055/items/orders',{
                headers:{
                    Authorization:`Bearer ${authToken}`
                },
                params: {
                    filter: {
                      user_id: {
                        _eq: userId,
                      },
                    },
                  },
            });
            const productIds=ress.data.data.map(product=>product.product_id);
            const productPromises = productIds.map(id => productByIds(id));
            const products = await Promise.all(productPromises);
            setData(products);
            console.log(products);

        }
        
        fetch();
    },[]);
  return (
    <>
    <Navigation isLogged={true}/>
    <div>
      <h1 className=" w-4/5 mt-10 mx-auto text-4xl font-extrabold leading-none tracking-tight text-gray-900">Orders</h1>
      

<div className="relative overflow-x-auto  sm:rounded-lg">
    <table className="w-4/5 text-sm text-left shadow-md rtl:text-right text-gray-500 dark:text-gray-400 my-5 mx-auto">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                
            </tr>
        </thead>
        <tbody>
        {data.map(data => (
            <tr key={data.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {data.name}
                </th>
                <td className="px-6 py-4">
                    {data.description}
                </td>
                <td className="px-6 py-4">
                    {data.category}
                </td>
                <td className="px-6 py-4">
                    {data.price}
                </td>
            </tr> ))}
        </tbody>
    </table>
</div>
    </div>
    <Footer/>
    </>
  );
};

export default Home;
