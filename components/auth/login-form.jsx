'use client';
import {
  AtSymbolIcon,
  KeyIcon, EyeIcon, EyeSlashIcon,
} from '@heroicons/react/24/outline';
import { useState } from "react";
import { doCredentialLogin } from '@/actions/user-actions';
import { toast } from 'react-toastify';
import { ZodErrors } from "@/components/common/zodErrors";
import { useRouter } from "next/navigation";

import Link from 'next/link';

const LoginForm = () => {
  const router = useRouter();
  const [state, setState] = useState(null);
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("")

 
  async function onSubmit(event) {
    event.preventDefault();
    try {
        const formData = new FormData(event.currentTarget);
        const response = await doCredentialLogin(formData);
        console.log("client response", response);
        if (response.error) {
            setState(response);
            toast.error(response.error);
        } else {
            router.push("/admin");
        }
    } catch (e) {
      toast.error("Check your Credentials");
    }
 }

  return (
  
    <form onSubmit={onSubmit}>
    <div className="p-2">
        <div className="mb-4">
            <label htmlFor='email' className="block text-sm font-medium text-black dark:text-white">Email:</label>
            <div className="relative">
            <input
                 id="email"
                 type="email"
                 name="email"
                 placeholder="Enter your email address"
                className="w-full rounded border-[1.5px] pl-10  border-stroke bg-transparent px-5 py-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <ZodErrors error={state?.zodErrors?.email} />
        </div>
        <div>
            <label htmlFor='password' className="block text-sm font-medium text-black dark:text-white">Password:</label>
            <div className="relative">
            <input
                id="password"
                value={password}
                type={visible ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                minLength={6}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded border-[1.5px] pl-10  border-stroke bg-transparent px-5 py-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"/>
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            <span onClick={() => setVisible(!visible)} className="cursor-pointer absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900">
             {!visible ? <EyeSlashIcon /> : <EyeIcon />} 
            </span>
        </div>
        <ZodErrors error={state?.zodErrors?.password} />
        </div>
        <div className="mb-5.5 mt-5 flex  items-center justify-between">
          <div className='flex items-center'>
          <input id='rememberme' name='rememberme' type='checkbox'
          className='h-4 w-4 text-indigo-600 rounded'/>
          <label htmlFor='rememberme' className='ml-2 block text-sm text-gray-900'>Remember me</label>
          </div>
          <div>
          <Link href="#" className="text-md text-blue-500 hover:underline">
            Forgot your password?
          </Link>
          </div>
    </div>
    <div className='mt-4'>
    <button type="submit" className="flex w-full justify-center rounded bg-blue-500 p-3 font-medium text-gray hover:bg-opacity-90">
      Sign In
    </button>
    </div>
    </div>
    </form>

  )
}

export default LoginForm;