import React from "react";
import Link from "next/link";
import styles from "./styles/SimplePaginator.module.css";

const SimplePaginator: React.FC<{
  page: number;
  limit: number;
  pageCount: number;
}> = ({ page, limit, pageCount }) => {
  const disablePrev = page === 1;
  const disableNext = page === pageCount;

  return (
    <div className={styles.navigationButtons}>
      <Link
        href={`articles?page=${page - 1}&limit=${limit}`}
        className={`
          ${styles.navBtn}
          ${disablePrev ? styles.disabled : ""}
        `}
        aria-disabled={disablePrev}
        tabIndex={disablePrev ? -1 : undefined}
      >
        Prev
      </Link>

      <Link
        href={`articles?page=${page + 1}&limit=${limit}`}
        className={`
          ${styles.navBtn} 
          ${disableNext ? styles.disabled : ""}
        `}
        aria-disabled={disableNext}
        tabIndex={disableNext ? -1 : undefined}
      >
        Next
      </Link>
    </div>
  );
};

export default SimplePaginator;
