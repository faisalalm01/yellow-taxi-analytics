/* eslint-disable react/prop-types */

const Pagination = ({ pagination, setPagination, totalItems }) => {
  const { page, limit } = pagination;
  const totalPages = Math.ceil(totalItems / limit);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        className="px-4 py-2 border border-gray-300 rounded-l disabled:opacity-50"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>
      <span className="px-4 py-2 border-t border-b border-gray-300">
        Page {page} of {totalPages}
      </span>
      <button
        className="px-4 py-2 border border-gray-300 rounded-r disabled:opacity-50"
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
