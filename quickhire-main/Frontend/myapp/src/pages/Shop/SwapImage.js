import React, { useState } from "react";

const SwapImage = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = (e) => {
    e.preventDefault();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = (e) => {
    e.preventDefault();
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
      <div className="flex flex-row justify-center">
        <button onClick={goToPrevious} className="my-auto w-[2rem] bg-[#EF4444] text-white rounded">
          <span className="text-2xl font-bold p-auto pb-10">&#171;</span>
        </button>
        <div className="flex flex-col">
        <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className="w-[125px] h-[125px] md:max-w-[500px] md:max-h-[500px] rounded mx-auto cursor-pointer" />
        <p className="text-center">{currentIndex + 1} / {images.length}</p>
        </div>
        <button onClick={goToNext} className="my-auto w-[2rem] bg-[#EF4444] text-white rounded">
          <span className="text-2xl font-bold p-auto pb-10">&#187;</span>
        </button>
      </div>
  );
};

export default SwapImage;