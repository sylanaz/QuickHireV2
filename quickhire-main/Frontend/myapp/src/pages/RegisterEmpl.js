import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const RegisterEmpl = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  // const [fullname, setFullname] = useState("");
  const [telnumber, setTelnumber] = useState("");
  // ? เผื่อได้ใช้มั้ง const [occupation, setOccupation] = useState("");

  const onFinish = (event) => {
    const fullname = firstname + " " + lastname;
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}insertUser`, {
        email,
        password,
        fullname,
        telnumber,
        // occupation,
      })
      .then((res) => {
        localStorage.setItem("accessToken", "Logged In");
        localStorage.setItem("user", email);
        localStorage.setItem("role", "user");
        localStorage.setItem("newuser", "new");
        window.location.replace("/");
      });
  };

  return (
    <section className="bg-gray-50 min-h-screen flex flex-col items-center justify-center ">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-xs md:max-w-3xl p-5 items-center">
        {/* form */}
        <div className="px-8 md:px-16">
          <h2 className="flex items-center justify-center font-bold text-2xl text-center ">
            สำหรับ<span className="text-yellow-500">ผู้สมัครงาน</span>
          </h2>
          <form action="" className="flex flex-col gap-2 md:gap-4" onSubmit={onFinish}>
            <div className="flex gap-3">
              <input type="text" name="name" placeholder="ชื่อ" className="p-2 mt-8 rounded-xl border w-1/2" value={firstname} onChange={(event) => setFirstname(event.target.value)} required></input>
              <input type="text" name="surname" placeholder="นามสกุล" className="p-2 mt-8 rounded-xl border w-1/2" value={lastname} onChange={(event) => setLastname(event.target.value)} required></input>
            </div>
            {/* <input input type="text" name="name" placeholder="ชื่อ" className="p-2 mt-8 rounded-xl border" value={fullname} onChange={(event) => setFullname(event.target.value)} required /> */}
            <input type="text" name="email" placeholder="อีเมล์" className="p-2 mt-5 rounded-xl border" value={email} onChange={(event) => setEmail(event.target.value)} required></input>
            <input type="text" name="password" placeholder="รหัสผ่าน" className="p-2 mt-5 rounded-xl border" required></input>
            <input type="text" name="password" placeholder="ยืนยันรหัสผ่าน" className="p-2 mt-5 rounded-xl border" value={password} onChange={(event) => setPassword(event.target.value)} required></input>
            <input type="text" name="tel" placeholder="เบอร์โทร" className="p-2 mt-5 rounded-xl border" value={telnumber} onChange={(event) => setTelnumber(event.target.value)} required></input>
            <div className="flex justify-center items-center">
              <button type="submit" className="bg-emerald-400 text-cyan-950 mt-5 rounded-full hover:bg-emerald-300 duration-300 w-60 p-2 font-semibold">
                สมัครสมาชิก
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="hover:scale-105 duration-300 mt-8">
        <Link to={"/LoginMain"}>
          <span className="text-xl">Back to Login</span>
        </Link>
      </div>
    </section>
  );
};
