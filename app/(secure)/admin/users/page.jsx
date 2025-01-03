import Search from '@/components/ui/search';
import Table from '@/components/users/table';
import { CreateUserBtn } from '@/components/users/buttons';
import Pagination from '@/components/ui/pagination';
import { fetchUserPages } from '@/actions/user-actions';
import { Suspense } from 'react';

export const metadata = {  title: 'Users',};

export default async function UserPage({ searchParams,}) {
  const params = await searchParams;
  const query = params.query || '';
  const page = params.page || 1;

  const currentPage = Number(page);
  const totalPages = await fetchUserPages(query);

  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-2">
        <Search placeholder="Search users..."/>
        <CreateUserBtn />
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