import { Facilitator } from '@/types/facilitator';

export interface FetchFacilitatorsParams {
  page: number;
  limit: number;
  sort: string;
  order: string;
  filterValue?: string;
}

export async function fetchFacilitators(
  { page, limit, sort, order, filterValue }: FetchFacilitatorsParams
): Promise<{ data: Facilitator[]; totalCount: number }> {
  const params = new URLSearchParams();
  params.append('_page', String(page));
  params.append('_limit', String(limit));
  params.append('_sort', sort);
  params.append('_order', order);
  if (filterValue) {
    params.append('name_like', filterValue);
  }
  const url = `${process.env.NEXT_PUBLIC_API_URL}/mock/facilitators?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('APIエラー');
  }
  const data: Facilitator[] = await res.json();
  const totalCountHeader = res.headers.get('X-Total-Count');
  const totalCount = totalCountHeader ? parseInt(totalCountHeader) : data.length;
  return { data, totalCount };
} 