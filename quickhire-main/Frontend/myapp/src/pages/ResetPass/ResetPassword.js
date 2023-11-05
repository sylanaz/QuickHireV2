import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Axios from "axios";
import CryptoJS from "crypto-js";

const ResetPassword = () => {
  const role = useParams();
  const [getEmail, setGetEmail] = React.useState(""); // Email user who want to reset password
  const [alreadyResetPass, setAlreadyResetPass] = useState(false); // Email user who want to reset password

  const handleEmailChange = (event) => {
    setGetEmail(event.target.value);
  };

  const resetPass = () => {
    setAlreadyResetPass(true);
    const email = CryptoJS.AES.encrypt(getEmail, process.env.REACT_APP_ENCRYPT_KEY).toString();
    const encodedEmail = encodeURIComponent(email);
    const encodedRole = encodeURIComponent(role.role);

    Axios.post(`${process.env.REACT_APP_API}resetPassword/${encodedRole}/${encodedEmail}`);
  };

  return (
    <>
      {!alreadyResetPass ? (
        <div className="flex flex-col justify-center h-screen items-center">
          <div className="flex flex-col bg-gray-100 rounded-2xl shadow-lg w-8/12 h-[23%] md:h-[27%] p-5 mb-8">
            <div className="mb-2 text-2xl">ลืมรหัสผ่าน!</div>
            <TextField
              id="standard-basic"
              label="อีเมล์"
              variant="standard" // Use "standard" as the variant
              value={getEmail}
              onChange={handleEmailChange}
            />
            <button onClick={resetPass} className="bg-[#29F072] rounded-full text-xl py-2 hover:scale-105 duration-300 mt-4">
              Send
            </button>
          </div>
          <Link to={"/ChooseLogin"}>
            <div className="text-center text-xl">Back to login</div>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col justify-center h-screen items-center">
          <div className="flex flex-col bg-gray-100 rounded-2xl shadow-lg w-8/12 h-[18%] p-5 mb-8">
            <div className="mb-2 text-2xl">ลืมรหัสผ่าน!</div>
            <div>
              รหัสผ่านได้ส่งไปยัง {getEmail} <br /> โปรดเช็คที่อีเมล์ของคุณ
            </div>
          </div>
          <Link to={"/ChooseLogin"}>
            <div className="text-center text-xl">Back to login</div>
          </Link>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
