import React from "react";
import styles from "./Pagination.module.scss";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalCount: number;
  startItem: number;
  endItem: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalCount,
  startItem,
  endItem,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleClick = (page: number) => {
    if (page !== currentPage) onPageChange(page);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.infoText}
      >{`${totalCount}件中 ${startItem}〜${endItem}件を表示`}</div>
      <div className={styles.pagination}>
        <button
          className={styles.arrowButton}
          disabled={currentPage === 1}
          onClick={() => handleClick(currentPage - 1)}
        >
          <ChevronLeft size={16} />
        </button>
        {pages.map((page) => (
          <button
            key={page}
            className={
              page === currentPage
                ? `${styles.pageButton} ${styles.pageButtonActive}`
                : styles.pageButton
            }
            onClick={() => handleClick(page)}
          >
            {page}
          </button>
        ))}
        <button
          className={styles.arrowButton}
          disabled={currentPage === totalPages}
          onClick={() => handleClick(currentPage + 1)}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
