import React from "react";

const Pagination = ({ pagination, setPagination, totalItems }) => {
  const totalPages = Math.ceil(totalItems / pagination.limit);

  const handlePrev = () => {
    if (pagination.page > 1) {
      setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const handleNext = () => {
    if (pagination.page < totalPages) {
      setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={handlePrev}
        disabled={pagination.page === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span>
        Page {pagination.page} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={pagination.page === totalPages}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
