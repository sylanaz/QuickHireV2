import React, { useState, useEffect } from "react";
import Mymodal from "./modal";
import axios from "axios";
import CardApproveUser from "./CardApproveUser";

const Mail = ({ useremail, user_fullname, shopname, status, date, role, triggerAccOrDenie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const day = new Date(date);

  const numberDate = day.getDate(); // Look like 1-31 days
  const month = day.getMonth(); // Look like 0-12 months
  const year = day.getFullYear(); // Look like 2023

  const date_month_year = `${numberDate}/${month}/${year}`;

  const hour = day.getHours(); // Look like 1-24 hours
  const minute = day.getMinutes(); // Look like 0-59 minutes

  const hour_minute = `${hour}:${minute}`;

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  const [userData, setUserData] = useState([]);
  const getUserInfo = async () => {
    const data = await axios.get(`${process.env.REACT_APP_API}getUserinfo/${useremail}`);
    setUserData(data.data);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      {userData !== undefined && (
        <div>
          {/* User can't open modal but shop can */}
          {role === "user" ? (
            <>
              <div>{useremail}</div>
              <div>
                {status} , {day.getDate()}
              </div>
            </>
          ) : (
            <>
              {/* <div onClick={openModal}> */}
                <CardApproveUser userData={userData} shopname={shopname} date_month_year={date_month_year} hour_minute={hour_minute} triggerAccOrDenie={triggerAccOrDenie}/>
              {/* </div> */}
              {/* <Mymodal isOpen={isModalOpen} onClose={closeModal} userData={userData} /> */}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Mail;
