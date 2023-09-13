import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import banner from "../img/banner.png";
import Card from "../components/Card";
import LoginMain from "./LoginMain";

function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("https://quickhirebackend.onrender.com/alljobs"); // Replace with your API endpoint
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

  return (
    <div className="Home mx-auto ">
      <Navbar />
      <LoginMain />

      {/* <div className=" flex flex-col justify-center">
        <img src={banner} className="mx-10" alt="img" />
        <h1 className="mx-auto mt-7 font-semibold md:text-3xl">ค้นหางานพาร์ทไทม์ที่ใช่สำหรับคุณ</h1>
        <h1 className="mx-auto mt-3 font-semibold md:text-2xl">งานทั้งหมด</h1>
        <h1 className="mx-auto font-semibold md:text-2xl">จำนวน {jobs.length} งาน</h1>
      </div>

      <h1 className="mx-10 my-4 md:text-3xl font-medium">งาน Part time ล่าสุด</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 mx-6 md:gap-10 gap-y-12 ">
        {jobs.map((job, index) => (
          <Card key={index} restaurantName={job.shopname} minilocation={job.minilocation} position={job.workposition} hourlyIncome={job.money} img={decodeBlobToImageUrl(job.img)} lat={job.lat} long={job.long} peopleneed={job.peopleneed} jobdesc={job.jobdesc} timework={job.timework} welfare={job.welfare} location={job.location} email={job.email} />
        ))}
      </div> */}
      <Footer />
    </div>
  );
}

export default Home;
