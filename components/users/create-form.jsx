"use client";

import {  useState} from "react";
import { createUser } from "@/actions/user-actions";
import { SaveUserBtn, CancelUserBtn } from "@/components/users/buttons";
import { toast } from 'react-toastify';
import CheckboxDefault from "@/components/checkboxes/checkbox";
import { ZodErrors } from "@/components/common/zodErrors";



export default function UserCreateForm() {
  const [state, setState] = useState(null);

  async function onSubmit(event) {
    event.preventDefault();
    setState(null);
    
    const formData = new FormData(event.currentTarget);
    const response = await createUser(formData, false);

    if (response.error === "validation") {
            setState(response);
            toast.error(response.message);
        } 
    else if (response.error==="userexists") {
          toast.error(response.message);
        } 
    else {
          toast.error(response.error);
        }
      
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
      <h3 className="font-medium text-black dark:text-white">
        New User Form
      </h3>
    </div>
    <form onSubmit={onSubmit}>
      <div className="p-6.5">
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              First name:<span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              name="first_name"
              placeholder="Enter your first name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
              <ZodErrors error={state?.zodErrors?.first_name} />
          </div>

          <div className="w-full xl:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Last name:<span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              name="last_name"
              placeholder="Enter your last name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
             <ZodErrors error={state?.zodErrors?.last_name} />
          </div>
        </div>

        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <div className="w-full xl:w-1/2">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Email:<span className="text-meta-1">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            autoComplete="new-email"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
           <ZodErrors error={state?.zodErrors?.email} />
        </div>

        <div className="w-full xl:w-1/2">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Password:<span className="text-meta-1">*</span>
          </label>
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="Enter password"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          <ZodErrors error={state?.zodErrors?.password} />
        </div>
        </div>

        <div>
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <CheckboxDefault title="Is User Admin?" name="isadmin" checked={false} />

          </div>
        </div>
    </div>
    <div className="mt-6 flex justify-end gap-4">
          <CancelUserBtn/>
          <SaveUserBtn/>
        </div>
      </div>
    </form>
  </div>

  );
}