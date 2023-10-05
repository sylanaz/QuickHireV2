import React, { useState, useEffect, useContext  } from "react";
import map from "../img/map.png";
import money from "../img/money.png";
import job from "../img/user.png";
import gps from "../img/gps.png";

import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import Leaflet library for creating custom icon
import customMarkerIcon from "../img/pin.png";
import date from "../data/date";
import { applyJob, getUserApplyJob } from "../data/userApplyJob";
import axios from "axios";
import SwapImage from "../pages/Shop/SwapImage";
import { EditBTN } from "../pages/Shop/EditBTN";
import DescBTN from "../pages/BTN/DescBTN";
import Swal from "sweetalert2";

function Card({id, restaurantName, minilocation, position, hourlyIncome, img, lat, long, peopleneed, jobdesc, timework, welfare, location, email, triggerUserApplyJob }) {
  const [showModal, setShowModal] = React.useState(false);
  const useremail = localStorage.getItem("user");
  const status = "pending";
  const role = localStorage.getItem("role");

  const [user_fullname, setUser_Fullname] = useState("");

  const getUserFullname = async () => {
    const userFullName = await axios.get(`${process.env.REACT_APP_API}getUserinfo/${useremail}`);
    setUser_Fullname(userFullName.data.fullname);
  };

  useEffect(() => {
    if (role === "user") {
      getUserFullname();
    }
  }, []);
  // User apply job at shop
  const userApplyJob = async (useremail, shopname) => {
    // const data = await getUserApplyJob(useremail);

    // Check is it array or not
    // if (Array.isArray(data)) {
      // Detect user already apply job or not
      // const includesRestaurant = data.map((item) => item.shop_name.includes(shopname));
      // const countTrue = includesRestaurant.filter((value) => value === true).length;
      // If user not ever apply job at this shop
      // if (countTrue === 0) {
        // applyJob(useremail, user_fullname, email, restaurantName, status, date);
      // }
    // } else if (data === undefined) {
      applyJob(useremail, user_fullname, email, shopname, status, date);
    // } else {
      // console.error("Data is not an array:", data);
    // }
    triggerUserApplyJob();
  };

  const checkJob = async (shopname) => {
    Swal.fire({
      title: "สมัครงาน!",
      text: "ต้องการสมัครงานนี้หรือไม่",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3EC712",
      cancelButtonColor: "#D80000",
      cancelButtonText: "ไม่ต้องการ",
      confirmButtonText: "ต้องการ!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        userApplyJob(useremail, shopname);
        setShowModal(false);
      }
    });
  };

  return (
    <div className="w-44 h-60 xl:w-80 xl:h-[23rem] md:max-h-[40rem] border-4 border-[#6C8C9C] rounded-[20px] md:rounded-[40px] cursor-pointer bg-[#C7EFF6]">
      {" "}
      {/* max-w-xs */}
      <div className="flex flex-col rounded-[20px] md:rounded-[40px] relative group" onClick={() => setShowModal(true)}>
        {" "}
        {/*rounded-b-xl*/}
        <div className="flex flex-row rounded-[20px] md:rounded-[40px]">
          {/* {img !== undefined && <img src={img[0]} alt="Restaurant" className="rounded-full m-2 mb-1 mr-0 w-[50px] h-[50px] md:w-[130px] md:h-[130px] transition-opacity duration-300 ease-in-out md:ml-3 md:mt-3" />} */}
          <img src={img[0]} alt="Restaurant" className="rounded-full m-2 mb-1 mr-0 w-[50px] h-[50px] md:w-[180px] md:h-[100px]  transition-opacity duration-300 ease-in-out md:ml-3 md:mt-3" />
          <h2 className="w-full flex justify-center text-center px-2 my-auto text-lg font-bold text-[#224555] md:text-3xl">{restaurantName}</h2>
          {/* <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-in-out rounded-b-xl rounded-t-xl"></div> */}
        </div>
        <div className="px-2 pt-1 rounded-[20px] md:rounded-[40px] text-xs md:text-base">
          {" "}
          {/*rounded-b-xl*/}
          {/* <h2 className="text-lg font-bold text-[#306279] mb-1 md:text-xl">{restaurantName}</h2> */}
          <div className="flex items-center py-1">
            <img src="https://cdn-icons-png.flaticon.com/512/8801/8801434.png" alt="Position" className="w-8 h-8 mr-2 rounded-full md:w-10 md:h-10 md:ml-3" />
            <p className="text-[#09506B] text-sm font-bold md:text-xl md:pl-2">{position}</p>
          </div>
          <div className="flex items-center py-1">
            {/* <img src={money} alt="Hourly Income" className="w-6 h-6 mr-4" /> */}
            <img src="https://cdn-icons-png.flaticon.com/512/7280/7280222.png" alt="Location" className="w-8 h-8 mr-2 rounded-full md:w-10 md:h-10 md:ml-3" />
            <p className="text-[#09506B] text-sm font-bold md:text-xl md:pl-2">{hourlyIncome} ฿ / ชั่วโมง</p>
          </div>
          <div className="flex items-center py-1">
            <img src={gps} alt="Location" className="w-8 h-8 mr-2 rounded-full bg-white md:w-10 md:h-10 md:ml-3" />
            {/* <i class="fa-solid fa-money-bill-1" style={{ color: '#0aae1d' }}></i> */}
            {/* <FontAwesomeIcon icon={faMoneyBill} className="text-[#0aae1d]" /> */}
            <p className="text-[#09506B] text-sm font-bold md:text-xl md:pl-2">{minilocation}</p>
          </div>
          <DescBTN text="ดูรายละเอียดเพิ่มเติม" />
        </div>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-10 max-w-[1400px]">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">{restaurantName}</h3>
                </div>

                {/*body*/}
                <div className="grid grid-cols-1 xl:grid-cols-2 m-10">
                  {/* <img src={img} alt="Restaurant" className=" h-[200px] md:h-[300px] transition-opacity duration-300 ease-in-out rounded-xl mx-auto" /> */}
                  <SwapImage images={img} />
                  {/* Add leaflet tailwind here */}
                  <MapContainer center={[lat, long]} zoom={14} scrollWheelZoom={false} style={{ width: "500px" }} className="rounded-xl ">
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[lat, long]} icon={L.icon({ iconUrl: customMarkerIcon, iconSize: [30, 30] })}>
                      <Popup>{restaurantName}</Popup>
                    </Marker>
                  </MapContainer>
                </div>

                <div className="flex flex-col mx-12 text-lg gap-2">
                  <div className="flex">
                    <h1 className=" whitespace-nowrap  "> รายละเอียดงาน</h1>
                    <span role="img" aria-label="sheep" className="mr-2">
                      💼:
                    </span>
                    <h1 className="">{jobdesc}</h1>
                  </div>

                  <div className="flex">
                    <h1 className=" whitespace-nowrap  "> เวลาทำงาน</h1>
                    <span role="img" aria-label="sheep" className="mr-2">
                      🕜:
                    </span>
                    <h1 className="">{timework}</h1>
                  </div>

                  <div className="flex">
                    <h1 className=" whitespace-nowrap  "> สวัสดิการ</h1>
                    <span role="img" aria-label="sheep" className="mr-2">
                      💼:
                    </span>
                    <h1 className="">{welfare}</h1>
                  </div>

                  <div className="flex">
                    <h1 className=" whitespace-nowrap  "> จำนวนเงิน</h1>
                    <span role="img" aria-label="sheep" className="mr-2">
                      💵:
                    </span>
                    <h1 className="">{hourlyIncome} บาท / ชั่วโมง</h1>

                    <h1 className=" whitespace-nowrap ml-3"> จำนวนคน</h1>
                    <span role="img" aria-label="sheep" className="mr-2">
                      👨‍🦱:
                    </span>
                    <h1 className="">{peopleneed}</h1>
                  </div>

                  <div className="flex">
                    <h1 className=" whitespace-nowrap  "> สถานที่</h1>
                    <span role="img" aria-label="sheep" className="mr-2">
                      📍:
                    </span>
                    <h1 className="">{location}</h1>
                  </div>

                  <div className="flex items-center justify-between pb-10">
                    <div className="flex">
                      <h1 className=" whitespace-nowrap  "> สอบถามเพิ่มเติม</h1>
                      <span role="img" aria-label="sheep" className="mr-2">
                        📧:
                      </span>
                      <h1 className="">{email}</h1>
                    </div>
                    {role === "user" ? (
                      <div>
                        <button className="text-red-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setShowModal(false)}>
                          ปิดหน้าต่าง
                        </button>
                        <button
                          className="bg-orange-400 text-white active:bg-orange-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          // onClick={() => setShowModal(false)}
                          onClick={() => checkJob(restaurantName)}
                        >
                          สมัครงานด่วน
                        </button>
                      </div>
                    ) : (
                      <>
                        {/* { restaurantName, minilocation, position, hourlyIncome, img, lat, long, peopleneed, jobdesc, timework, welfare, location, email } */}
                        {email === useremail && <EditBTN id={id}/>}
                        <button className="bg-red-500 rounded text-white font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none ease-linear transition-all duration-150 mr-1 mb-1" type="button" onClick={() => setShowModal(false)}>
                          ปิดหน้าต่าง
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default Card;
