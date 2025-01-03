import Search from '@/components/ui/search';
import Table from '@/components/products/table';
import { CreateProductBtn } from '@/components/products/buttons';
import { Suspense } from 'react';

export const metadata = {  title: 'Products',};

export default async function ProductPage({ searchParams,}) {

  const params = await searchParams;
  const query = params.query || '';
  const page = params.page || 1;

  const currentPage = Number(page); 
  return (
    <div className="w-full">

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-2">
        <Search placeholder="Search for products..." />
        <CreateProductBtn />
      </div>
      <Suspense key={query + currentPage} >
        <Table query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}