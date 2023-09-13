import React, { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import camera from "../img/camera.png";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const Createprofile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [Imageblob,setImageblob] = useState(null)
  const [stage, setStage] = useState(1);
  const [crop, setCrop] = useState({ aspect: 1 / 1 }); // Set the aspect ratio here
  const [showModal, setShowModal] = React.useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
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
  
    // Only proceed with the upload if an image is selected
    if (Imageblob instanceof Blob) {
      const formData = new FormData();
      formData.append('file', Imageblob);
      formData.append('firstname', firstname);
      formData.append('lastname', lastname);
      formData.append('nickname', nickname);
      formData.append('sex', sex);
      formData.append('telnumber', telnumber);
      formData.append('birthdate', birthdate);
      formData.append('national', national);
      formData.append('area', area);
      formData.append('degree', degree);
      formData.append('workexp', workexp);
      formData.append('thailevel', thailevel);
      formData.append('englevel', englevel);
      formData.append('vehicle', vehicle);
      formData.append('talent', talent);
      formData.append('email', email);
  
      axios
        .post('http://localhost:3001/uploadUserinfo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          // Handle the API response as needed
          console.log(response.data);
          localStorage.setItem("newuser","old")
          window.location.replace("/Profile");
          
        })
        .catch((error) => {
          // Handle errors
          console.error('Error uploading image:', error);
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
      <h1 className="flex justify-center text-2xl ">กรอกข้อมูลสำหรับผู้สมัครงาน</h1>
      <div className="flex justify-center gap-5 text-white mt-10 mx-10">
        <div className="relative cursor-pointer" onClick={() => setStage(1)}>
          <h1 className="bg-cyan-700 p-4 rounded-lg">ข้อมูลส่วนบุคคล</h1>
          <h1 className="text-xl font-bold absolute bg-orange-400 px-4 py-1 rounded-full -top-5 left-1/2 -translate-x-1/2">1</h1>
        </div>
        <div className="relative cursor-pointer" onClick={() => setStage(2)}>
          <h1 className="bg-cyan-700 p-4 rounded-lg">ประวัติการศึกษา และ ประวัติการทำงาน/ฝึกงาน</h1>
          <h1 className="text-xl font-bold absolute bg-orange-400 px-4 py-1 rounded-full -top-5 left-1/2 -translate-x-1/2">2</h1>
        </div>
        <div className="relative cursor-pointer" onClick={() => setStage(3)}>
          <h1 className="bg-cyan-700 p-4 rounded-lg">ความสามารถ</h1>
          <h1 className="text-xl font-bold absolute bg-orange-400 px-4 py-1 rounded-full -top-5 left-1/2 -translate-x-1/2">3</h1>
        </div>
      </div>

      {stage === 1 && (
        <div>
          <div className="flex justify-center  mt-10 ">
            <div className="flex justify-center ">
              <form>
                <div className="flex flex-col justify-center">
                  <label htmlFor="imageInput">
                    {selectedImage ? (
                      <img src={selectedImage} alt="Preview" className="max-w-[200px] max-h-[200px] rounded-full mx-auto cursor-pointer" />
                    ) : (
                      <div className="w-[200px] h-[200px] border-dashed border-4 border-sky-500 rounded-xl mx-auto cursor-pointer">
                        <img className="w-20 hover:rotate-12 hover:scale-125 duration-300 mx-auto mt-14 flex " src={camera} alt="camera" />
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
                    <button type="button" onClick={handleImageCrop} className="flex mx-auto text-xl font-medium border-2 border-black rounded-lg p-3 my-3">ตัดรูป</button>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}

          <div className="mx-10">
            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">ชื่อจริง</h1>
              <input onChange={(event) => setFirstname(event.target.value)} type="text"  value={firstname} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
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
              <input onChange={(event) => setBirthdate(event.target.value)} type="text" value={birthdate} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="00/00/0000"></input>
            </div>
            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">สัญชาติ</h1>
              <input onChange={(event) => setNational(event.target.value)} type="text" value={national} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
            </div>
            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">พื้นที่สะดวกรับงาน</h1>
              <input onChange={(event) => setArea(event.target.value)} type="text" value={area} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="อำเภอเมือง จังหวัดขอนแก่น"></input>
            </div>
            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">Email</h1>
              <input onChange={(event) => setEmail(event.target.value)} type="text" value={email} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
            </div>
            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">เบอร์โทรศัพท์</h1>
              <input onChange={(event) => setTelnumber(event.target.value)} type="text" value={telnumber} class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
            </div>
            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">รหัสอ้างอิง (ถ้ามี)</h1>
              <input type="text" class=" bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
            </div>
          </div>
        </div>
      )}
      {/* end of stage1 */}

      {stage === 2 && (
        <div className="mt-4 ">
          <div className="mx-10">
            <div className="flex flex-col">
              <h1 className="m-3 text-xl font-medium">ประวัติการศึกษา (กำลังศึกษาอยู่/จบการศึกษา)</h1>
              <input
                onChange={(event) => setDegree(event.target.value)}
                type="text"
                value={degree}
                class="h-16 bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="เช่น จบการศึกษามัธยมศึกษาปีที่6 ที่โรงเรียนชุมแพศึกษา
จบการศึกษาปริญญาตรีจากคณะวิทยาศาสตร์ สาขาฟิสิกส์ มหาวิทยาลัยขอนแก่น
กำลังศึกษาปริญญาตรีคณะวิศวกรรมศาสตร์ มหาวิทยาลัยขอนแก่น เป็นต้น"
              ></input>
            </div>
            <div className="flex flex-col ">
              <h1 className="m-3 text-xl font-medium">ประวัติการทำงาน/ฝึกงาน (อธิบายโดยละเอียด)</h1>
              <input onChange={(event) => setWorkexp(event.target.value)} type="text" value={workexp} class=" mb-20 h-16 bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="เช่น ปี 2020-2022 เป็นพนักงานทำความสะอาด ที่โรงพยาบาลขอนแก่น ได้รับหน้าที่ดูแลความสะอาดบริเวณตึกผู้ป่วย A B C เป็นต้น  หากไม่เคยมีประสบการณ์ทำงานให้กรอก ไม่มีประสบการณ์ทำงาน"></input>
            </div>
          </div>
        </div>
      )}

      {stage === 3 && (
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
            <div className="flex flex-col ">
              <h1 className="m-3 text-xl font-medium">ความสามารถพิเศษ</h1>
              <input onChange={(event) => setTalent(event.target.value)} type="text" value={talent} class="  h-16 bg-slate-100 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="เช่น คอมพิวเตอร์ ทำอาหาร ว่ายนํ้า เล่นดนตรี"></input>
            </div>
            <div className="flex mx-auto mt-10">
              <button className="flex mx-auto text-xl font-medium border-2 border-black rounded-lg p-3" onClick={handleSubmit}>ยืนยันข้อมูล</button>
            </div>
          </div>
        </div>
      )}

      <Footer></Footer>
    </div>
  );
};

export default Createprofile;
