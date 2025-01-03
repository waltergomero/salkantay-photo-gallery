
import { UpdateProductBtn, DeleteProductBtn, AddImageToProductBtn } from '@/components/products/buttons';
import { fetchFilteredProducts } from '@/actions/product-actions';
import { Fragment } from 'react';


export default async function StatusTable({ query, currentPage }) {
  const product = await fetchFilteredProducts(query, currentPage);

  return (
    <Fragment>
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mt-2">
    <div className="px-4 py-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Products
        </h4>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className=" min-w-full table-auto md:table">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="px-4 py-4 font-medium text-black dark:text-white xl:pl-8">
                Product name
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Slug (code name)
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Category
              </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Cost
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Price
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  In stock
                </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Is active
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
          {product && product?.map((product) => (
              <tr key={product._id.toString()}>
                <td className="border-b border-[#eee] px-4 py-4 pl-9 dark:border-strokedark xl:pl-8">
                  <h5 className="font-medium text-black dark:text-white">
                    {product.product_name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {product.slug}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                 <p className="text-black dark:text-white">
                    {product.category_name}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {product.cost}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4  dark:border-strokedark">
                <p className="text-black dark:text-white">
                    {product.price}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {product.number_instock}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                  {product.isactive ? 'Yes' : 'No'}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <UpdateProductBtn id={product._id.toString()}/>
                    <DeleteProductBtn id={product._id.toString()}/>
                    <AddImageToProductBtn id={product._id.toString()}/>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </Fragment>
  );
}