'use client';

import React from 'react';
import styles from './Facilitators.module.scss';
import useFacilitators from '@/feature/facilitators/hooks/useFacilitators';
import Loader from '@/components/Loader/Loader';
import ErrorDialog from '@/components/ErrorDialog/ErrorDialog';
import SearchBox from '@/components/SearchBox/SearchBox';
import TeacherList from '@/feature/facilitators/components/TeacherList';
import Pagination from '@/components/Pagination/Pagination';

export default function Home() {
  const {
    paginatedData,
    loading,
    error,
    retry,
    sortKey,
    order,
    filterValue,
    currentPage,
    totalPages,
    totalCount,
    startItem,
    endItem,
    setSort,
    setFilter,
    setPage,
  } = useFacilitators();

  return (
    <div className={styles.page}>
      {loading && <Loader />}
      {error && (
        <ErrorDialog message="通信エラーが発生しました。" onRetry={retry} />
      )}
      {!loading && !error && (
        <>
          <SearchBox initialValue={filterValue} onSearch={setFilter} />
          <TeacherList
            teachers={paginatedData}
            sortKey={sortKey}
            order={order}
            onSortChange={setSort}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
            totalCount={totalCount}
            startItem={startItem}
            endItem={endItem}
          />
        </>
      )}
    </div>
  );
}
