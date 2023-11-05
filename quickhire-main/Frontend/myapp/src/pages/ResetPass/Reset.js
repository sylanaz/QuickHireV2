import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import TextField from "@mui/material/TextField";
import Axios from "axios";

const Reset = () => {
  const { getEmail, role } = useParams();
  const [resetPassword, setResetPassword] = React.useState(""); // Email user who want to reset password
  const [alreadyResetPass, setAlreadyResetPass] = useState(false); // Email user who want to reset password

  const handlePasswordChange = (event) => {
    setResetPassword(event.target.value);
  };

  const submitReset = () => {
    setAlreadyResetPass(true);
    const encodedEmail = encodeURIComponent(getEmail);
    const encodedRole = encodeURIComponent(role);
    Axios.post(`${process.env.REACT_APP_API}reset/${encodedRole}/${encodedEmail}`, { resetPassword });
  };
  return (
    <>
      {!alreadyResetPass ? (
        <div className="flex flex-col justify-center h-screen items-center">
          <div className="flex flex-col bg-gray-100 rounded-2xl shadow-lg w-8/12 h-[23%] md:h-[27%] p-5 mb-8">
            <div className="mb-2 text-2xl">รีเซ็ตรหัสผ่าน!</div>
            <TextField
              id="standard-basic"
              label="รหัสผ่าน"
              variant="standard" // Use "standard" as the variant
              value={resetPassword}
              onChange={handlePasswordChange}
            />
            <button onClick={submitReset} className="bg-[#29F072] rounded-full text-xl py-2 hover:scale-105 duration-300 mt-4">
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center h-screen items-center">
          <div className="flex flex-col bg-gray-100 rounded-2xl shadow-lg w-8/12 h-[18%] p-5 mb-8">
            <div className="mb-2 text-2xl">รีเซ็ตรหัสผ่าน!</div>
            <div>
              รหัสผ่านได้รีเซ็ตแล้ว <br />
              <Link to="/ChooseLogin">กลับไปยังหน้าล็อคอิน</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Reset;
