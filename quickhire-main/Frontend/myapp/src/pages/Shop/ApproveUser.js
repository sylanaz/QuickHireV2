import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Mail from "../Mailbox/mail";
import { getUserApplyJob } from "../../data/userApplyJob";
import { shopNoti } from "../../data/shopApplyUsers";

export const ApproveUser = () => {
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("user");
  const [noti, setNoti] = useState([]);

  const [acceptTriggerAccOrDenie,setAcceptTriggerAccOrDenie] = useState(false)
  const triggerAccOrDenie = () => {
    setAcceptTriggerAccOrDenie(!acceptTriggerAccOrDenie)
  }

  const showNoti = async (email) => {
    if (role === "user") {
      await getUserApplyJob((data) => setNoti(data));
    } else if (role === "shop") {
      await shopNoti(email).then((data) => setNoti(data));
    }
  };
  console.log(noti);

  useEffect(() => {
    showNoti(email);
  }, [acceptTriggerAccOrDenie]);

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex justify-center text-2xl mb-6 mt-5 font-medium">คัดเลือกผู้สมัครงาน</div>
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {noti !== undefined &&
            noti.map((noti, index) => {
              if (role === "user") {
                return <Mail key={index} email={noti.shop_name} status={noti.status} date={noti.date} role={role} />;
              } else {
                return <Mail key={index} useremail={noti.useremail} user_fullname={noti.user_fullname} shopname={noti.shopname} status={noti.status} date={noti.date} role={role} triggerAccOrDenie={triggerAccOrDenie}/>;
              }
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
};
