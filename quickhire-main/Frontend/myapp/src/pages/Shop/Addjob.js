import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";
import Card from "../../components/Card";
import CardAddJob from "./CardAddJob";
import { Link } from "react-router-dom";

const Addjob = () => {
  const user = localStorage.getItem("user");
  const [userData, setUserData] = useState(null);
  const [Imageblob, setImageblob] = useState(null);

  const [minilocation, setMinilocation] = useState("");
  const [workposition, setWorkposition] = useState("");
  const [money, setMoney] = useState("");
  const [jobdesc, setJobdesc] = useState("");
  const [peopleneed, setPeopleneed] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace this with the actual API endpoint
        const apiUrl = `http://localhost:3001/getAllShopinfo/${user}`;

        const response = await axios.get(apiUrl);
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

  // const handleSubmit = async () => {
  //   const imgBlob = new Blob([new Uint8Array(userData.img.data)], { type: "image/jpeg" });

  //   // Create a FormData object to send the binary data
  //   const formData = new FormData();
  //   formData.append("img", imgBlob);
  //   formData.append("shopname", userData.shopname);
  //   formData.append("workposition", workposition);
  //   formData.append("money", money);
  //   formData.append("jobdesc", jobdesc);
  //   formData.append("timework", userData.timework);
  //   formData.append("welfare", userData.welfare);
  //   formData.append("peopleneed", peopleneed);
  //   formData.append("lat", userData.lat);
  //   formData.append("long", userData.long);
  //   formData.append("location", userData.location);
  //   formData.append("email", userData.email);
  //   formData.append("minilocation", minilocation);

  //   try {
  //     const response = await axios.post("http://localhost:3001/uploadJob", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data", // Set the proper Content-Type header
  //       },
  //     });
  //     // Handle successful response here (if needed)
  //     console.log("Data sent successfully:", response.data);
  //     window.location.replace("/");
  //   } catch (error) {
  //     // Handle error here
  //     console.error("Error sending data:", error);
  //   }
  // };

  // const decodeBlobToImageUrl = (blobData) => {
  //   if (!blobData) return null;
  //   const blob = new Blob([new Uint8Array(blobData.data)], { type: "image/jpeg" });
  //   const imageUrl = URL.createObjectURL(blob);
  //   return imageUrl;
  // };

  return (
    <div className="flex flex-col justify-center mx-auto">
      <Navbar></Navbar>
      <h1 className="text-2xl flex justify-center mb-6 mt-5 font-medium">สร้างประกาศรับสมัครพนักงาน</h1>
      {/* <div className="flex flex-row"> */}
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
      {/* </div> */}
      {/* <div className="mx-10">
        <div className="flex flex-col">
          <h1 className="m-3 text-xl font-medium">รายละเอียดงาน</h1>
          <input onChange={(event) => setJobdesc(event.target.value)} type="text" value={jobdesc} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
        </div>
        <div className="flex flex-col">
          <h1 className="m-3 text-xl font-medium">สถานที่ (บริเวณ)</h1>
          <input onChange={(event) => setMinilocation(event.target.value)} type="text" placeholder="เช่น หลัง มข." value={minilocation} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
        </div>
        <div className="flex flex-col">
          <h1 className="m-3 text-xl font-medium">ตำแหน่งงาน</h1>
          <input onChange={(event) => setWorkposition(event.target.value)} type="text" value={workposition} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
        </div>
        <div className="flex flex-col">
          <h1 className="m-3 text-xl font-medium">จำนวนคนที่ต้องการจ้าง</h1>
          <input onChange={(event) => setPeopleneed(event.target.value)} type="text" value={peopleneed} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
        </div>
        <div className="flex flex-col">
          <h1 className="m-3 text-xl font-medium">ค่าแรงต่อชั่วโมง (บาท)</h1>
          <input onChange={(event) => setMoney(event.target.value)} type="text" value={money} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
        </div>
        <div className="flex mx-auto mt-10">
          <button className="flex mx-auto text-xl font-medium border-2 border-black rounded-lg p-3" onClick={handleSubmit}>
            ประกาศ
          </button>
        </div>
      </div> */}
      {/* <div className="absolute w-screen bottom-[0]"> */}
      <Footer></Footer>
      {/* </div> */}
    </div>
  );
};

export default Addjob;
