import React from "react";
import Modal from "react-modal";
import SwapImage from "../Shop/SwapImage";
import CryptoJS from "crypto-js";

Modal.setAppElement("#root"); // Set the root element for accessibility

const Mymodal = ({ isOpen, onClose, userData }) => {
  console.log(userData);
  const deCryptData = (data) => {
    return CryptoJS.AES.decrypt(data, process.env.REACT_APP_ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
  };

  const birthYear = userData ? new Date(deCryptData(userData.birthdate)).getFullYear() : 0;
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Example Modal" shouldCloseOnOverlayClick={false} className="flex items-center justify-center h-screen rounded-md ">
      <div className="flex flex-col bg-gray-100  rounded-2xl shadow-lg max-w-3xl">
        <div className="flex  p-5 items-center mb-8">
          {/* profile */}
          <div className="px-8 md:px-16">
            {userData.img !== undefined && <SwapImage images={JSON.parse(userData.img)} />}
            <div className="flex justify-center text-lg font-bold mb-3">{deCryptData(userData.fullname)}</div>
            <div className="grid grid-cols-2 gap-6">
              <div>ชื่อเล่น : {deCryptData(userData.nickname)}</div>
              <div>เพศ : {deCryptData(userData.sex)}</div>
            </div>
            <div>Email : {userData.email}</div>
            <div>เบอร์โทรศัพท์ : {deCryptData(userData.telnumber)}</div>
            <div>วันเกิด : {deCryptData(userData.birthdate)}</div>
            <div>สัญชาติ : {deCryptData(userData.national)}</div>
            <div>การศึกษา : {deCryptData(userData.degree)}</div>
            <div>ประสบการณ์ทำงาน : {deCryptData(userData.workexp)}</div>
          </div>
        </div>
        <div className="flex hover:scale-105 duration-300 justify-center items-center">
          <button type="button" onClick={onClose} class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold w-full text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
            CLOSE
          </button>
        </div>
      </div>
      {/* <div className="container w-5/6 rounded-md bg-white flex flex-col justify-center m-auto shadow-lg">
        <div className="flex flex-col p-5">
          {userData.img !== undefined && <SwapImage images={JSON.parse(userData.img)} />}
          <div className="flex justify-center text-lg font-bold mb-3">{deCryptData(userData.fullname)}</div>
          <div className="grid grid-cols-2 gap-6">
            <div>ชื่อเล่น : {deCryptData(userData.nickname)}</div>
            <div>เพศ : {deCryptData(userData.sex)}</div>
          </div>
          <div>Email : {userData.email}</div>
          <div>เบอร์โทรศัพท์ : {deCryptData(userData.telnumber)}</div>
          <div>วันเกิด : {deCryptData(userData.birthdate)}</div>
          <div>สัญชาติ : {deCryptData(userData.national)}</div>
          <div>การศึกษา : {deCryptData(userData.degree)}</div>
          <div>ประสบการณ์ทำงาน : {deCryptData(userData.workexp)}</div>
        </div>
        <div className="flex flex-col">
          <button type="button" onClick={onClose} class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-b-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
            CLOSE
          </button>
        </div>
      </div> */}
    </Modal>
  );
};

export default Mymodal;
