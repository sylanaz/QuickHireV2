import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";

export default function Registershop() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [telnumber, setTelnumber] = useState("");
  const [shop, setShop] = useState("");

  const onFinish = (event) => {
    event.preventDefault();
    axios
      .post("https://quickhirebackend.onrender.com/insertShop", {
        email,
        password,
        firstname,
        lastname,
        telnumber,
        shop,
      })
      .then((res) => {
        localStorage.setItem("accessToken", "Logged In");
        localStorage.setItem("user", email);
        localStorage.setItem("role","shop")
        localStorage.setItem("newuser","new")
        window.location.replace("/");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-300 to-emerald-400 flex items-center justify-center text-white ">
      <form className=" min-w-fit flex-col bg-cyan-900 px-6 py-6 shadow-md rounded-[8px]" onSubmit={onFinish}>
        <div className=" flex justify-center">
          <Link to="/Home">
            <img className="w-60  mx-24 md:mx-36 hover:rotate-12 hover:scale-125 duration-300" src={logo} alt="Logo" />
          </Link>
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-emerald-400 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " value={email} onChange={(event) => setEmail(event.target.value)} required />
          <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            อีเมล
          </label>
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input type="password" name="floating_password" id="floating_password" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-emerald-400 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
          <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            รหัสผ่าน
          </label>
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input type="password" name="repeat_password" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-emerald-400 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " value={password} onChange={(event) => setPassword(event.target.value)} required />
          <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            ยืนยันรหัสผ่าน
          </label>
        </div>
        <div class="grid grid-cols-2 gap-6">
          <div class="relative z-0 w-full mb-6 group">
            <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-emerald-400 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " value={firstname} onChange={(event) => setFirstname(event.target.value)} required />
            <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              ชื่อจริง
            </label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-emerald-400 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " value={lastname} onChange={(event) => setLastname(event.target.value)} required />
            <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              นามสกุล
            </label>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-6">
          <div class="relative z-0 w-full mb-6 group">
            <input type="text" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-emerald-400 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " value={telnumber} onChange={(event) => setTelnumber(event.target.value)} required />
            <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              เบอร์โทรศัพท์
            </label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input type="text" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-emerald-400 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " value={shop} onChange={(event) => setShop(event.target.value)} required />
            <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              ชื่อร้าน
            </label>
          </div>
        </div>
        <button type="submit" className="bg-emerald-400 text-cyan-950 rounded-[4px] hover:bg-emerald-300 duration-300 w-full p-2">
          สมัครสมาชิก
        </button>
        <div className="mt-5 flex justify-between text-sm text-white">
          <Link to="/LoginShop">มีบัญชีแล้ว?</Link>
          <Link to="/LoginShop">เข้าสู่ระบบ</Link>
        </div>
      </form>
    </div>
  );
}
