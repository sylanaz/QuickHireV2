import React, { useState } from "react";
import test from "../img/test.jpeg";
import { Link } from "react-router-dom";

import axios from "axios";

export const ChooseLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setshow] = useState(false);

  const toShow = () => {
    // console.log("test")
    setshow(!show);
  };

  const onFinish = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3001/validatePassword", { email, password }).then((res) => {
      if (res.data.validation) {
        localStorage.setItem("accessToken", "Logged In");
        localStorage.setItem("user", email);
        localStorage.setItem("newuser", res.data.newuser);
        localStorage.setItem("role", res.data.role);
        window.location.replace("/Job");
      } else {
        alert("Your password is incorrect");
      }
    });
  };
  return (
    <section className="bg-gray-50 min-h-screen flex flex-col  items-center justify-center ">
      <div className="bg-gray-100 flex rounded-2xl flex-col md:flex-row shadow-lg max-w-fit p-3 md:p-5 items-center hover:bg-blue-200 transition duration-500 ">
        {/* form */}
        <div className="mb-5 mt-5">
          <div className="md:flex md:flex-col-reverse ">
            <Link to="/LoginMain" className="flex justify-center items-center">
              <div className="border-2 rounded-full text-center py-3 px-6 bg-cyan-900 text-white text-2xl md:text-5xl underline">หางานที่รู้ใจ</div>
            </Link>
            <div className="text-xl text-center md:text-3xl md:flex md:flex-col-reverse">
              หากคุณกำลังมองหางาน Part time <span className="text-cyan-900 ">Click</span>
            </div>
          </div>
        </div>
        <div className="mb-5 mt-5">
          <div>
            <Link to="/LoginMain " className="flex justify-center items-center">
              <div className="border-2 rounded-full text-center py-3 px-6 bg-yellow-500 text-white text-2xl md:text-5xl underline">หาใจที่รักงาน</div>
            </Link>
            <div className="text-xl text-center md:text-3xl md:flex md:flex-col">
              หากคุณกำลังมองหาเพื่อนร่วมงาน <span className="text-yellow-500">Click</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hover:scale-105 duration-300 mt-8">
        <Link to={"/Home"}>
          <span className="text-center text-xl"> Back to Homepage</span>
        </Link>
      </div>
    </section>
  );
};
