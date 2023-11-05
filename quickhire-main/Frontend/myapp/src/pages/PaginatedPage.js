import React from "react";

const PaginatedPage = ({ totalPages, currentPage, onPageChange }) => {

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex">
      <span className="mx-auto font-semibold md:text-2xl">Page :</span>
      {pageNumbers.map((page) => (
        <button key={page} onClick={() => onPageChange(page)} className={`mx-2 font-semibold md:text-2xl ${currentPage == page && `text-red-600`}`}>
          {page}
        </button>
      ))}
    </div>
  );
};

export default PaginatedPage;
