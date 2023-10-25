import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import banner from "../img/banner.png";
import Card from "../components/Card";
import { getUserApplyJob } from "../data/userApplyJob";
import LoadingPage from "./LoadingPage";

function Home() {
  const [jobs, setJobs] = useState();
  const email = localStorage.getItem("user");
  const role = localStorage.getItem("role");
  const [loading, setLoadind] =  useState(false);
  useEffect(() => {
    setLoadind(true)
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}alljobs`);
      const jobsData = response.data;
      setLoadind(false)
      setJobs(jobsData);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // =====================================

  const [noti, setNoti] = useState();

  const showNoti = async (email) => {
    if (role === "user") {
      await getUserApplyJob(email).then((data) => setNoti(data));
    }
  };

  const triggerUserApplyJob = () => {
    setTimeout(() => {
      showNoti(email);
    }, 2000);
  };

  useEffect(() => {
    showNoti(email);
  }, []);

  const list = noti ? noti.map((data) => data.shopname) : jobs;
  const allJobsUserNotApply = list && jobs ? jobs.filter((data) => !list.includes(data.shopname)) : [];
  // =====================================

  const [searchTerm, setSearchTerm] = useState("");
  const filteredCards = jobs ? jobs.filter((card) => card.shopname.toLowerCase().includes(searchTerm.toLowerCase())) : [];
  
  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="mx-auto min-h-[100vh]">
          <Navbar />
          <div className=" flex flex-col justify-center">
            <img src={banner} className="mx-2 mt-2 md:mt-0 md:mx-10" alt="img" />
            <h1 className="mx-auto mt-7 font-semibold md:text-3xl">ค้นหางานพาร์ทไทม์ที่ใช่สำหรับคุณ</h1>
            <h1 className="mx-auto mt-3 font-semibold md:text-2xl">งานทั้งหมด</h1>
            <h1 className="mx-auto font-semibold md:text-2xl">จำนวน {role === "user" && allJobsUserNotApply.length != 0 ? allJobsUserNotApply?.length : 0} งาน</h1>
          </div>
          <div className="flex justify-between my-4 md:text-3xl font-medium items-center ">
            <h1 className="ml-4 my-4 md:text-3xl font-medium md:ml-[6.5rem]">งาน Part time ล่าสุด</h1>
            <div className="flex mr-2 md:mr-[7rem]">
              <input type="text" placeholder="Search by restaurant name" className="border-2 rounded-lg px-1 md:px-4 py-2 focus:outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-3 xl:gap-7 xl:m-0 2xl:gap-16 xl:mb-10"> {role === "user" ? allJobsUserNotApply.map((job, index) => <Card key={index} id={job._id} restaurantName={job.shopname} minilocation={job.minilocation} position={job.workposition} hourlyIncome={job.money} img={JSON.parse(job.img)} lat={job.lats} long={job.longs} peopleneed={job.peopleneed} jobdesc={job.jobdesc} timework={job.timework} welfare={job.welfare} location={job.location} email={job.email} triggerUserApplyJob={triggerUserApplyJob} />) : filteredCards.map((job, index) => <Card key={index} id={job._id} restaurantName={job.shopname} minilocation={job.minilocation} position={job.workposition} hourlyIncome={job.money} img={JSON.parse(job.img)} lat={job.lats} long={job.longs} peopleneed={job.peopleneed} jobdesc={job.jobdesc} timework={job.timework} welfare={job.welfare} location={job.location} email={job.email} editBTN={false} />)}</div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default Home;
