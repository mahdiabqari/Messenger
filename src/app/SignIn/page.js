'use client'
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  async function sendInfo(e) { 
    e.preventDefault(); 
  
    const formData = new FormData(e.target); 
    const name = formData.get('name'); 
    const email = formData.get('email'); 
    const password = formData.get('password'); 
  
    const newuser = { name, email, password }; 
  
    try { 
      const response = await fetch('https://my-db-p.liara.run/users/register', {  
        method: 'POST', 
        body: JSON.stringify(newuser), 
        headers: { 
          'Content-Type': 'application/json' 
        } 
      }); 
  
      if (response.ok) { 
        const data = await response.json(); 
        const userId = data.id; // فرض می‌کنیم که آیدی کاربر در فیلد `id` قرار دارد 
        const token = response.headers.get('Auth'); // دریافت توکن از هدر پاسخ
        localStorage.setItem('token', token); // ذخیره توکن در localStorage
        router.push(`/${userId}`); 
      } else { 
        const errorMessage = await response.text(); 
        alert(errorMessage); 
      } 
    } catch (error) { 
      console.error('Fetch error:', error); 
      alert('An error occurred while trying to register. Please try again later.'); 
    } 
  }

  return (
<main className="main-home w-full h-screen md:container pt-20 md:h-mx">
  <div className="container flex-col w-[30%] md:w-[80%] mx-auto py-5">
    <div className="title text-gray-400 rounded-[20px] flex flex-col justify-center items-center w-full py-4 bg-gradient-to-r from-blue-500 via-blue-700 to-black shadow-lg">
      <h1 className="font-bold text-[40px] md:text-3xl text-white">Sign In</h1>
      <h2 className="title text-[20px] px-10 py-2 rounded-xl md:text-xl text-white">Please Enter your Information</h2>
    </div>
    <form className="container pb-20 form text-white w-[95%] rounded-2xl flex-col py-10 md:pt-4 gap-4 shadow-lg" onSubmit={sendInfo}>
      
      <label className="text-white mb-[-10px] text-xl md:text-[16px] md:mb-[-10px] md:w-[70%] pr-auto w-[80%]">Name</label>
      <input name="name" className="register md:text-[18px] md:h-[2rem] md:w-[70%] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" />
      
      <label className="text-white mb-[-10px] text-xl md:text-[16px] md:mb-[-10px] md:w-[70%] pr-auto w-[80%]">Email</label>
      <input name="email" className="register md:text-[18px] md:h-[2rem] md:w-[70%] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="email" />

      <label className="text-white mb-[-10px] text-xl md:text-[16px] md:mb-[-10px] md:w-[70%] pr-auto w-[80%]">Password</label>
      <input name="password" className="register md:text-[18px] md:h-[2rem] md:w-[70%] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="password"/>

      <button className="mt-4 text-xl submit text-white bg-blue-500 hover:bg-blue-700 rounded-xl px-5 md:px-4 md:text-[18px] py-1 transition-all duration-300">Submit</button>

      <Link href='/' className="text-blue-500 hover:text-blue-700 transition-all duration-300">Do you registered before? login</Link>
    </form>
  </div>
</main>


  );
}
