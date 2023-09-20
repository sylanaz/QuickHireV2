import React, { useState } from "react";
import Mymodal from "../Mailbox/modal";

const DescBTN = ({ text, userData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log(userData !== undefined);
  return (
    <div className="flex my-2 w-full justify-center">
      <div className="flex justify-center items-center py-[0.35rem] underline underline-offset-1 decoration-2 text-sm font-bold w-full rounded-xl bg-[#F0E9D5] text-[#F27F0C] md:text-2xl md:w-11/12">
        <span className="cursor-pointer" onClick={openModal}>{text}</span>
        {userData !== undefined && <Mymodal isOpen={isModalOpen} onClose={closeModal} userData={userData} />}
      {/* <Mymodal isOpen={isModalOpen} onClose={closeModal} userData={userData} /> */}
      </div>
    </div>
  );
};

export default DescBTN;
