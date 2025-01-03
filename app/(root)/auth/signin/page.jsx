import React from 'react'
import LoginForm from  '@/components/auth/login-form' 
import Link from 'next/link'

const LoginPage = () => {
  return (
    <main className="w-full flex items-center justify-center min-h-screen">
        <div className="w-150 overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4  ">
              <h3 className="mb-1.5 mt-4  text-center text-2xl font-semibold text-black dark:text-white">
                Sign in to your account
              </h3>
              <div className="mb-5.5 mt-5 flex justify-center">
            <Link href="#" className="text-md text-blue-500 hover:underline">
              You don't have an account?
            </Link>
          </div>
         <LoginForm/>
  
        </div>
    </div>
    </main>
    
  )
}

export default LoginPage