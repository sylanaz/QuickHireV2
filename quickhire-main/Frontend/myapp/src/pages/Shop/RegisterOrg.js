import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const RegisterOrg = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  // const [lastname, setLastname] = useState("");
  const [telnumber, setTelnumber] = useState("");
  // const [shop, setShop] = useState("");
  const onFinish = async (event) => {
    const fullname = firstname + " " + lastname;
    event.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_API}insertShop`, {
        email,
        password,
        firstname,
        lastname,
        fullname,
        telnumber,
      })
      .then((res) => {
        localStorage.setItem("accessToken", "Logged In");
        localStorage.setItem("user", email);
        localStorage.setItem("role", "shop");
        localStorage.setItem("newuser", "new");
        window.location.replace("/");
      });
  };

  const checkSubmitBTN = () => {
    if (email === "" && password === "" && secondPassword === "" && firstname === "" && lastname === "" && telnumber === "") {
      return true;
    } else {
      if (password == secondPassword) {
        return false;
      } else {
        return true;
      }
    }
  }

  return (
    <section className="bg-gray-50 min-h-screen flex flex-col items-center justify-center ">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-xs md:max-w-3xl p-5 items-center">
        {/* form */}
        <div className="px-8 md:px-16">
          <h2 className="flex items-center justify-center font-bold text-2xl text-center ">
            สำหรับ<span className="text-yellow-500">ร้านค้า</span>
          </h2>
          <form action="" className="flex flex-col" onSubmit={onFinish}>
            <div className="flex gap-3">
              <input type="text" onChange={e => setFirstname(e.target.value)} name="name" placeholder="ชื่อ" className="p-2 mt-8 rounded-xl border w-1/2"></input>
              <input type="text" onChange={e => setLastname(e.target.value)} name="surname" placeholder="นามสกุล" className="p-2 mt-8 rounded-xl border w-1/2"></input>
            </div>
            {/* <input type="text" name="storename" placeholder="ชื่อร้านค้า" className="p-2 mt-5 rounded-xl border"></input> */}
            <input type="text" onChange={e => setEmail(e.target.value)} name="email" placeholder="อีเมล์" className="p-2 mt-5 rounded-xl border"></input>
            <input type="text" onChange={e => setPassword(e.target.value)} name="password" placeholder="รหัสผ่าน" className="p-2 mt-5 rounded-xl border"></input>
            <input type="text" onChange={e => setSecondPassword(e.target.value)} name="password2" placeholder="ยืนยันรหัสผ่าน" className="p-2 mt-5 rounded-xl border"></input>
            <input type="text" onChange={e => setTelnumber(e.target.value)} name="tel" placeholder="เบอร์โทร" className="p-2 mt-5 rounded-xl border"></input>
            <div className="flex justify-center items-center">
              <button type="submit" disabled={checkSubmitBTN()} className="bg-emerald-400 text-cyan-950 mt-5 rounded-full hover:bg-emerald-300 duration-300 w-60 p-2 font-semibold">
                สมัครสมาชิก
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="hover:scale-105 duration-300 mt-8">
        <Link to={"/LoginMain?destination=LOGIN_ORG"}>
          <span className="text-xl">Back to Login</span>
        </Link>
      </div>
    </section>
  );
};
