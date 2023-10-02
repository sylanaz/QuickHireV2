import React from "react";
import { Link } from "react-router-dom";
import add from "../../img/add.png";

const CardAddJob = () => {

  return (
    //   <div className="flex flex-col border-8 justify-center items-center w-10/12 h-60 mx-3 rounded-lg  md:h-[500px] md:w-[350px]">
    <Link to="/Create" className="flex flex-col border-4 border-[#6C8C9C] bg-[#C7EFF6] justify-center items-center w-44 h-60 xl:w-80 xl:h-[23rem] md:max-h-[40rem] rounded-[20px] md:rounded-[40px] cursor-pointer">
      {/* <div className=""> */}
      <img src={add} className="flex w-3/12 mb-2" />
      <img src="https://cdn-icons-png.flaticon.com/512/273/273177.png" className="flex w-8/12" />
      {/* </div> */}
    </Link>
    //   </div>
  );
};

export default CardAddJob;