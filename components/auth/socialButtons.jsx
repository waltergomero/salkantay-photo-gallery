"use client"

import React from 'react';
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import { toast } from 'react-toastify';
import { doSocialLogin } from '@/actions/user-actions2';

const SocialButtons = () => {

  const handleClick = async (event, provider) => {

    event.preventDefault();
    try {
        const response = await doSocialLogin(provider);
        if (response.error) {
            toast.error(response.error);
        } else {
            router.push("/admin");
        }
    } catch (error) {
      console.log("error: ", error)
      toast.error("Check your Credentials");
    }
  };

  return (
    <form onSubmit={handleClick} >
    <div className='flex items-center w-full p-2 gap-x-2 pb-4'>
      <button type='submit' 
      className='flex w-full justify-center rounded p-3 font-medium text-black border' 
      onClick={(event) => handleClick(event, 'google')}>
        <FcGoogle className='w-6 h-6 mr-2'/>Sign in with Google
      </button>
      <button  type='submit' 
      className='flex w-full justify-center rounded  p-3 font-medium text-black border' 
       onClick={(event) => handleClick(event, 'github')}>
        <FaGithub className='w-6 h-6 mr-2'/>Sign in with  Github
      </button>
    </div>
    </form>
  )
}

export default SocialButtons;

// "use client"

// import React from 'react';
// import {FcGoogle} from "react-icons/fc";
// import {FaGithub} from "react-icons/fa";
// import { signIn } from 'next-auth/react';

// const SocialButtons = () => {


//   return (
//     <div className='flex items-center w-full p-2 gap-x-2 pb-4'>
//       <button className='flex w-full justify-center rounded p-3 font-medium text-black border' onClick={() => signIn("google")}>
//         <FcGoogle className='w-6 h-6 mr-2'/>Sign in with Google
//       </button>
//       <button className='flex w-full justify-center rounded  p-3 font-medium text-black border' onClick={() => signIn("github")}>
//         <FaGithub className='w-6 h-6 mr-2'/>Sign in with  Github
//       </button>
//     </div>
//   )
// }

// export default SocialButtons