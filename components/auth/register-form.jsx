'use client';

import {
  AtSymbolIcon,
  KeyIcon, EyeIcon, EyeSlashIcon,
} from '@heroicons/react/24/outline';
import { useState } from "react";
import { createUser } from '@/actions/user-actions2';
import { toast } from 'react-toastify';
import { ZodErrors } from "@/components/common/zodErrors";


  const RegisterForm = () => {
    const [state, setState] = useState(null);
    const [visible, setVisible] = useState(false);
    const [password, setPassword] = useState("")


  async function onSubmit(event) {
        event.preventDefault();
        setState(null);
        
        const formData = new FormData(event.currentTarget);
        const response = await createUser(formData, true);
    
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
    <form onSubmit={onSubmit}>
    <div className="p-2">
    <div className="mb-4">
            <label className="block text-sm font-medium text-black dark:text-white">First Name:</label>
            <div className="relative">
            <input
                 id="first_name"
                 type="text"
                 name="first_name"
                 placeholder="Enter your first name"
                className="w-full rounded border-[1.5px] pl-4  border-stroke bg-transparent px-5 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
            <ZodErrors error={state?.zodErrors?.first_name} />
            </div>
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium text-black dark:text-white">Last Name:</label>
            <div className="relative">
            <input
                 id="last_name"
                 type="text"
                 name="last_name"
                 placeholder="Enter your last name"
                className="w-full rounded border-[1.5px] pl-4  border-stroke bg-transparent px-5 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
            <ZodErrors error={state?.zodErrors?.last_name} />
            </div>
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium text-black dark:text-white">Email:</label>
            <div className="relative">
            <input
                 id="email"
                 type="email"
                 name="email"
                 placeholder="Enter your email address"
                className="w-full rounded border-[1.5px] pl-10  border-stroke bg-transparent px-5 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <ZodErrors error={state?.zodErrors?.email} />
        </div>
        <div>
            <label className="block text-sm font-medium text-black dark:text-white">Password:</label>
            <div className="relative">
            <input
                id="password"
                value={password}
                type={visible ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                minLength={6}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded border-[1.5px] pl-10  border-stroke bg-transparent px-5 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"/>
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            <span onClick={() => setVisible(!visible)} className="cursor-pointer absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900">
             {!visible ? <EyeSlashIcon /> : <EyeIcon />} 
            </span>          
        </div>
        <ZodErrors error={state?.zodErrors?.password} />
        </div>
    <div className='mt-4'>
    <button type="submit" className="flex w-full justify-center rounded bg-blue-500 p-3 font-medium text-gray hover:bg-opacity-90">
      Register
    </button>
    </div>
    </div>
    </form>

  )
}

export default RegisterForm;