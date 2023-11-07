import React, { useState } from "react";

const PaginatedPage = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const [currentIndex, setCurrentIndex] = useState(1);
  const newIndex = currentIndex === pageNumbers.length ? 1 : currentIndex + 1;

  const goToPrevious = (e) => {
    e.preventDefault();
    const previousIndex = currentIndex - 1;
    setCurrentIndex(previousIndex);
    onPageChange(previousIndex);
  };

  const goToNext = (e) => {
    e.preventDefault();
    setCurrentIndex(newIndex);
    onPageChange(newIndex);
  };

  // const handlePageChange = (page) => {
  //   if (currentIndex === 1) {
  //     return <button className={`p-3 rounded-lg ${currentIndex === stages.length - 1 && !isComplete ? "bg-gray-400" : isComplete ? "bg-[#F27F0C] text-white" : "bg-[#F5993D] text-white"}`} onClick={isComplete ? handleSubmit : undefined} disabled={!isComplete && currentIndex !== stages.length - 1}></button>;
  //   } else {
  //     return (
  //       <button className={`p-3 ml-2 rounded-lg ${currentIndex === stages.length - 1 ? "bg-gray-400" : "bg-[#F27F0C] text-white"}`} disabled={currentIndex === stages.length - 1} onClick={handleNextClick}>
  //         Next
  //       </button>
  //     );
  //   }
  // };

  console.log(pageNumbers.length);
  console.log(currentIndex);
  return (
    // <div className="flex">
    //   <span className="mx-auto font-semibold md:text-2xl">Page :</span>
    //   {pageNumbers.map((page) => (
    //     <button key={page} onClick={() => onPageChange(page)} className={`mx-2 font-semibold md:text-2xl ${currentPage === page && `text-red-600`}`}>
    //       {page}
    //     </button>
    //   ))}
    // </div>
    <div>
      {pageNumbers.length === 1 ? (
        <div className="w-16 h-16 rounded-full flex justify-center items-center bg-[#419DBB]">
          {pageNumbers.map((page) => (
            <button key={page} onClick={() => onPageChange(page)} className={`mx-2 font-semibold md:text-2xl ${currentPage === page && "text-white"}`}>
              {page}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex gap-5">
          <button onClick={goToPrevious} className="w-36 bg-[#419DBB] text-white rounded-full">
            <span className="text-2xl font-bold">ก่อนหน้า</span>
          </button>
          <div className="flex gap-4">
            {pageNumbers.map((page) => (
              <button key={page} onClick={() => onPageChange(page)} className={`w-16 h-16 rounded-full flex justify-center items-center bg-[#419DBB] ${currentIndex === page && "text-white"}`}>
                {page}
              </button>
            ))}
          </div>
          <button onClick={goToNext} className="w-36 bg-[#419DBB] text-white rounded-full">
            <span className="text-2xl font-bold">ถัดไป</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PaginatedPage;
