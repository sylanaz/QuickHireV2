import React, { useState } from "react";
import axios from "axios";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import camera from "../../img/camera.png";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const Createshop = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [Imageblob, setImageblob] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 }); // Set the aspect ratio here
  const [showModal, setShowModal] = React.useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [telnumber, setTelnumber] = useState("");
  const [shopname, setShopname] = useState("");
  const [location, setLocation] = useState("");
  const [timework, setTimework] = useState("");
  const [money, setMoney] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [welfare, setWelfare] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Only proceed with the upload if an image is selected
    if (Imageblob instanceof Blob) {
      const formData = new FormData();
      formData.append("file", Imageblob);
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("shopname", shopname);
      formData.append("location", location);
      formData.append("timework", timework);
      formData.append("money", money);
      formData.append("lat", lat);
      formData.append("long", long);
      formData.append("welfare", welfare);
      formData.append("email", email);
      formData.append("telnumber", telnumber);

      axios
        .post("https://quickhirebackend.onrender.com/uploadShopinfo", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // Handle the API response as needed
          console.log(response.data);
          localStorage.setItem("newuser", "old");
          window.location.replace("/Profile");
        })
        .catch((error) => {
          // Handle errors
          console.error("Error uploading image:", error);
        });
    }
  };

  const handleCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setShowModal(true);
  };

  const handleImageCrop = () => {
    if (selectedImage && crop.width && crop.height) {
      const image = new Image();
      image.src = selectedImage;
      image.onload = () => {
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const canvas = document.createElement("canvas");
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width, crop.height);

        canvas.toBlob((blob) => {
          setImageblob(blob);
          setShowModal(false);
        });

        const croppedImageDataURL = canvas.toDataURL(); // Get the data URL of the cropped image
        setSelectedImage(croppedImageDataURL);

        setShowModal(false);
      };
    }
  };

  return (
    <div className="Home max-w-[1400px] mx-auto ">
      <Navbar></Navbar>
      <h1 className="flex justify-center text-2xl font-medium ">กรอกข้อมูลสำหรับร้านค้า</h1>
      <div className="flex justify-center gap-5 text-white mt-10 mx-10"></div>
        <div>
          <div className="flex justify-center  ">
            <div className="flex justify-center ">
              <form>
                <div className="flex flex-col justify-center">
                  <label htmlFor="imageInput">
                    {selectedImage ? (
                      <img src={selectedImage} alt="Preview" className="max-w-[400px] max-h-[400px] rounded-lg mx-auto cursor-pointer" />
                    ) : (
                      <div className="w-[400px] h-[400px] border-dashed border-4 border-sky-500 rounded-xl mx-auto cursor-pointer">
                        <img className=" w-40 hover:rotate-12 hover:scale-125 duration-300 mx-auto mt-28 flex " src={camera} alt="camera" />
                      </div>
                    )}
                  </label>
                  <input type="file" accept="image/*" onChange={handleImageSelect} id="imageInput" className="hidden" />
                </div>
              </form>
            </div>
          </div>

          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-10 max-w-[1400px]">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t ">
                      <h3 className="text-3xl font-semibold">เลือกรูปภาพที่ต้องการตัด</h3>
                      <button className=" ml-auto bg-transparent border-0 text-black opacity-90  float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => setShowModal(false)}>
                        <span className="bg-transparent text-black opacity-90 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                      </button>
                    </div>

                    <div className="flex">{selectedImage && <ReactCrop src={selectedImage} crop={crop} onChange={handleCropChange} className="mx-auto my-auto" />}</div>
                    <button type="button" onClick={handleImageCrop} className="flex mx-auto text-xl font-medium border-2 border-black rounded-lg p-3 my-3">
                      ตัดรูป
                    </button>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}

          <div className="mx-10">
            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">ชื่อร้าน</h1>
              <input onChange={(event) => setShopname(event.target.value)} type="text" value={shopname} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
            </div>
            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">ชื่อจริง (เจ้าของร้าน)</h1>
              <input onChange={(event) => setFirstname(event.target.value)} type="text" value={firstname} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
            </div>

            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">นามสกุล</h1>
              <input onChange={(event) => setLastname(event.target.value)} type="text" value={lastname} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
              <h1 className="text-orange-400 font-medium mt-2"> โปรดระบุข้อมูลจริงตามบัตรประชาชน เนื่องจากมีผลต่อการสมัครใช้งานเว็บไซต์</h1>
            </div>
            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">เวลาทำงาน</h1>
              <input onChange={(event) => setTimework(event.target.value)} type="text" value={timework} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
            </div>
            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">ค่าแรง / ชั่วโมง (บาท)</h1>
              <input onChange={(event) => setMoney(event.target.value)} type="text" value={money} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
            </div>
            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">สวัสดิการ</h1>
              <input onChange={(event) => setWelfare(event.target.value)} type="text" value={welfare} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
            </div>
            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">ที่อยู่ร้าน</h1>
              <input onChange={(event) => setLocation(event.target.value)} type="text" value={location} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="เช่น 
123 หมู่ 16 ถ.มิตรภาพ ต.ในเมือง อ.เมือง จ.ขอนแก่น 40000"></input>
            </div>
            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">ตำแหน่งร้าน GPS (Latitude)</h1>
              <input onChange={(event) => setLat(event.target.value)} type="text" value={lat} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="เช่น 16.2912"></input>
            </div>
            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">ตำแหน่งร้าน GPS (Longitude)</h1>
              <input onChange={(event) => setLong(event.target.value)} type="text" value={long} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="เช่น 102.6162"></input>
              <a href="https://www.iphone-droid.net/how-to-get-the-coordinates-or-search-by-latitude-longitude-on-google-maps/"><h1 className="text-orange-400 font-medium mt-2"> วิธีหา Latitude Longitude ใน Google maps</h1></a>
            </div>
            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">Email</h1>
              <input onChange={(event) => setEmail(event.target.value)} type="text" value={email} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
            </div>
            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">เบอร์โทรศัพท์</h1>
              <input onChange={(event) => setTelnumber(event.target.value)} type="text" value={telnumber} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
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
  );
};

export default Createshop;
