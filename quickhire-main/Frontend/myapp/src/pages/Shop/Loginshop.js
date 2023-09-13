import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";



export default function Loginshop() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3001/validatePasswordShop", { email, password }).then((res) => {
      if (res.data.validation) {
        localStorage.setItem("accessToken", "Logged In");
        localStorage.setItem("user", email);
        localStorage.setItem("newuser",res.data.newuser)
        localStorage.setItem("role",res.data.role)
        window.location.replace("/");
      } else {
        alert("Your password is incorrect");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-300 to-orange-600 flex items-center justify-center text-white">
      <form className="min-w-fit flex-col bg-cyan-900 px-6 py-6 shadow-md rounded-[8px]" onSubmit={onFinish}>
      <h1 className="flex justify-center text-3xl pt-2">เข้าสู่ระบบร้านค้า</h1>
        <div className="mb-8 flex justify-center">        
          <Link to="/Home">
            <img className="w-60  mx-auto md:mx-36 hover:rotate-12 hover:scale-125 duration-300" src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="flex flex-col text-sm rounded-md">
          <label htmlFor="usernameEmail">อีเมล</label>
          <input id="usernameEmail" className="mb-5 rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-yellow-500 text-black" type="text" placeholder="Ex.quickhire@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="password">รหัสผ่าน</label>
          <input id="password" className="border rounded-[4px] p-3 hover:outline-none focus:outline-none hover:border-yellow-500 text-black" type="password" placeholder="รหัสผ่าน" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="mt-5 w-full p-2 bg-emerald-400 text-cyan-950 rounded-[4px] hover:bg-emerald-300 duration-300" type="submit">
          เข้าสู่ระบบ
        </button>
        <Link to="/Login">
        <button className="mt-5 w-full p-6 text-2xl font-medium bg-emerald-400 text-cyan-950 rounded-[4px] hover:bg-emerald-300 duration-300" type="submit">
          สำหรับผู้สมัครงาน 🏪
        </button>
        </Link>
        <div className="mt-5 flex justify-between text-sm text-white">
          {" "}
          <a href="#">ลืมรหัสผ่าน?</a>
          <Link to="/RegisterShop">สมัครสมาชิกร้านค้า</Link>
        </div>
      </form>
    </div>
  );
}
