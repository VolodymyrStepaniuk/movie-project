import React from "react";

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}> = (props) => {
  const { currentPage, totalPages, paginate } = props;

  const getPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const renderPageNumbers = getPageNumbers().map((number) => (
    <li
      key={number}
      className={`page-item${currentPage === number ? " active" : ""}`}
    >
      <button className="page-link" onClick={() => paginate(number)}>
        {number}
      </button>
    </li>
  ));

  return (
    <nav>
      <ul className="pagination justify-content-center">{renderPageNumbers}</ul>
    </nav>
  );
};

export default Pagination;
