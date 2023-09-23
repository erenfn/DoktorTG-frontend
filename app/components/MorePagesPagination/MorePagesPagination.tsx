import React from 'react';
import styles from './MorePagesPagination.module.scss';

interface MorePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MorePagination: React.FC<MorePaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleEllipsisClick = (offset: number) => {
    const newPage = currentPage + offset;
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];

    if (totalPages < 1) {
      return null;
    }

    const renderPage = (page: number) => (
      <button
        key={page}
        className={`${styles.paginationItem} ${currentPage === page ? styles.active : ''}`}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </button>
    );

    const renderSkip = (offset: number, className: string, content: string) => (
      <button
        key={`ellipsis${offset}`}
        className={`${styles.paginationItem} ${styles.skip} ${className}`}
        onClick={() => handleEllipsisClick(offset)}
      >
        <span>{content}</span>
      </button>
    );

    if (currentPage > 3){
      pageNumbers.push(renderPage(1));
    }

    if (currentPage > 4) {
      pageNumbers.push(renderSkip(-5, styles.skipBack, '...'));
    }


    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i >= 1 && i <= totalPages) {
        pageNumbers.push(renderPage(i));
      }
    }


    if (currentPage < totalPages - 3) {
      pageNumbers.push(renderSkip(5, styles.skipForward, '...'));
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push(renderPage(totalPages));
    }


    return <div className="page-numbers">{pageNumbers}</div>;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.paginationItem} ${currentPage === 1 ? styles.disabled : ''} ${styles.arrow}`}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        &lt;
      </button>
      {generatePageNumbers()}
      <button
        className={`${styles.paginationItem} ${currentPage === totalPages ? styles.disabled : ''} ${styles.arrow}`}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
};

export default MorePagination;