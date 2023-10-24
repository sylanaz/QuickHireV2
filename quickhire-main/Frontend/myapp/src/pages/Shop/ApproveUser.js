import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Mail from "../Mailbox/mail";
import { getUserApplyJob } from "../../data/userApplyJob";
import { shopNoti } from "../../data/shopApplyUsers";
import LoadingPage from "../LoadingPage";

export const ApproveUser = () => {
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("user");
  const [noti, setNoti] = useState([]);
  const [loading, setLoading] = useState(false);

  const [acceptTriggerAccOrDenie, setAcceptTriggerAccOrDenie] = useState(false);
  const triggerAccOrDenie = () => {
    setAcceptTriggerAccOrDenie(!acceptTriggerAccOrDenie);
  };

  const showNoti = async (email) => {
    if (role === "user") {
      await getUserApplyJob(email).then((data) => setNoti(data));
      setLoading(false);
    } else if (role === "shop") {
      await shopNoti(email).then((data) => setNoti(data));
      setLoading(false);
    }
  };

  const triggerUserApplyJob = () => {
    setTimeout(() => {
      showNoti(email);
      setLoading(true);
    }, 2000);
  };

  useEffect(() => {
    showNoti(email);
    setLoading(true);
  }, [acceptTriggerAccOrDenie]);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="flex flex-col">
          <Navbar />
          <div className="flex justify-center text-2xl mb-6 mt-5 font-medium">{role == "shop" ? "คัดเลือกผู้สมัครงาน" : "ประวัติการสมัครงาน"}</div>
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4">
              {noti &&
                noti.map((noti, index) => {
                  if (role === "user") {
                    return <Mail key={index} id={noti._id} email_shopname={noti.email_shopname} shopname={noti.shopname} status={noti.status} date={noti.date} role={role} triggerUserApplyJob={triggerUserApplyJob} />;
                  } else {
                    return <Mail key={index} useremail={noti.email} shopname={noti.shopname} status={noti.status} date={noti.date} role={role} triggerAccOrDenie={triggerAccOrDenie} />;
                  }
                })}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};
