import React, { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import camera from "../img/camera.png";
import Datepicker from "flowbite-datepicker/Datepicker";
import SwapImage from "./Shop/SwapImage";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const Createprofile = () => {
  const stages = ["personalInfo", "educationAndWork", "abilities"]; // Define stage names
  const [currentIndex, setCurrentIndex] = useState(0); // Keep track of the current stage index
  const currentStage = stages[currentIndex]; // Get the current stage name
  const [selectedImage, setSelectedImage] = useState(null);
  const [Imageblob, setImageblob] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 }); // Set the aspect ratio here
  const [showModal, setShowModal] = React.useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  // const [fullname, setFullname] = useState("");
  const [nickname, setNickname] = useState("");
  const [sex, setSex] = useState("");
  const [telnumber, setTelnumber] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [national, setNational] = useState("");
  const [area, setArea] = useState("");
  const [degree, setDegree] = useState("");
  const [workexp, setWorkexp] = useState("");
  const [thailevel, setThailevel] = useState("");
  const [englevel, setEnglevel] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [talent, setTalent] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const imageJSON = JSON.stringify(selectedImage);
    const fullname = firstname + " " + lastname;
  
      axios
        .post(`${process.env.REACT_APP_API}uploadUserinfo`, {
          fullname: fullname,
          telnumber: telnumber,
          nickname: nickname,
          sex: sex,
          birthdate:birthdate,
          national:national,
          area:area,
          degree:degree,
          workexp:workexp,
          thailevel:thailevel,
          englevel:englevel,
          vehicle:vehicle,
          talent:talent,
          img: imageJSON,
          email: email,
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
    // }
  };

  const MAX_LENGTH = 3;
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
            setSelectedImage(imageUrls);
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
    <div className="Home mx-auto min-h-screen">
      <Navbar></Navbar>
      <h1 className="flex justify-center text-2xl mt-5">กรอกข้อมูลสำหรับผู้สมัครงาน</h1>
      <div className="flex flex-wrap justify-center gap-5 text-white mt-10 mx-10 text-center">
        {stages.map((stageName, index) => (
          <div
            key={stageName}
            className={`w-full sm:w-auto relative cursor-pointer rounded-xl ${currentStage === stageName ? "bg-cyan-700" : "bg-gray-400"}`}
            onClick={() => setCurrentIndex(index)}
            style={{ flex: "1 0 calc(33.333% - 1rem)" }} // Adjust the width as needed
          >
            <h1 className={`p-4 ${currentStage === stageName ? "text-white" : "text-gray-900"}`}>{stageLabels[stageName]}</h1>
            <h1 className="text-xl font-bold absolute bg-orange-400 px-4 py-1 rounded-full -top-5 left-1/2 -translate-x-1/2">{index + 1}</h1>
          </div>
        ))}
      </div>

      {currentStage === "personalInfo" && (
        <div>
          <div className="flex justify-center mt-10 ">
            <div className="flex justify-center ">
              <form>
                <div className="flex flex-col justify-center">
                  <label htmlFor="imageInput">
                    {selectedImage ? (
                        <SwapImage images={selectedImage}></SwapImage>
                    ) : (
                      <div className="w-[200px] h-[200px] md:w-[400px] md:h-[400px] border-dashed border-4 border-sky-500 rounded-xl mx-auto cursor-pointer">
                        <img className="w-20 md:w-40 hover:rotate-12 hover:scale-125 duration-300 mx-auto mt-14 md:mt-28 flex " src={camera} alt="camera" />
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
              <h1 className="m-3 text-xl font-medium">ชื่อจริง</h1>
              <input onChange={(event) => setFirstname(event.target.value)} type="text" value={firstname} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
            </div>
            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">นามสกุล</h1>
              <input onChange={(event) => setLastname(event.target.value)} type="text" value={lastname} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
              <h1 className="text-orange-400 font-medium mt-2"> โปรดระบุข้อมูลจริงตามบัตรประชาชน เนื่องจากมีผลต่อการสมัครงาน</h1>
            </div>
            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">ชื่อเล่น</h1>
              <input onChange={(event) => setNickname(event.target.value)} type="text" value={nickname} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
            </div>

            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">เพศ</h1>
              <input onChange={(event) => setSex(event.target.value)} type="text" value={sex} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
            </div>
            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">วัน/เดือน/ปี เกิด</h1>
              <input type="date" className="bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
              {/* <input onChange={(event) => setBirthdate(event.target.value)} type="text" value={birthdate} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="00/00/0000"></input> */}
            </div>
            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">สัญชาติ</h1>
              <input onChange={(event) => setNational(event.target.value)} type="text" value={national} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
            </div>
            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">Email</h1>
              <input onChange={(event) => setEmail(event.target.value)} type="text" value={email} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
            </div>
            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">เบอร์โทรศัพท์</h1>
              <input onChange={(event) => setTelnumber(event.target.value)} type="text" value={telnumber} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
            </div>
          </div>
        </div>
      )}
      {/* Education */}
      {currentStage === "educationAndWork" && (
        <div className="mt-4 mb-20">
          <div className="mx-10">
            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">ประวัติการศึกษา (กำลังศึกษาอยู่/จบการศึกษา)</h1>
              <input
                onChange={(event) => setDegree(event.target.value)}
                type="text"
                value={degree}
                className="h-16 bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="เช่น จบการศึกษามัธยมศึกษาปีที่6 ที่โรงเรียนชุมแพศึกษา
จบการศึกษาปริญญาตรีจากคณะวิทยาศาสตร์ สาขาฟิสิกส์ มหาวิทยาลัยขอนแก่น
กำลังศึกษาปริญญาตรีคณะวิศวกรรมศาสตร์ มหาวิทยาลัยขอนแก่น เป็นต้น"
              ></input>
            </div>
            <div>
              <h1 className="m-3 text-xl font-medium">หนังสือรับรองผลการศึกษา (ถ้ามี)</h1>
              {/* <input type="file" accept=".jpg, .jpeg, .png, .pdf"  onChange={handleFileChange}  className="w-[100%] md:w-full rounded-[10px] border-[1px] solid bg-cyan" /> */}
            </div>
            <div className="flex flex-col ">
              <h1 className="m-3 text-xl font-medium">ประวัติการทำงาน/ฝึกงาน (อธิบายโดยละเอียด)</h1>
              <input onChange={(event) => setWorkexp(event.target.value)} type="text" value={workexp} class=" h-16 bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="เช่น ปี 2020-2022 เป็นพนักงานทำความสะอาด ที่โรงพยาบาลขอนแก่น ได้รับหน้าที่ดูแลความสะอาดบริเวณตึกผู้ป่วย A B C เป็นต้น  หากไม่เคยมีประสบการณ์ทำงานให้กรอก ไม่มีประสบการณ์ทำงาน"></input>
            </div>
            <div>
              <h1 className="m-3 text-xl font-medium">หลักฐานการฝึกงาน/ทำงาน (ถ้ามี)</h1>
              {/* <input type="file" accept=".jpg, .jpeg, .png, .pdf" onChange={handleFileChange} className="w-[100%] md:w-full rounded-[10px] border-[1px] solid bg-cyan" /> */}
              {/* {selectedFile && <p>Selected file: {selectedFile.name}</p>} */}
            </div>
          </div>
        </div>
      )}

      {currentStage === "abilities" && (
        <div className="mt-4 ">
          <div className="mx-10">
            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">ความสามารถด้านภาษา (ไทย)</h1>
              <input onChange={(event) => setThailevel(event.target.value)} type="text" value={thailevel} class="h-16 bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="เช่น ฟัง พูด อ่าน เขียน ได้"></input>
            </div>
            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">ความสามารถด้านภาษา (อังกฤษ)</h1>
              <input onChange={(event) => setEnglevel(event.target.value)} type="text" value={englevel} class="h-16 bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="เช่น ฟัง พูด อ่าน เขียน ได้"></input>
            </div>
            <div className="flex flex-col ">
              <h1 className="m-3 text-xl font-medium">ความสามารถในการขับรถ</h1>
              <input onChange={(event) => setVehicle(event.target.value)} type="text" value={vehicle} class=" h-16 bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="เช่น ไม่มีใบขับขี่ รถจักรยานยนต์ รถยนต์ รถบรรทุก"></input>
            </div>
            <div className="flex mx-auto mt-10">
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-5 ">
        <button onClick={handlePrevClick} className={`p-3 mr-2 rounded-lg ${currentIndex === 0 ? "bg-gray-400" : "bg-cyan-700 text-white"}`} disabled={currentIndex === 0}>
          Previous
        </button>
        {renderNextButton()}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Createprofile;
