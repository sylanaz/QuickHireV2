import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

function Profile() {
  const user = localStorage.getItem("user");

  const [userData, setUserData] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace this with the actual API endpoint
        const apiUrl = `http://localhost:3001/getUserinfo/${user}`;

        const response = await axios.get(apiUrl);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  if (userData == null) {
    // Return a loading state or null while waiting for the data to be fetched
    return (
      <div className="flex flex-col justify-center max-w-[1400px] mx-auto">
        <Navbar></Navbar>
      </div>
    );
  }

  const decodeBlobToImageUrl = (blobData) => {
    if (!blobData) return null;
    const blob = new Blob([new Uint8Array(blobData.data)], { type: "image/jpeg" });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  };


  const birthDate = new Date(userData.birthdate);
  const birthYear = birthDate.getFullYear();
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  return (
    <div className="flex flex-col justify-center max-w-[1400px] mx-auto">
      <Navbar></Navbar>
      <div className="flex md:justify-center justify-between relative ml-10">
        <h1 className=" text-2xl font-medium">โปรไฟล์ของคุณ</h1>
        <Link to="/Editprofile" className="absolute right-10 border-2 border-black rounded-3xl px-2">แก้ไขประวัติ</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 m-10 gap-10">
        <div className="flex flex-col mx-auto justify-center md:-mt-56">
          <img className="w-[200px] h-[200px] rounded-full mx-auto" src={decodeBlobToImageUrl(userData.img)} alt="Rounded avatar"></img>
          <h1 className="mx-auto mt-4">{userData.nickname}</h1>
          <h1 className="mx-auto mt-4 text-2xl">
            {userData.firstname} {userData.lastname}
          </h1>
          <h1 className="mx-auto mt-4">{userData.birthdate} อายุ {age} ปี</h1>
          <h1 className="mx-auto ">เพศ หญิง สัญชาติ ไทย</h1>
        </div>

        <div className="flex flex-col mx-auto justify-center gap-8">
          <div className="relative">
            <div className=" rounded-full bg-slate-400 p-2 w-40 text-center  absolute left-1/2 -translate-x-1/2 -top-5">
              <h1>ประวัติการศึกษา</h1>
            </div>
            <div className=" rounded-2xl bg-slate-100 h-64 min-w-[250px]">
              <h1 className="p-10 ">{userData.degree}</h1>
            </div>
          </div>

          <div className="relative">
            <div className=" rounded-full bg-slate-400 p-2 w-48 text-center  absolute left-1/2 -translate-x-1/2 -top-5">
              <h1>ประวัติการทำงาน / ฝึกงาน</h1>
            </div>
            <div className=" rounded-2xl bg-slate-100 h-64">
              <h1 className="p-10">{userData.workexp}</h1>
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
              ภาษาไทย : {userData.thailevel} / ภาษาอังกฤษ : {userData.englevel}
            </h1>
          </div>
        </div>

        <div className="relative mx-10">
          <div className=" rounded-full bg-slate-400 p-2 w-48 text-center  absolute left-1/2 -translate-x-1/2 -top-5">
            <h1>ความสามารถในการขับรถ</h1>
          </div>
          <div className=" rounded-2xl bg-slate-100 h-32">
            <h1 className="p-10">{userData.vehicle}</h1>
          </div>
        </div>
        <div className="relative mx-10">
          <div className=" rounded-full bg-slate-400 p-2 w-48 text-center  absolute left-1/2 -translate-x-1/2 -top-5">
            <h1>ความสามารถพิเศษ</h1>
          </div>
          <div className=" rounded-2xl bg-slate-100 h-32">
            <h1 className="p-10">{userData.talent}</h1>
          </div>
        </div>
        <div className="relative mx-10">
          <div className=" rounded-full bg-slate-400 p-2 w-48 text-center  absolute left-1/2 -translate-x-1/2 -top-5">
            <h1>พื้นที่สะดวกรับงาน</h1>
          </div>
          <div className=" rounded-2xl bg-slate-100 h-32">
            <h1 className="p-10">{userData.area}</h1>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
export default Profile;
