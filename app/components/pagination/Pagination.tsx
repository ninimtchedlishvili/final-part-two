import React from "react";

const Pagination = ({
  onPageChange,
  currentPage,
  totalPages,
}: {
  onPageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
}) => {
  const canGoPreviousPage = currentPage > 1;
  const canGoNextPage = currentPage < totalPages;


  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  // Dynamically generate pages to show
  const pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1).slice(
    Math.max(0, currentPage - 3),
    Math.min(totalPages, currentPage + 2)
  );

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-base h-10">
        <li>
          <button
            onClick={() =>
              canGoPreviousPage && handlePageClick(currentPage - 1)
            }
            disabled={!canGoPreviousPage}
            className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg ${
              !canGoPreviousPage
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-100 hover:text-gray-700"
            } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            Previous
          </button>
        </li>
        <li>
          <button
            onClick={() => handlePageClick(1)}
            disabled={!canGoPreviousPage}
            className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg ${
              !canGoPreviousPage
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-100 hover:text-gray-700"
            } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            {"<<"}
          </button>
        </li>
        {pagesToShow.map((page) => (
          <li key={page}>
            <button
              onClick={() => handlePageClick(page)}
              className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                currentPage === page
                  ? "bg-gray-100 text-gray-700 font-bold"
                  : ""
              } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
              {page}
            </button>
          </li>
        ))}
<li>
          <button
            onClick={() => handlePageClick(totalPages)}
            className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
              !canGoNextPage
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-100 hover:text-gray-700"
            } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            {">>"}
          </button>
        </li>
        <li>
          <button
            onClick={() => canGoNextPage && handlePageClick(currentPage + 1)}
            className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-e-lg ${
              !canGoNextPage
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-100 hover:text-gray-700"
            } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
