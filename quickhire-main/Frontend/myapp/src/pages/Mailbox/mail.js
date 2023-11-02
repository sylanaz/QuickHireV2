import React, { useState, useEffect } from "react";
import Mymodal from "./modal";
import axios from "axios";
import CardApproveUser from "./CardApproveUser";
import Card from "../../components/Card";

const Mail = ({ id, useremail, email_shopname, shopname, status, date, role, triggerAccOrDenie, triggerUserApplyJob }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const day = new Date(date);

  const numberDate = day.getDate(); // Look like 1-31 days
  const month = day.getMonth(); // Look like 0-12 months
  const year = day.getFullYear(); // Look like 2023

  const date_month_year = `${numberDate}/${month}/${year}`;

  const hour = day.getHours(); // Look like 1-24 hours
  const minute = day.getMinutes(); // Look like 0-59 minutes

  const hour_minute = `${hour}:${minute}`;

  const [userData, setUserData] = useState([]);
  const getUserInfo = async () => {
    const data = await axios.get(`${process.env.REACT_APP_API}getUserinfo/${useremail}`);
    setUserData(data.data);
  };

  const getShopInfo = async () => {
    const data = await axios.get(`${process.env.REACT_APP_API}getShopinfo/${email_shopname}`);
    setUserData(data.data);
  };
  useEffect(() => {
    if (role === "shop") {
      getUserInfo();
    } else {
      getShopInfo();
    }
  }, []);

  return (
    <>
      {userData !== undefined && (
        <div>
          {/* User can't open modal but shop can */}
          {role === "user" ? (
            <>
              <div className="flex justify-center items-center">
                <div className="grid-cols-2 md:grid-cols-4 gap-3 md:gap-3 xl:gap-7 xl:m-0 2xl:gap-16 xl:mb-10">{userData && userData.map((data, index) => <Card key={index} id={id} restaurantName={data.shopname} minilocation={data.minilocation} position={data.workposition} hourlyIncome={data.money} img={JSON.parse(data.img)} lat={data.marker.lat} long={data.marker.lng} peopleneed={data.peopleneed} jobdesc={data.jobdesc} timework={data.timework} welfare={data.welfare} location={data.location} email={data.email} triggerUserApplyJob={triggerUserApplyJob} showHistory={true} status_appove={status} date_month_year={date_month_year} />)}</div>
              </div>
            </>
          ) : (
            <>
              <CardApproveUser userData={userData} shopname={shopname} date_month_year={date_month_year} hour_minute={hour_minute} triggerAccOrDenie={triggerAccOrDenie} />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Mail;
