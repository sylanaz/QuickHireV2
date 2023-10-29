import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";
import Card from "../../components/Card";
import CardAddJob from "./CardAddJob";
import LoadingPage from "../LoadingPage";

const Addjob = () => {
  const user = localStorage.getItem("user");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace this with the actual API endpoint
        const response = await axios.get(`${process.env.REACT_APP_API}getAllShopinfo/${user}`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
    setLoading(true);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="flex flex-col justify-center mx-auto min-h-[100vh]">
          <Navbar></Navbar>
          <h1 className="text-2xl flex justify-center mb-6 mt-5 font-medium">สร้างประกาศรับสมัครพนักงาน</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 m-auto gap-3 xl:gap-10 2xl:gap-16">
            <CardAddJob />
            {userData !== null && (
              <>
                {userData.map((user, index) => (
                  <Card key={index} id={user._id} restaurantName={user.shopname} minilocation={user.minilocation} position={user.workposition} hourlyIncome={user.money} img={JSON.parse(user.img)} lat={user.lats} long={user.longs} peopleneed={user.peopleneed} jobdesc={user.jobdesc} timework={user.timework} welfare={user.welfare} location={user.location} email={user.email} fullname={user.fullname} editBTN={true}/>
                ))}
              </>
            )}
          </div>
          <Footer></Footer>
        </div>
      )}
    </>
  );
};

export default Addjob;
