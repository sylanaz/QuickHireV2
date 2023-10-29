import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import camera from "../../img/camera.png";
import "react-image-crop/dist/ReactCrop.css";
import SwapImage from "./SwapImage";
import LoadingPage from "../LoadingPage";
import { TimePicker } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import CryptoJS from "crypto-js";

const Createshop = () => {
  const { id } = useParams();
  // const [firstname, setFirstname] = useState("");
  const [fullname, setFullname] = useState("");
  const [telnumber, setTelnumber] = useState("");
  const [shopname, setShopname] = useState("");
  const [location, setLocation] = useState("");
  const [timework, setTimework] = useState("");
  const [money, setMoney] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [welfare, setWelfare] = useState("");
  const [email, setEmail] = useState("");
  const [minilocation, setMinilocation] = useState("");
  const [workposition, setWorkposition] = useState("");
  const [jobdesc, setJobdesc] = useState("");
  const [peopleneed, setPeopleneed] = useState("");

  // Time range picker
  const [timeFrom, setTimeFrom] = useState(null);
  const [timeTo, setTimeTo] = useState(null);
  const [formatTimeFrom, setFormatTimeFrom] = useState(null);
  const [formatTimeTo, setFormatTimeTo] = useState(null);
  const [test, setTest] = useState(null);
  // const [formatTime, setFormatTime] = useState(null);
  const handleTimeFrom = (value, dateString) => {
    setTimeFrom(value);
    setFormatTimeFrom(dateString);
  };
  const handleTimeTo = (value, dateString) => {
    setTimeTo(value);
    setFormatTimeTo(dateString);
  };

  useEffect(() => {
    setEmail(CryptoJS.AES.decrypt(localStorage.getItem("user"), process.env.REACT_APP_ENCRYPT_KEY).toString(CryptoJS.enc.Utf8));
  },[]);

  // =====================================================
  const [imageURL, setImageURL] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOldData = async () => {
    await axios.get(`${process.env.REACT_APP_API}getSpecificDataShop/${id}`).then((data) => {
      setFullname(data.data.fullname);
      setTelnumber(data.data.telnumber);
      setShopname(data.data.shopname);
      setLocation(data.data.location);
      setTimework(data.data.timework);
      setTimeFrom(dayjs(data.data.timeFrom));
      setTimeTo(dayjs(data.data.timeTo));
      setMoney(data.data.money);
      setLat(data.data.lats);
      setLong(data.data.longs);
      setWelfare(data.data.welfare);
      setEmail(data.data.email);
      setMinilocation(data.data.minilocation);
      setWorkposition(data.data.workposition);
      setJobdesc(data.data.jobdesc);
      setPeopleneed(data.data.peopleneed);
      setImageURL(JSON.parse(data.data.img));
      setLoading(false);
    });
  };
  useEffect(() => {
    if (id != 0) {
      getOldData();
      setLoading(true);
    }
  }, []);
  // =====================================================

  // =====================================================
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Only proceed with the upload if an image is selected
    const imageJSON = JSON.stringify(imageURL);
    const formData = {
      email: email,
      telnumber: telnumber,
      fullname: fullname,
      shopname: shopname,
      workposition: workposition,
      jobdesc: jobdesc,
      timeFrom: timeFrom,
      timeTo: timeTo,
      timework: formatTimeFrom + " - " + formatTimeTo,
      // formatTime: formatTime,
      money: money,
      peopleneed: peopleneed,
      welfare: welfare,
      location: location,
      lats: lat,
      longs: long,
      minilocation: minilocation,
      img: imageJSON,
      test: test,
      // newuser: "old",
    };
    if (id == 0) {
      await axios
        .post(`${process.env.REACT_APP_API}uploadJobinfo`, formData)
        .then((response) => {
          // Handle the API response as needed
          axios.post(`${process.env.REACT_APP_API}changeRolesShop`, { email: email, newuser: "old" });
          localStorage.setItem("newuser", "old");
          window.location.replace("/");
        })
        .catch((error) => {
          // Handle errors
          console.error("Error uploading image:", error);
        });
    } else {
      await axios.post(`${process.env.REACT_APP_API}updateJob/${id}`, formData).then(
        setTimeout(() => {
          window.location.replace("/");
        }, 1000)
      );
    }
  };
  const MAX_LENGTH = 5;
  const handleImageSelect = (e) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      if (files.length <= MAX_LENGTH) {
        const imageUrls = [];

        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();

          reader.onloadend = () => {
            imageUrls.push(reader.result);
            if (imageUrls.length === files.length) {
              setImageURL(imageUrls);
            }
          };

          reader.readAsDataURL(files[i]);
        }
      } else {
        e.preventDefault();
        alert(`กรุณาเลือกไฟล์รูปภาพไม่เกิน ${MAX_LENGTH} รูป`);
      }
    }
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="Home mx-auto h-screen ">
          <Navbar></Navbar>
          <h1 className="flex justify-center text-2xl font-medium mt-5">กรอกข้อมูลสำหรับร้านค้า</h1>
          <div className="flex justify-center gap-5 text-white mt-10 mx-10"></div>
          <div>
            <div className="flex justify-center  ">
              <div className="flex justify-center ">
                <form>
                  <div className="flex flex-col justify-center">
                    <label htmlFor="imageInput">
                      {imageURL.length > 0 ? (
                        <SwapImage images={imageURL} forProfile={true}></SwapImage>
                      ) : (
                        // <img src={image} alt="Preview" className="max-w-[200px] max-h-[200px] md:max-w-[400px] md:max-h-[400px] rounded-full mx-auto cursor-pointer" />;
                        <div className="w-[200px] h-[200px] md:w-[400px] md:h-[400px] border-dashed border-4 border-sky-500 rounded-xl mx-auto cursor-pointer">
                          <img className=" w-20 md:w-40 hover:rotate-12 hover:scale-125 duration-300 mx-auto mt-14 md:mt-28 flex " src={camera} alt="camera" />
                        </div>
                      )}
                    </label>
                    <input type="file" accept="image/*" multiple onChange={handleImageSelect} id="imageInput" className="hidden" />
                  </div>
                </form>
              </div>
            </div>
            <div className="mx-10">
              <div className="flex flex-col">
                <h1 className="m-3 text-xl font-medium">ชื่อร้าน</h1>
                <input onChange={(event) => setShopname(event.target.value)} type="text" value={shopname} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
              </div>
              <div className="flex flex-col">
                <h1 className="m-3 text-xl font-medium">ชื่อจริง - นามสกุล (เจ้าของร้าน)</h1>
                <input onChange={(event) => setFullname(event.target.value)} type="text" value={fullname} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
              </div>
              <div className="flex flex-col">
                <h1 className="m-3 text-xl font-medium">Email</h1>
                <input type="text" disabled={true} value={email} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
              </div>
              <div className="flex flex-col">
                <h1 className="m-3 text-xl font-medium">เบอร์โทรศัพท์</h1>
                <input onChange={(event) => setTelnumber(event.target.value)} type="text" value={telnumber} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
              </div>
              <div className="flex flex-col">
                <h1 className="m-3 text-xl font-medium">ตำแหน่งงาน</h1>
                <input onChange={(event) => setWorkposition(event.target.value)} type="text" value={workposition} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
              </div>
              <div className="flex flex-col">
                <h1 className="m-3 text-xl font-medium">รายละเอียดงาน</h1>
                <input onChange={(event) => setJobdesc(event.target.value)} type="text" value={jobdesc} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
              </div>
              <div className="flex flex-col">
                <h1 className="m-3 text-xl font-medium">เวลาทำงาน</h1>
                <div className="flex">
                  {/* <TimePicker.RangePicker onChange={handleChangeTime} value={test} format="HH:mm" showSecond={false} minuteStep={5} className=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" /> */}
                  <TimePicker format="HH:mm" value={timeFrom} onChange={handleTimeFrom} showNow={false} showSecond={false} minuteStep={5} className=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                  <TimePicker format="HH:mm" value={timeTo} onChange={handleTimeTo} showNow={false} showSecond={false} minuteStep={5} className=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                </div>
                {/* <input onChange={(event) => setTimework(event.target.value)} type="text" value={timework} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input> */}
              </div>
              <div className="flex flex-col">
                <h1 className="m-3 text-xl font-medium">ค่าแรง / ชั่วโมง (บาท)</h1>
                <input onChange={(event) => setMoney(event.target.value)} type="text" value={money} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
              </div>
              <div className="flex flex-col">
                <h1 className="m-3 text-xl font-medium">จำนวนคนที่ต้องการจ้าง</h1>
                <input onChange={(event) => setPeopleneed(event.target.value)} type="text" value={peopleneed} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
              </div>
              <div className="flex flex-col">
                <h1 className="m-3 text-xl font-medium">สวัสดิการ</h1>
                <input onChange={(event) => setWelfare(event.target.value)} type="text" value={welfare} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
              </div>
              <div className="flex flex-col">
                <h1 className="m-3 text-xl font-medium">ที่อยู่ร้าน</h1>
                <input
                  onChange={(event) => setLocation(event.target.value)}
                  type="text"
                  value={location}
                  class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="เช่น 
