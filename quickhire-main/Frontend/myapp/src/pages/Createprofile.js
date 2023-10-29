import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import camera from "../img/camera.png";
import Datepicker from "flowbite-datepicker/Datepicker";
import SwapImage from "./Shop/SwapImage";
import CryptoJS from "crypto-js";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";

const Createprofile = () => {
  const { id } = useParams();

  const stages = ["personalInfo", "educationAndWork", "abilities"]; // Define stage names
  const [currentIndex, setCurrentIndex] = useState(0); // Keep track of the current stage index
  const currentStage = stages[currentIndex]; // Get the current stage name
  const [selectedImage, setSelectedImage] = useState(null);
  // const [Imageblob, setImageblob] = useState(null);
  // const [crop, setCrop] = useState({ aspect: 1 / 1 }); // Set the aspect ratio here
  // const [showModal, setShowModal] = React.useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [getfirstname, setFirstname] = useState("");
  const [getlastname, setLastname] = useState("");
  // const [fullname, setFullname] = useState("");
  const [getnickname, setNickname] = useState("");
  const [getsex, setSex] = useState("");
  const [gettelnumber, setTelnumber] = useState("");
  const [getbirthdate, setBirthdate] = useState("");
  const [getnational, setNational] = useState("");
  const [area, setArea] = useState("");
  const [getdegree, setDegree] = useState("");
  const [getworkexp, setWorkexp] = useState("");
  const [getthailevel, setThailevel] = useState("");
  const [getenglevel, setEnglevel] = useState("");
  const [getvehicle, setVehicle] = useState("");
  const [gettalent, setTalent] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  // const [newLanguage, setNewLanguage] = useState("");
  const [languages, setLanguages] = useState([
    { name: "", checkboxes: [false, false, false, false] },
    { name: "", checkboxes: [false, false, false, false] },
    { name: "", checkboxes: [false, false, false, false] },
    { name: "", checkboxes: [false, false, false, false] },
  ]);

  const handleLanguageChange = (index, newName) => {
    setLanguages((prevLanguages) => {
      const updatedLanguages = [...prevLanguages];
      updatedLanguages[index].name = newName;
      return updatedLanguages;
    });
  };

  const handleCheckboxChange = (languageIndex, checkboxIndex) => {
    setLanguages((prevLanguages) => {
      const updatedLanguages = [...prevLanguages];
      updatedLanguages[languageIndex].checkboxes[checkboxIndex] = !updatedLanguages[languageIndex].checkboxes[checkboxIndex];
      return updatedLanguages;
    });
  };

  useEffect(() => {
    setEmail(CryptoJS.AES.decrypt(localStorage.getItem("user"), process.env.REACT_APP_ENCRYPT_KEY).toString(CryptoJS.enc.Utf8));
  }, []);

  const enCryptData = (data) => {
    return CryptoJS.AES.encrypt(data, process.env.REACT_APP_ENCRYPT_KEY).toString();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const imageJSON = JSON.stringify(selectedImage);
    const getfullname = getfirstname + " " + getlastname;

    const fullname = enCryptData(getfullname);
    const nickname = enCryptData(getnickname);
    const sex = enCryptData(getsex);
    const telnumber = enCryptData(gettelnumber);
    const birthdate = enCryptData(getbirthdate);
    const national = enCryptData(getnational);
    const degree = enCryptData(getdegree);
    const workexp = enCryptData(getworkexp);
    // const thailevel = enCryptData(getthailevel);
    // const englevel = enCryptData(getenglevel);
    // const vehicle = enCryptData(getvehicle);
    // const talent = enCryptData(gettalent);

    axios
      .post(`${process.env.REACT_APP_API}uploadUserinfo/${email}`, {
        fullname: fullname,
        telnumber: telnumber,
        nickname: nickname,
        sex: sex,
        birthdate: birthdate,
        national: national,
        area: area,
        degree: degree,
        workexp: workexp,
        // thailevel: thailevel,
        // englevel: englevel,
        // vehicle: vehicle,
        // talent: talent,
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
            // localStorage.setItem("image", reader.result);
            // If you need to do something with each image URL here, you can do it inside this loop.

            // If this is the last file, you can perform further actions with the array of image URLs.
            if (imageUrls.length === files.length) {
              setSelectedImage(imageUrls);
              // Handle the array of image URLs (imageUrls) here.
              // You can pass it to a function or perform further processing.
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

  const deCryptData = (data) => {
    return CryptoJS.AES.decrypt(data, process.env.REACT_APP_ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
  };

  const getOldData = async () => {
    await axios.get(`${process.env.REACT_APP_API}getSpecificDataUser/${id}`).then((data) => {
      const fullname = deCryptData(data.data.fullname);
      setFirstname(fullname.split(" ")[0]);
      setLastname(fullname.split(" ")[1]);
      setTelnumber(deCryptData(data.data.telnumber));
      setNickname(deCryptData(data.data.nickname));
      setSex(deCryptData(data.data.sex));
      setBirthdate(deCryptData(data.data.birthdate));
      setNational(deCryptData(data.data.national));
      setArea(deCryptData(data.data.area));
      setDegree(deCryptData(data.data.degree));
      setWorkexp(deCryptData(data.data.workexp));
      setThailevel(deCryptData(data.data.thailevel));
      setEnglevel(deCryptData(data.data.englevel));
      setVehicle(deCryptData(data.data.vehicle));
      setTalent(deCryptData(data.data.talent));
      setEmail(data.data.email);
      setSelectedImage(JSON.parse(data.data.img));
      setLoading(false);
    });
  };

  useEffect(() => {
    if (id !== 0 && localStorage.getItem("newuser") === "old") {
      getOldData();
      setLoading(true);
    }
  }, []);
  console.log(loading);

  const stageLabels = {
    personalInfo: "ข้อมูลส่วนบุคคล",
    educationAndWork: "ประวัติการศึกษา และ การทำงาน/ฝึกงาน",
    abilities: "ความสามารถ",
  };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  // };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Move to the previous stage
    }
  };

  const handleNextClick = () => {
    if (currentIndex < stages.length - 1) {
      setCurrentIndex(currentIndex + 1); // Move to the next stage
    } else {
    }
  };

  const isFormComplete = () => {
    const personalInfoComplete = selectedImage && getfirstname.trim() !== "" && getlastname.trim() !== "" && getnickname.trim() !== "" && getsex.trim() !== "" && getbirthdate.trim() !== "" && getnational.trim() !== "" && email.trim() !== "" && gettelnumber.trim() !== "";

    const educationAndWorkComplete = getdegree.trim() !== "" && getworkexp.trim() !== "";

    const abilitiesComplete = getthailevel.trim() !== "" && getenglevel.trim() !== "" && getvehicle.trim() !== "";

    // Check if all stages are complete
    return personalInfoComplete && educationAndWorkComplete && abilitiesComplete;
  };

  const renderNextButton = () => {
    // Check if the form is complete before rendering the button
    const isComplete = isFormComplete();
    // console.log(isComplete);
    if (currentStage === "abilities") {
      // const completeColor = isComplete ? "bg-blue-700 text-white" : "bg-gray-400";
      return (
        <button className={`p-3 rounded-lg ${currentIndex === stages.length - 1 && !isComplete ? "bg-gray-400" : isComplete ? "bg-cyan-700 text-white" : "bg-cyan-700 text-white"}`} onClick={isComplete ? handleSubmit : undefined} disabled={!isComplete && currentIndex !== stages.length - 1}>
          {isComplete ? "ยืนยันข้อมูล" : "กรุณากรอกข้อมูล"}
        </button>
      );
    } else {
      return (
        <button className={`p-3 ml-2 rounded-lg ${currentIndex === stages.length - 1 ? "bg-gray-400" : "bg-cyan-700 text-white"}`} disabled={currentIndex === stages.length - 1} onClick={handleNextClick}>
          Next
        </button>
      );
    }
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="Home mx-auto min-h-fit">
          <Navbar></Navbar>
          <h1 className="flex justify-center text-2xl mt-5">กรอกข้อมูลสำหรับผู้สมัครงาน</h1>
          <div className="flex flex-wrap justify-center gap-7 md:gap-3 text-white mt-10 mx-10 text-center">
            {stages.map((stageName, index) => (
              <div
                key={stageName}
                className={`w-full sm:w-auto relative cursor-pointer rounded-xl ${currentStage === stageName ? "bg-cyan-700" : "bg-gray-400"}`}
                onClick={() => setCurrentIndex(index)}
                style={{ flex: "1 0 calc(33.333% - 1rem)" }} // Adjust the width as needed
              >
                <h1 className={`p-4 text-xl ${currentStage === stageName ? "text-white" : "text-gray-900"}`}>{stageLabels[stageName]}</h1>
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
                          // <img src={selectedImage} alt="Preview" className="max-w-[200px] max-h-[200px] md:max-w-[400px] md:max-h-[400px] rounded-full mx-auto cursor-pointer" />
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
              {/* insert pictrue */}
              {/* {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-10 max-w-[1400px]"> */}
              {/*content*/}
              {/* <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"> */}
              {/*header*/}
              {/* <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t ">
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
          ) : null} */}
              <div className="mx-10">
                <div className="flex flex-col">
                  <h1 className="m-3 text-xl font-medium">ชื่อจริง</h1>
                  <input onChange={(event) => setFirstname(event.target.value)} type="text" value={getfirstname} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
                </div>
                <div className="flex flex-col">
                  <h1 className="m-3 text-xl font-medium">นามสกุล</h1>
                  <input onChange={(event) => setLastname(event.target.value)} type="text" value={getlastname} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
                  <h1 className="text-orange-400 font-medium mt-2"> โปรดระบุข้อมูลจริงตามบัตรประชาชน เนื่องจากมีผลต่อการสมัครงาน</h1>
                </div>
                {/* <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">ชื่อจริง - นามสกุล</h1>
              <input onChange={(event) => setFullname(event.target.value)} type="text" value={fullname} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
              <h1 className="text-orange-400 font-medium mt-2"> โปรดระบุข้อมูลจริงตามบัตรประชาชน เนื่องจากมีผลต่อการสมัครงาน</h1>
            </div> */}

                <div className="flex flex-col">
                  <h1 className="m-3 text-xl font-medium">ชื่อเล่น</h1>
                  <input onChange={(event) => setNickname(event.target.value)} type="text" value={getnickname} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
                </div>

                <div className="flex flex-col">
                  <h1 className="m-3 text-xl font-medium">เพศ</h1>
                  <input onChange={(event) => setSex(event.target.value)} type="text" value={getsex} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
                </div>
                <div className="flex flex-col">
                  <h1 className="m-3 text-xl font-medium">วัน/เดือน/ปี เกิด</h1>
                  <input onChange={(event) => setBirthdate(event.target.value)} type="date" value={getbirthdate} className="bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
                  {/* <input onChange={(event) => setBirthdate(event.target.value)} type="text" value={birthdate} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="00/00/0000"></input> */}
                </div>
                <div className="flex flex-col">
                  <h1 className="m-3 text-xl font-medium">สัญชาติ</h1>
                  <input onChange={(event) => setNational(event.target.value)} type="text" value={getnational} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
                </div>
                {/* <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">พื้นที่สะดวกรับงาน</h1>
              <input onChange={(event) => setArea(event.target.value)} type="text" value={area} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="อำเภอเมือง จังหวัดขอนแก่น"></input>
            </div> */}
                <div className="flex flex-col">
                  <h1 className="m-3 text-xl font-medium">Email</h1>
                  <input disabled={true} type="text" value={email} class=" bg-slate-100 border-0  px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
                  {/* <input onChange={(event) => setEmail(event.target.value)} type="text" value={email} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input> */}
                </div>
                <div className="flex flex-col">
                  <h1 className="m-3 text-xl font-medium">เบอร์โทรศัพท์</h1>
                  <input onChange={(event) => setTelnumber(event.target.value)} type="text" value={gettelnumber} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
                </div>
              </div>
            </div>
          )}
          {/* Education */}
          {currentStage === "educationAndWork" && (
            <div className="mt-4 mb-20">
              <div className="mx-10">
                <div className="flex flex-col">
                  <h1 className="m-3 text-xl font-medium break-words">ประวัติการศึกษา (กำลังศึกษาอยู่/จบการศึกษา)</h1>
                  <input
                    onChange={(event) => setDegree(event.target.value)}
                    type="text"
                    value={getdegree}
                    className="h-[9.5rem] bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm md:text-xl shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="เช่น จบการศึกษามัธยมศึกษาปีที่6 ที่โรงเรียนชุมแพศึกษา
จบการศึกษาปริญญาตรีจากคณะวิทยาศาสตร์ สาขาฟิสิกส์ 
กำลังศึกษาปริญญาตรีคณะวิศวกรรมศาสตร์ มหาวิทยาลัยขอนแก่น เป็นต้น"
                  ></input>
                </div>
                {/* <div>
                  <h1 className="m-3 text-xl font-medium">หนังสือรับรองผลการศึกษา (ถ้ามี)</h1>
                  <input type="file" accept=".jpg, .jpeg, .png, .pdf"  onChange={handleFileChange}  className="w-[100%] md:w-full rounded-[10px] border-[1px] solid bg-cyan" />
                </div> */}
                <div className="flex flex-col ">
                  <h1 className="m-3 text-xl font-medium break-words  ">ประวัติการทำงาน/ฝึกงาน (อธิบายโดยละเอียด)</h1>
                  <input onChange={(event) => setWorkexp(event.target.value)} type="text" value={getworkexp} class=" h-[9.5rem] bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm md:text-xl shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 " placeholder="เช่น ปี 2020-2022 เป็นพนักงานทำความสะอาด ที่โรงพยาบาลขอนแก่น ได้รับหน้าที่ดูแลความสะอาดบริเวณตึกผู้ป่วย A B C เป็นต้น  หากไม่เคยมีประสบการณ์ทำงานให้กรอก ไม่มีประสบการณ์ทำงาน"></input>
                </div>
                {/* <div>
                  <h1 className="m-3 text-xl font-medium">หลักฐานการฝึกงาน/ทำงาน (ถ้ามี)</h1>
                  <input type="file" accept=".jpg, .jpeg, .png, .pdf" onChange={handleFileChange} className="w-[100%] md:w-full rounded-[10px] border-[1px] solid bg-cyan" />
                  {selectedFile && <p>Selected file: {selectedFile.name}</p>}
                </div> */}
              </div>
            </div>
          )}

          {currentStage === "abilities" && (
            <div className="mt-4 ">
              <div className="mx-10">
                <div className="flex flex-col">
                  <h1 className="m-3 text-xl font-medium">ความสามารถด้านภาษา</h1>
                  <div className="flex flex-col gap-5">
                    <div className="flex gap-5">
                      

                      {/* <input placeholder="กรอกชื่อภาษา" className="h-20 bg-slate-100 border-0 px-3 py-3 w-1/2 md:w-1/4  placeholder-orange-500  text-blueGray-600 rounded text-sm md:text-xl shadow focus:outline-none focus:ring  ease-linear transition-all duration-150"></input>
                      <div className="p-3 grid grid-cols-2 md:flex items-center justify-around gap-1 md:gap-5 w-1/2 md:w-3/4 bg-slate-100 rounded text-sm md:text-xl shadow focus:outline-none focus:ring  ease-linear transition-all duration-150">
                        <div>
                          <input id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                          <label for="checked-checkbox" class="ml-2 font-medium">
                            ฟัง
                          </label>
                        </div>
                        <div>
                          <input id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                          <label for="checked-checkbox" class="ml-2 font-medium">
                            พูด
                          </label>
                        </div>
                        <div>
                          <input id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                          <label for="checked-checkbox" class="ml-2 font-medium ">
                            อ่าน
                          </label>
                        </div>
                        <div>
                          <input id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                          <label for="checked-checkbox" class="ml-2 font-medium">
                            เขียน
                          </label>
                        </div>
                      </div> */}
                    </div>
                    <div className="flex gap-5">
                      <input placeholder="กรอกชื่อภาษา" className="h-20 bg-slate-100 border-0 px-3 py-3 w-1/2 md:w-1/4  placeholder-orange-500  text-blueGray-600 rounded text-sm md:text-xl shadow focus:outline-none focus:ring  ease-linear transition-all duration-150"></input>
                      {/* <span className="font-bold"> ภาษาอังกฤษ : {userData.englevel}</span> */}
                      <div className="p-3 grid grid-cols-2 md:flex items-center justify-around gap-1 md:gap-5 w-1/2 md:w-3/4 bg-slate-100 rounded text-sm md:text-xl shadow focus:outline-none focus:ring  ease-linear transition-all duration-150">
                        <div>
                          <input id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                          <label for="checked-checkbox" class="ml-2 font-medium">
                            ฟัง
                          </label>
                        </div>
                        <div>
                          <input id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                          <label for="checked-checkbox" class="ml-2 font-medium">
                            พูด
                          </label>
                        </div>
                        <div>
                          <input id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                          <label for="checked-checkbox" class="ml-2 font-medium ">
                            อ่าน
                          </label>
                        </div>
                        <div>
                          <input id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                          <label for="checked-checkbox" class="ml-2 font-medium">
                            เขียน
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-5">
                      <input placeholder="กรอกชื่อภาษา" className="h-20 bg-slate-100 border-0 px-3 py-3 w-1/2 md:w-1/4  placeholder-orange-500  text-blueGray-600 rounded text-sm md:text-xl shadow focus:outline-none focus:ring  ease-linear transition-all duration-150"></input>
                      {/* <span className="font-bold"> ภาษาอังกฤษ : {userData.englevel}</span> */}
                      <div className="p-3 grid grid-cols-2 md:flex items-center justify-around gap-1 md:gap-5 w-1/2 md:w-3/4 bg-slate-100 rounded text-sm md:text-xl shadow focus:outline-none focus:ring  ease-linear transition-all duration-150">
                        <div>
                          <input id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                          <label for="checked-checkbox" class="ml-2 font-medium">
                            ฟัง
                          </label>
                        </div>
                        <div>
                          <input id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                          <label for="checked-checkbox" class="ml-2 font-medium">
                            พูด
                          </label>
                        </div>
                        <div>
                          <input id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                          <label for="checked-checkbox" class="ml-2 font-medium ">
                            อ่าน
                          </label>
                        </div>
                        <div>
                          <input id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                          <label for="checked-checkbox" class="ml-2 font-medium">
                            เขียน
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-5">
                      <input placeholder="กรอกชื่อภาษา" className="h-20 bg-slate-100 border-0 px-3 py-3 w-1/2 md:w-1/4  placeholder-orange-500  text-blueGray-600 rounded text-sm md:text-xl shadow focus:outline-none focus:ring  ease-linear transition-all duration-150"></input>
                      {/* <span className="font-bold"> ภาษาอังกฤษ : {userData.englevel}</span> */}
                      <div className="p-3 grid grid-cols-2 md:flex items-center justify-around gap-1 md:gap-5 w-1/2 md:w-3/4 bg-slate-100 rounded text-sm md:text-xl shadow focus:outline-none focus:ring  ease-linear transition-all duration-150">
                        <div>
                          <input id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                          <label for="checked-checkbox" class="ml-2 font-medium">
                            ฟัง
                          </label>
                        </div>
                        <div>
                          <input id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                          <label for="checked-checkbox" class="ml-2 font-medium">
                            พูด
                          </label>
                        </div>
                        <div>
                          <input id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                          <label for="checked-checkbox" class="ml-2 font-medium ">
                            อ่าน
                          </label>
                        </div>
                        <div>
                          <input id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                          <label for="checked-checkbox" class="ml-2 font-medium">
                            เขียน
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <input onChange={(event) => setThailevel(event.target.value)} type="text" value={getthailevel} class="h-16 bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="เช่น ฟัง พูด อ่าน เขียน ได้"></input> */}
                </div>
                {/* <div className="flex flex-col">
                  <h1 className="m-3 text-xl font-medium">ความสามารถด้านภาษา (อังกฤษ)</h1>
                  <input onChange={(event) => setEnglevel(event.target.value)} type="text" value={getenglevel} class="h-16 bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="เช่น ฟัง พูด อ่าน เขียน ได้"></input>
                </div> */}
                <div className="flex flex-col ">
                  <div>
                    <h1 className="mx-3 mt-3 b text-xl font-medium">ความสามารถในการขับรถ</h1>
                    <h1 className="mx-3 text-lg mb-3 font-medium text-orange-500">คุณมีใบขับขี่ชนิดใดบ้าง ?</h1>
                  </div>
                  <div className="flex gap-5">
                    {/* <input placeholder="กรอกชื่อภาษา" className="h-20 bg-slate-100 border-0 px-3 py-3 w-1/2 md:w-1/4  placeholder-orange-500  text-blueGray-600 rounded text-sm md:text-xl shadow focus:outline-none focus:ring  ease-linear transition-all duration-150"></input> */}
                    {/* <span className="font-bold"> ภาษาอังกฤษ : {userData.englevel}</span> */}
                    <div className="p-3 grid grid-cols-2 md:flex items-center justify-around gap-1 md:gap-5 w-full bg-slate-100 rounded text-sm md:text-xl shadow focus:outline-none focus:ring  ease-linear transition-all duration-150">
                      <div>
                        <input id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="checked-checkbox" class="ml-2 font-medium">
                          ไม่มี
                        </label>
                      </div>
                      <div>
                        <input id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="checked-checkbox" class="ml-2 font-medium">
                          รถจักรยานยนต์
                        </label>
                      </div>
                      <div>
                        <input id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="checked-checkbox" class="ml-2 font-medium ">
                          รถยนต์สามล้อ
                        </label>
                      </div>
                      <div>
                        <input id="checked-checkbox" type="checkbox" value="" class="md:w-6 md:h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="checked-checkbox" class="ml-2 font-medium">
                          รถยนต์
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* <input onChange={(event) => setVehicle(event.target.value)} type="text" value={getvehicle} class=" h-16 bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="เช่น ไม่มีใบขับขี่ รถจักรยานยนต์ รถยนต์ รถบรรทุก"></input> */}
                </div>
                {/* <div className="flex flex-col ">
              <h1 className="m-3 text-xl font-medium">ความสามารถพิเศษ</h1>
              <input onChange={(event) => setTalent(event.target.value)} type="text" value={gettalent} class="  h-16 bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="เช่น คอมพิวเตอร์ ทำอาหาร ว่ายนํ้า เล่นดนตรี"></input>
            </div> */}
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
      )}
    </>
  );
};

export default Createprofile;
