import React from "react";

const PaginatedPage = ({ totalPages, currentPage, onPageChange }) => {

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex">
      <span className="mr-1">Page:</span>
      {pageNumbers.map((page) => (
        <button key={page} onClick={() => onPageChange(page)} className="mx-1">
          {page}
        </button>
      ))}
    </div>
  );
};

export default PaginatedPage;
