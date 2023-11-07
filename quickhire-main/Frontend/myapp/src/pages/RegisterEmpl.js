import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";

export const RegisterEmpl = () => {
  const [email, setEmail] = useState("");
  const [getpassword, setPassword] = useState("");
  const [getsecondPassword, setSecondPassword] = useState("");
  const [getfirstname, setFirstname] = useState("");
  const [getlastname, setLastname] = useState("");
  // const [fullname, setFullname] = useState("");
  const [gettelnumber, setTelnumber] = useState("");
  // ? เผื่อได้ใช้มั้ง const [occupation, setOccupation] = useState("");
  const emailvalidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordsMatch = getpassword === getsecondPassword;
  const passwordsvalidate = getpassword.length >= 8 && getpassword.length <= 20 && /[A-Z]/.test(getpassword) && /[a-z]/.test(getpassword) && /[0-9]/.test(getpassword) && /[^A-Za-z0-9]/.test(getpassword);
  const telnumbervalidate = /^\d{10}$/.test(gettelnumber);
  const [alreadyHaveEmail, setAlreadyHaveEmail] = useState(false);
  const onFinish = async (event) => {
    const getfullname = getfirstname + " " + getlastname;
    event.preventDefault();

    const ciphertextEmail = CryptoJS.AES.encrypt(email, process.env.REACT_APP_ENCRYPT_KEY).toString();
    const password = CryptoJS.AES.encrypt(getpassword, process.env.REACT_APP_ENCRYPT_KEY).toString();
    const fullname = CryptoJS.AES.encrypt(getfullname, process.env.REACT_APP_ENCRYPT_KEY).toString();
    const telnumber = CryptoJS.AES.encrypt(gettelnumber, process.env.REACT_APP_ENCRYPT_KEY).toString();
    const role = CryptoJS.AES.encrypt("user", process.env.REACT_APP_ENCRYPT_KEY).toString();
    await axios.post(`${process.env.REACT_APP_API}checkEmail`, { ciphertextEmail, role }).then(async (res) => {
      if (res.data.haveEmail) {
        setAlreadyHaveEmail(true);
      } else {
        setAlreadyHaveEmail(false);

        await axios
          .post(`${process.env.REACT_APP_API}insertUser`, {
            email,
            password,
            fullname,
            telnumber,
            role,
          })
          .then((res) => {
            localStorage.setItem("accessToken", "Logged In");
            localStorage.setItem("user", ciphertextEmail);
            localStorage.setItem("role", role);
            localStorage.setItem("newuser", "new");
            window.location.replace("/");
          });
      }
    });
  };
  const checkSubmitBTN = () => {
    if (email === "" || getpassword === "" || getsecondPassword === "" || getfirstname === "" || getlastname === "" || gettelnumber === "") {
      return true; // One or more fields are empty, prevent submission.
    } else if (emailvalidate === false) {
      return true;
    } else if (passwordsvalidate === false || passwordsMatch === false) {
      return true;
    } else if (telnumbervalidate === false) {
      return true;
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex flex-col items-center justify-center ">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-xs md:max-w-xl p-5 items-center">
        {/* form */}
        <div className="px-8 md:px-16">
          <h2 className="flex items-center justify-center font-bold text-2xl text-center ">
            สำหรับ<span className="text-yellow-500">ผู้สมัครงาน</span>
          </h2>
          <form action="" className="flex flex-col " onSubmit={onFinish}>
            <div className="flex gap-3">
              <input type="text" name="name" placeholder="ชื่อ" className="p-2 mt-8 rounded-xl border w-1/2" value={getfirstname} onChange={(event) => setFirstname(event.target.value)} required></input>
              <input type="text" name="surname" placeholder="นามสกุล" className="p-2 mt-8 rounded-xl border w-1/2" value={getlastname} onChange={(event) => setLastname(event.target.value)} required></input>
            </div>
            <div className="flex flex-col gap-1">
              <input type="email" name="email" placeholder="อีเมล์" className="p-2 mt-5 rounded-xl border" value={email} onChange={(event) => setEmail(event.target.value)} required></input>
              {emailvalidate ? null : <div className="text-red-500 font-bold text-sm">กรุณากรอกอีเมล์ให้ถูกต้อง</div>}
              {alreadyHaveEmail && <div className="text-red-500 font-bold text-sm">อีเมล์นี้ได้ถูกใช้งานแล้ว!</div>}
              <input type="text" name="password" placeholder="รหัสผ่าน" className="p-2 mt-5 rounded-xl border w-full" value={getpassword} onChange={(e) => setPassword(e.target.value)} required></input>
              {passwordsvalidate ? null : <div className="text-red-500 font-bold text-sm">รหัสผ่านควรมีความยาวตั้งแต่ 8-20 ตัวอักษร ประกอบด้วยตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว ตัวพิมพ์เล็กอย่างน้อย 1 ตัว ตัวเลขอย่างน้อย 1 ตัว ตัวอักษรพิเศษอย่างน้อย 1 ตัว</div>}
              <input type="text" name="password2" placeholder="ยืนยันรหัสผ่าน" className="p-2 mt-5 rounded-xl border w-full" value={getsecondPassword} onChange={(event) => setSecondPassword(event.target.value)} required></input>
              {passwordsMatch ? null : <div className="text-red-500 font-bold text-sm">รหัสผ่านไม่ตรงกัน</div>}
              <input type="tel" name="tel" placeholder="เบอร์โทร" className="p-2 mt-5 rounded-xl border" value={gettelnumber} onChange={(event) => setTelnumber(event.target.value)} required></input>
              {telnumbervalidate ? null : <div className="text-red-500 font-bold text-sm">กรุณากรอกเลขเบอร์โทร10หลัก</div>}
            </div>
            <div className="flex justify-center items-center">
              <button type="submit" disabled={checkSubmitBTN()} className={`${!checkSubmitBTN() ? "bg-emerald-400 hover:bg-emerald-300" : "bg-gray-400"} text-cyan-950 mt-5 rounded-full duration-300 w-60 p-2 font-semibold`}>
                สมัครสมาชิก
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="hover:scale-105 duration-300 mt-8">
        <Link to={"/LoginMain?destination=LOGIN_EMPL"}>
          <span className="text-xl">Back to Login</span>
        </Link>
      </div>
    </section>
  );
};
