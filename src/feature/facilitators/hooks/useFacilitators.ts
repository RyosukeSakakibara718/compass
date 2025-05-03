import { useState, useEffect, useCallback } from 'react';
import {
  fetchFacilitators,
  FetchFacilitatorsParams,
} from '../api/facilitators';
import { Facilitator } from '@/types/facilitator';

type SortKey = 'name' | 'loginId';
type Order = 'asc' | 'desc';

type UseFacilitatorsResult = {
  paginatedData: Facilitator[];
  loading: boolean;
  error: Error | null;
  retry: () => void;
  sortKey: SortKey;
  order: Order;
  filterValue: string;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  startItem: number;
  endItem: number;
  setSort: (key: SortKey, order: Order) => void;
  setFilter: (value: string) => void;
  setPage: (page: number) => void;
};

const ITEMS_PER_PAGE = 20;

export default function useFacilitators(): UseFacilitatorsResult {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [order, setOrder] = useState<Order>('asc');
  const [filterValue, setFilterValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<Facilitator[]>([]);
  const [totalCountState, setTotalCountState] = useState<number>(0);
  const [totalPagesState, setTotalPagesState] = useState<number>(1);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: FetchFacilitatorsParams = {
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        sort: sortKey,
        order,
        filterValue: filterValue || undefined,
      };
      const { data: pageData, totalCount } = await fetchFacilitators(params);
      setData(pageData);
      setTotalCountState(totalCount);
      setTotalPagesState(Math.ceil(totalCount / ITEMS_PER_PAGE) || 1);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error('APIエラー'));
      }
    } finally {
      setLoading(false);
    }
  }, [currentPage, sortKey, order, filterValue]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const retry = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const setSort = useCallback((key: SortKey, ord: Order) => {
    setSortKey(key);
    setOrder(ord);
    setCurrentPage(1);
  }, []);

  const setFilter = useCallback((value: string) => {
    setFilterValue(value);
    setCurrentPage(1);
  }, []);

  const paginatedData = data;
  const totalCount = totalCountState;
  const totalPages = totalPagesState;
  const startItem =
    totalCount === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = (currentPage - 1) * ITEMS_PER_PAGE + paginatedData.length;

  return {
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
    setPage: setCurrentPage,
  };
}
