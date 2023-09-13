import React from "react";
import map from "../img/map.png";
import money from "../img/money.png";
import job from "../img/user.png";

import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker, Popup } from 'react-leaflet'
import L from "leaflet"; // Import Leaflet library for creating custom icon
import customMarkerIcon from "../img/pin.png";


function Card({ restaurantName, minilocation, position, hourlyIncome,img,lat,long,peopleneed,jobdesc,timework,welfare,location,email}) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className="max-w-xs mx-auto" >
      <div className="flex flex-col shadow-xl relative group  rounded-b-xl" onClick={() => setShowModal(true)}>
        <div className="image-container ">
          <img
            src={img}
            alt="Restaurant"
            className="w-full h-[200px] md:h-[300px] transition-opacity duration-300 ease-in-out rounded-t-xl "
          />
          <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-in-out rounded-b-xl rounded-t-xl"></div>
        </div>
        <div className="p-4 bg-white rounded-b-xl text-xs md:text-base">
          <h2 className="text-lg font-bold mb-2 md:text-xl">{restaurantName}</h2>
          <div className="flex items-center py-1">
            <img src={map} alt="Location" className="w-6 h-6 mr-4" />
            <p className="text-gray-600">{minilocation}</p>
          </div>
          <div className="flex items-center py-1 ">
            <img src={job} alt="Position" className="w-6 h-6 mr-4" />
            <p className="text-gray-600">{position}</p>
          </div>
          <div className="flex items-center pt-1">
            <img src={money} alt="Hourly Income" className="w-6 h-6 mr-4" />
            <p className="text-gray-600">{hourlyIncome} ฿ / ชั่วโมง</p>
          </div>
        </div>
      </div>

      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-10 max-w-[1400px]">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {restaurantName}
                  </h3>
                  <button
                    className=" ml-auto bg-transparent border-0 text-black opacity-90  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-90 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                
                {/*body*/}
                <div className="grid grid-cols-1 xl:grid-cols-2 m-10">
                <img
                  src={img}
                  alt="Restaurant"
                  className=" h-[200px] md:h-[300px] transition-opacity duration-300 ease-in-out rounded-xl mx-auto"
                />
                {/* Add leaflet tailwind here */}
                <MapContainer center={[lat, long]} zoom={14} scrollWheelZoom={false} style={{ width: '500px' }} className='rounded-xl '>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[lat, long]} icon={L.icon({ iconUrl: customMarkerIcon,iconSize: [30, 30] })}>
                    <Popup>
                      {restaurantName}
                    </Popup>
                  </Marker>
                </MapContainer> 
                </div>

                
                  <div className="flex flex-col mx-20 text-lg gap-2">
                    <div className="flex">
                      <h1 className=" whitespace-nowrap  "> รายละเอียดงาน</h1>
                      <span role="img" aria-label="sheep" className="mr-2">💼:</span>
                      <h1 className="">{jobdesc}</h1>
                    </div>

                    <div className="flex">
                      <h1 className=" whitespace-nowrap  "> เวลาทำงาน</h1>
                      <span role="img" aria-label="sheep" className="mr-2">🕜:</span>
                      <h1 className="">{timework}</h1>
                    </div>

                    <div className="flex">
                      <h1 className=" whitespace-nowrap  "> สวัสดิการ</h1>
                      <span role="img" aria-label="sheep" className="mr-2">💼:</span>
                      <h1 className="">{welfare}</h1>
                    </div>

                    <div className="flex">
                      <h1 className=" whitespace-nowrap  "> จำนวนเงิน</h1>
                      <span role="img" aria-label="sheep" className="mr-2">💵:</span>
                      <h1 className="">{hourlyIncome} บาท / ชั่วโมง</h1>

                      <h1 className=" whitespace-nowrap ml-3"> จำนวนคน</h1>
                      <span role="img" aria-label="sheep" className="mr-2">👨‍🦱:</span>
                      <h1 className="">{peopleneed}</h1>
                    </div>

                    <div className="flex">
                      <h1 className=" whitespace-nowrap  "> สถานที่</h1>
                      <span role="img" aria-label="sheep" className="mr-2">📍:</span>
                      <h1 className="">{location}</h1>
                    </div>

                    <div className="flex items-center justify-between pb-10">
                      <div className="flex">
                          <h1 className=" whitespace-nowrap  "> สอบถามเพิ่มเติม</h1>
                          <span role="img" aria-label="sheep" className="mr-2">📧:</span>
                          <h1 className="">{email}</h1>
                      </div>
                      <div>
                      <button
                          className="text-red-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          ปิดหน้าต่าง
                        </button>
                        <button
                          className="bg-orange-400 text-white active:bg-orange-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          สมัครงานด่วน
                        </button>
                      </div>
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
