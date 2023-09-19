import React, { useState } from "react";
import test from "../img/test.jpeg";
import { Link } from "react-router-dom";

import axios from "axios";

export const LoginMain = () => {
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
    <div className="flex justify-center my-36 md:my-0 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="md:flex md:flex-col-reverse text-2xl mx-2">
          <Link to="/LoginEmpl" className="flex justify-center items-center">
            <div className="border-2 rounded-full text-center py-3 px-6 bg-cyan-900 text-white text-2xl md:text-5xl underline">หางานที่รู้ใจ</div>
          </Link>
          <div className="text-xl text-center py-5 md:text-3xl md:flex md:flex-col-reverse">
            หากคุณกำลังมองหางาน Part time <span className="text-cyan-900 ">Click</span>
          </div>
        </div>

        <div className="text-2xl mx-2 ">
          <Link to="/LoginOrg" className="flex justify-center items-center">
            <div className="border-2 rounded-full py-3 px-6 bg-yellow-500 text-white text-2xl md:text-5xl underline text-center">หาใจที่รักงาน</div>
          </Link>
          <div className="text-xl text-center py-5 md:text-3xl md:flex md:flex-col">
            {/* <div className="text-yellow-500 text-center ">Click</div> */}
            หากคุณกำลังมองหาเพื่อนร่วมงาน <span className="text-yellow-500">Click</span>
          </div>
        </div>
      </div>
    </div>
  );
};
