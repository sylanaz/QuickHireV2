import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import banner from "../img/banner.png";
import Card from "../components/Card";
// import { getUserApplyJob } from "../data/userApplyJob";
// import { shopNoti } from "../data/shopApplyUsers";
// import Mail from "./Mailbox/mail";
// import LoginMain from "./LoginMain";

function Home() {
  const [jobs, setJobs] = useState([]);
  // const email = localStorage.getItem("user");
  // const role = localStorage.getItem("role");

  useEffect(() => {
    fetchJobs();
    // showNoti(email);
  }, []);
  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:3001/alljobs"); // Replace with your API endpoint
      setJobs(response.data.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const decodeBlobToImageUrl = (blobData) => {
    if (!blobData) return null;
    const blob = new Blob([new Uint8Array(blobData.data)], { type: "image/jpeg" });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  };

  // =====================================

  // const [noti, setNoti] = useState([]);

  // const showNoti = async (email) => {
  //   if (role === "user") {
  //     const data = await getUserApplyJob(email);
  //     setNoti(data);
  //   } else if (role === "shop") {
  //     const data = await shopNoti(email);
  //     setNoti(data);
  //   }
  // };
  // =====================================
  
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCards = jobs.filter((card) => card.shopname.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="Home mx-auto h-screen">
      <Navbar />
      {/* <LoginMain /> */}
      <div className=" flex flex-col justify-center">
        <img src={banner} className="mx-2 mt-2 md:mt-0 md:mx-10" alt="img" />
        <h1 className="mx-auto mt-7 font-semibold md:text-3xl">ค้นหางานพาร์ทไทม์ที่ใช่สำหรับคุณ</h1>
        <h1 className="mx-auto mt-3 font-semibold md:text-2xl">งานทั้งหมด</h1>
        <h1 className="mx-auto font-semibold md:text-2xl">จำนวน {jobs.length} งาน</h1>
      </div>
      {/* {noti != undefined &&
        noti.map((noti, index) => {
          if (role === "user") {
            return <Mail key={index} email={noti.shop_name} status={noti.status} date={noti.date} role={role} />;
          } else {
            return <Mail key={index} email={noti.useremail} user_fullname={noti.user_fullname} status={noti.status} date={noti.date} role={role} />;
          }
        })} */}
      <div className="flex justify-between my-4 md:text-3xl font-medium items-center ">
        <h1 className="ml-4 my-4 md:text-3xl font-medium md:ml-[6.5rem]">งาน Part time ล่าสุด</h1>
        <div className="flex mr-2 md:mr-[7rem]">
          <input type="text" placeholder="Search by restaurant name" className="border-2 rounded-lg px-1 md:px-4 py-2 focus:outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 md:ml-[6rem]">
        {filteredCards.map((job, index) => (
          <Card key={index} restaurantName={job.shopname} minilocation={job.minilocation} position={job.workposition} hourlyIncome={job.money} img={JSON.parse(job.img)} lat={job.lat} long={job.long} peopleneed={job.peopleneed} jobdesc={job.jobdesc} timework={job.timework} welfare={job.welfare} location={job.location} email={job.email} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
