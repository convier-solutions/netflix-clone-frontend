import React, { useState } from 'react';
import './Pagination.css';

const Pagination = ({ totalItems, itemsPerPage = 10, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const generatePageNumbers = () => {
    const pages = [];

    // Show all page numbers if total pages are 10 or less
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Always show first three pages
    pages.push(1, 2, 3);

    // Show ellipsis if current page is greater than 4
    if (currentPage > 4) {
      pages.push('...');
    }

    // Show current page and its neighbors, ensuring a maximum of 3 pages shown on either side
    const startPage = Math.max(4, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Show ellipsis if current page is less than total pages minus 3
    if (currentPage < totalPages - 3) {
      pages.push('...');
    }

    // Always show last three pages, ensuring no duplicates
    const lastPages = [totalPages - 2, totalPages - 1, totalPages];
    lastPages.forEach((page) => {
      if (!pages.includes(page)) {
        pages.push(page);
      }
    });

    return pages;
  };

  return (
    <div className="pagination-container">
      <div className="pagination-left">
        <button className="pagination-button prev-next" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          Prev
        </button>
      </div>

      <div className="pagination-center">
        {generatePageNumbers().map((page, index) => (
          <button
            key={index}
            className={`pagination-button ${page === currentPage ? 'active' : ''}`}
            onClick={() => typeof page === 'number' && handlePageChange(page)}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}
      </div>

      <div className="pagination-right">
        <button className="pagination-button prev-next" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
