'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  async function sendInfo(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const newuser = { email, password };

    try {
      const response = await fetch('https://my-db-p.liara.run/users/login', { 
        method: 'POST',
        body: JSON.stringify(newuser),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        const userId = data.id; // فرض می‌کنیم که آیدی کاربر در فیلد `id` قرار دارد
        const token = response.headers.get('Authorization'); // دریافت توکن از هدر پاسخ
        localStorage.setItem('token', token); // ذخیره توکن در localStorage
        router.push(`/${userId}`);
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('An error occurred while trying to log in. Please try again later.');
    }
}


  return (
    <main className="main-home w-full h-screen md:container pt-20 md:h-mx">
      <div className="container flex-col w-[27%] md:w-[80%] mx-auto py-10">
        <div className="title text-gray-400 rounded-t-2xl flex flex-col justify-center items-center w-full py-3 pt-10">
          <h1 className="font-bold text-[40px] md:text-3xl">Massenger</h1>
          <h2 className="title text-[27px] px-10 rounded-xl md:text-xl">Easy way to talk</h2>
        </div>
        <form className="container pb-20 form rounded-b-2xl flex-col py-10 md:pt-4 gap-2" onSubmit={sendInfo}>
          <label className="text-white text-xl md:text-[16px] md:mb-[-10px] md:w-[70%] pr-auto w-[80%]">Email</label>
          <input name="email" className="register md:text-[18px] md:h-[2rem] md:w-[70%]" type="email" />

          <label className="text-white text-xl md:text-[16px] md:mb-[-10px] md:w-[70%] pr-auto w-[80%]">Password</label>
          <input name="password" className="register md:text-[18px] md:h-[2rem] md:w-[70%]" type="password"/>

          <button className=" mt-4 text-xl submit text-[#b8b8b8] rounded-xl px-5 md:px-4 md:text-[18px] py-1">Submit</button>

          <Link href='/SignIn'>You don't have an account? Register</Link>
        </form>
      </div>
    </main>
  );
}
