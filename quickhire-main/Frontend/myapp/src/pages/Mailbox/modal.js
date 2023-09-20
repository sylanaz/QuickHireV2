import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import SwapImage from "../Shop/SwapImage";

Modal.setAppElement("#root"); // Set the root element for accessibility

const Mymodal = ({ isOpen, onClose, userData }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Example Modal" shouldCloseOnOverlayClick={false} className="backdrop">
      <div className="container w-5/6 h-5/6 md:h-2/3 rounded-md bg-white flex flex-col justify-between">
        <div className="flex flex-col p-5">
          {userData.img !== undefined && <SwapImage images={JSON.parse(userData.img)} />}
          <h2>{userData.fullname}</h2>
          <p>{userData.email}</p>
        </div>
        <div className="flex flex-col">
          <button type="button" onClick={onClose} class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-b-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
            CLOSE
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Mymodal;
