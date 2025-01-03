import Search from '@/components/ui/search';
import Table from '@/components/categories/table';
import { CreateCategoryBtn } from '@/components/categories/buttons';
import { Suspense } from 'react';

export const metadata = {  title: 'Categories',};

export default async function CategoryPage({ searchParams,}) {
  const params = await searchParams;
  const query = params.query || '';
  const page = params.page || 1;

  const currentPage = Number(page);
 // const query = searchParams?.query || '';
  //const currentPage = Number(searchParams?.page) || 1;
 
  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-2">
        <Search placeholder="Search for categories..." />
        <CreateCategoryBtn />
      </div>
      <Suspense key={query + currentPage} >
        <Table query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}