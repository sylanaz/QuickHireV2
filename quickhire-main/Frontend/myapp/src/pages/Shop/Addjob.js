import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";
import Card from "../../components/Card";
import CardAddJob from "./CardAddJob";

const Addjob = () => {
  const user = localStorage.getItem("user");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace this with the actual API endpoint
        const response = await axios.get(`${process.env.REACT_APP_API}getAllShopinfo/${user}`);
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

  return (
    <div className="flex flex-col justify-center mx-auto">
      <Navbar></Navbar>
      <h1 className="text-2xl flex justify-center mb-6 mt-5 font-medium">สร้างประกาศรับสมัครพนักงาน</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 m-auto gap-3 xl:gap-10 2xl:gap-16">
        <CardAddJob />
        {userData !== null && (
          <>
            {userData.map((user, index) => (
              <Card key={index} restaurantName={user.shopname} minilocation={user.minilocation} position={user.workposition} hourlyIncome={user.money} img={user.img} lat={user.lat} long={user.long} peopleneed={user.peopleneed} jobdesc={user.jobdesc} timework={user.timework} welfare={user.welfare} location={user.location} email={user.email} fullname={user.fullname}/>
            ))}
          </>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Addjob;
