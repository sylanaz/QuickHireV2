import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import date from "../data/date";
import SwapImage from "./Shop/SwapImage";
import LoadingPage from "./LoadingPage";
import CryptoJS from "crypto-js";

function Profile() {
  const user = CryptoJS.AES.decrypt(localStorage.getItem("user"), process.env.REACT_APP_ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
  const [userData, setUserData] = useState(null);

  const deCryptoData = (data) => {
    return CryptoJS.AES.decrypt(data, process.env.REACT_APP_ENCRYPT_KEY).toString(CryptoJS.enc.Utf8)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace this with the actual API endpoint
        const apiUrl = `${process.env.REACT_APP_API}getUserinfo/${user}`;

        const response = await axios.get(apiUrl);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);
  const birthYear = userData ? new Date(deCryptoData(userData.birthdate)).getFullYear() : 0;
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  return (
    <>
      {userData == null ? (
        <LoadingPage />
      ) : (
        <div className="flex flex-col justify-center mx-auto">
          <Navbar />
          <div className="flex md:justify-center justify-between relative ml-10">
            <h1 className=" text-2xl font-medium">โปรไฟล์ของคุณ</h1>
            <Link to={`/Editprofile/${userData._id}`} className="absolute right-10 border-2 border-black rounded-3xl px-2">
              แก้ไขประวัติ
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 m-10 gap-10">
            <div className="flex flex-col mx-auto justify-center">
              {/* <img className="w-[200px] h-[200px] rounded-full mx-auto" src={decodeBlobToImageUrl(userData.img)} alt="Rounded avatar"></img> */}
              <div className="">{userData.img !== null && <SwapImage images={JSON.parse(userData.img)} forProfile={true} />}</div>
              <h1 className="mx-auto mt-4">{deCryptoData(userData.nickname)}</h1>
              <h1 className="mx-auto mt-4 text-2xl">{deCryptoData(userData.fullname)}</h1>
              <h1 className="mx-auto mt-4">
                {deCryptoData(userData.birthdate)} อายุ {age} ปี
              </h1>
              <h1 className="mx-auto ">
                เพศ {deCryptoData(userData.sex)} สัญชาติ {deCryptoData(userData.national)}
              </h1>
            </div>

            <div className="flex flex-col mx-auto justify-center gap-8">
              <div className="relative">
                <div className=" rounded-full bg-slate-400 p-2 w-40 text-center  absolute left-1/2 -translate-x-1/2 -top-5">
                  <h1>ประวัติการศึกษา</h1>
                </div>
                <div className=" rounded-2xl bg-slate-100 h-64 min-w-[250px]">
                  <h1 className="p-10 ">{deCryptoData(userData.degree)}</h1>
                </div>
              </div>

              <div className="relative">
                <div className=" rounded-full bg-slate-400 p-2 w-48 text-center  absolute left-1/2 -translate-x-1/2 -top-5">
                  <h1>ประวัติการทำงาน / ฝึกงาน</h1>
                </div>
                <div className=" rounded-2xl bg-slate-100 h-64">
                  <h1 className="p-10">{deCryptoData(userData.workexp)}</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col mx-auto justify-center gap-8 w-full ">
            <div className="relative mx-10">
              <div className=" rounded-full bg-slate-400 p-2 w-48 text-center  absolute left-1/2 -translate-x-1/2 -top-5">
                <h1>ความสามารถด้านภาษา</h1>
              </div>
              <div className=" rounded-2xl bg-slate-100 h-32">
                <h1 className="p-10">
                  ภาษาไทย : {deCryptoData(userData.thailevel)} / ภาษาอังกฤษ : {deCryptoData(userData.englevel)}
                </h1>
              </div>
            </div>

            <div className="relative mx-10">
              <div className=" rounded-full bg-slate-400 p-2 w-48 text-center  absolute left-1/2 -translate-x-1/2 -top-5">
                <h1>ความสามารถในการขับรถ</h1>
              </div>
              <div className=" rounded-2xl bg-slate-100 h-32">
                <h1 className="p-10">{deCryptoData(userData.vehicle)}</h1>
              </div>
            </div>
            <div className="relative mx-10">
              <div className=" rounded-full bg-slate-400 p-2 w-48 text-center  absolute left-1/2 -translate-x-1/2 -top-5">
                <h1>ความสามารถพิเศษ</h1>
              </div>
              <div className=" rounded-2xl bg-slate-100 h-32">
                <h1 className="p-10">{deCryptoData(userData.talent)}</h1>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
      )}
    </>
  );
}
export default Profile;
