import Search from '@/components/ui/search';
import Table from '@/components/status/table';
import { CreateStatusBtn } from '@/components/status/buttons';
import { fetchStatusPages } from '@/actions/status-actions';
import { Suspense } from 'react';

export const metadata = {  title: 'Status',};

export default async function StatusPage({ searchParams,}) {
  const params = await searchParams;
  const query = params.query || '';
  const page = params.page || 1;

  const currentPage = Number(page);
  const totalPages = await fetchStatusPages(query);

 
  return (
    <div className="w-full">

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-2">
        <Search placeholder="Search for status..." />
        <CreateStatusBtn />
      </div>
      <Suspense key={query + currentPage} >
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      { page === 1 ? "" : 
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} /> 
      </div>
      }
    </div>

  );
}