123 หมู่ 16 ถ.มิตรภาพ ต.ในเมือง อ.เมือง จ.ขอนแก่น 40000"
                ></input>
              </div>
              <div className="flex flex-col">
                <h1 className="m-3 text-xl font-medium">ตำแหน่งร้าน GPS (Latitude)</h1>
                <input onChange={(event) => setLat(event.target.value)} type="text" value={lat} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="เช่น 16.2912"></input>
              </div>
              <div className="flex flex-col">
                <h1 className="m-3 text-xl font-medium">ตำแหน่งร้าน GPS (Longitude)</h1>
                <input onChange={(event) => setLong(event.target.value)} type="text" value={long} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="เช่น 102.6162"></input>
                <a href="https://www.iphone-droid.net/how-to-get-the-coordinates-or-search-by-latitude-longitude-on-google-maps/">
                  <h1 className="text-orange-400 font-medium mt-2"> วิธีหา Latitude Longitude ใน Google maps</h1>
                </a>
              </div>
              <div className="flex flex-col">
                <h1 className="m-3 text-xl font-medium">สถานที่ (บริเวณ)</h1>
                <input onChange={(event) => setMinilocation(event.target.value)} type="text" placeholder="เช่น หลัง มข." value={minilocation} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
              </div>
              <div className="flex mx-auto mt-10">
                <button className="flex mx-auto text-xl font-medium border-2 border-black rounded-lg p-3" onClick={handleSubmit}>
                  ยืนยันข้อมูล
                </button>
              </div>
            </div>
          </div>

          <Footer></Footer>
        </div>
      )}
    </>
  );
};

export default Createshop;
