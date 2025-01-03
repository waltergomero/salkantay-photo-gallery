import { UpdateStatusBtn, DeleteStatusBtn } from '@/components/status/buttons';
import { fetchFilteredStatus } from '@/actions/status-actions';
import { Fragment } from 'react';


export default async function StatusTable({ query, currentPage }) {
    const status = await fetchFilteredStatus(query, currentPage);

  return (
    <Fragment>
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mt-2">
    <div className="px-4 py-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Status
        </h4>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className=" min-w-full table-auto md:table">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className=" px-4 py-4 font-medium text-black dark:text-white xl:pl-8">
                Status name
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Status type id
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
          {status && status?.map((status) => (
              <tr key={status._id.toString()}>
                <td className="border-b border-[#eee] px-4 py-4 pl-9 dark:border-strokedark xl:pl-8">
                  <h5 className="font-medium text-black dark:text-white">
                    {status.status_name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {status.status_type_id}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                  {status.isactive ? 'Yes' : 'No'}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <UpdateStatusBtn id={status._id.toString()}/>
                    <DeleteStatusBtn id={status._id.toString()}/>
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