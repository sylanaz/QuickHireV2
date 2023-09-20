import React, { useState } from "react";
import date from "../../data/date";
import DescBTN from "../BTN/DescBTN";
import AccAndDenie from "../BTN/AccAndDenie";
import Mymodal from "./modal";

const CardApproveUser = ({ userData, date_month_year, hour_minute }) => {
  // const [userData, setUserData] = useState([]);
  // const getUserInfo = async () => {
  //   const data = await axios.get(`http://localhost:3001/getUserinfo/${email}`);
  //   setUserData(data.data);
  // };

  // useEffect(() => {
  //   getUserInfo();
  // }, []);
  const birthDate = new Date(userData.birthdate);
  const birthYear = birthDate.getFullYear();
  const currentYear = date.getFullYear();
  const age = currentYear - birthYear;

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };
  const bool = [false, true];

  return (
    // <div className="flex flex-col max-w-xs max-h-[19rem] md:max-h-[40rem] mx-3 my-3 md:my-5 border-4 border-[#6C8C9C] rounded-[20px] bg-[#C7EFF6] cursor-pointer">
    <>
      <div className="flex flex-col">
        <div className="w-[10.5rem] md:w-[20rem] max-h-[19rem] md:max-h-[40rem] mx-auto md:my-1 border-4 border-[#6C8C9C] rounded-[20px] md:rounded-[40px] bg-[#C7EFF6]">
          {/* <span onClick={openModal}> */}
            {/* <div className="flex items-center"> */}
            {userData !== undefined && userData.img !== undefined && (
              <>
                <div className="flex justify-center rounded-t-[20px]">
                  <img src={JSON.parse(userData.img)[0]} className="rounded-full w-[75px] h-[75px] mt-2 md:w-[130px] md:h-[130px] transition-opacity duration-300 ease-in-out" />
                </div>
                <div className="flex justify-center">{userData.nickname}</div>
                <div className="flex justify-center">{userData.fullname}</div>
                <div className="flex justify-center">
                  <p>
                    {userData.brithdate} อายุ {age} ปี
                  </p>
                </div>
                <div className="flex justify-center">
                  <p>
                    เพศ {userData.sex} สัญชาติ {userData.national}
                  </p>
                </div>
                <div className="flex mx-2">
                  <DescBTN text="ดูโปรไฟล์เพิ่มเติม" userData={userData} />
                </div>
                <div className="flex flex-row justify-center rounded-b-[20px] mx-2">
                  {bool.map((data) => {
                    return <AccAndDenie acc_denie={data} />;
                  })}
                  {/* <AccAndDenie acc_denie={false} />
                  <AccAndDenie acc_denie={true} /> */}
                </div>
              </>
            )}
          {/* </span>
          <Mymodal isOpen={isModalOpen} onClose={closeModal} userData={userData} /> */}
        </div>
        <div className="flex justify-center">
            {date_month_year}
            {"  "}
            {hour_minute}
          </div>
      </div>
    </>
  );
};

export default CardApproveUser;
