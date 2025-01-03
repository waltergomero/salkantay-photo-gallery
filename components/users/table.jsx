import { UpdateUserBtn, DeleteUserBtn } from '@/components/users/buttons';
import { fetchFilteredUsers } from '@/actions/user-actions';
import { Fragment } from 'react';
import Image from 'next/image';

export default async function UsersTable({ query, currentPage }) {
  const users = await fetchFilteredUsers(query, currentPage);

  return (
    <Fragment>
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mt-2">
    <div className="px-4 py-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Users
        </h4>
      </div>
      <div className="max-w-full overflow-x-auto">
      <div className="md:hidden">
              {users &&
                users?.map((user) => (
                  <div
                    key={user._id.toString()}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <Image
                            src="/user-icon.png"
                            className="mr-2 rounded-full"
                            width={28}
                            height={28}
                            alt={`${user.first_name}'s profile picture`}
                          />
                          <p>{user.last_name + ' ' + user.first_name}</p>
                        </div>
                        <p className="text-sm text-gray-500">Email: {user.email}</p>
                        <div>
                        <p className="text-sm text-gray-500">Is admin?: {user.isadmin? 'Yes': 'No'}</p>
                        <p className="text-sm text-gray-500">is active?: {user.isactive? 'Yes': 'No' }</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between pt-4">
                      <div className="flex justify-end gap-2">
                        <UpdateUserBtn id={user._id.toString()} />
                        <DeleteUserBtn id={user._id.toString()} />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
        <table className="hidden min-w-full table-auto md:table">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="px-4 py-4 font-medium text-black dark:text-white xl:pl-8">
                Last name
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                First name
              </th>
              <th className=" px-4 py-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Is admin?
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Is active?
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
          {users &&
                users?.map((user) => (
              <tr key={user._id.toString()}>
                <td className="border-b border-[#eee] px-4 py-4 pl-9 dark:border-strokedark xl:pl-8">
                  <h5 className="font-medium text-black dark:text-white">
                    {user.last_name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {user.first_name}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {user.email}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                  {user.isadmin ? 'Yes' : 'No'}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                  {user.isactive ? 'Yes' : 'No'}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <UpdateUserBtn id={user._id.toString()}/>
                    <DeleteUserBtn id={user._id.toString()}/>
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