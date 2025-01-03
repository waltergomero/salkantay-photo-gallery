'use client';

import Link from 'next/link';
import { useState } from 'react';


const Navbar = () => {
  const [showNav, setShowNav] = useState(false);

  return (
      <header >
<div className="w-full flex py-5 items-center bg-black-2">
    <div className="flex-grow "></div>
    <Link href="" className="text-base md:text-sm lg:text-md flex-shrink mx-2 text-gray-400 font-bold">CATEGORY</Link> | 
    <Link href="" className="text-base md:text-sm lg:text-md flex-shrink mx-2 text-gray-400 font-bold">B&W</Link> 
    <div
        id="logo"
        className="text-base sm:text-lg md:text-xl lg:text-2xl p-2 inline-flex items-center text-white font-serif font-bold"
      >
        <Link href="/">
          MANTARO PHOTO GALLERY
        </Link>
      </div>
    <Link href="" className="text-base md:text-sm lg:text-md flex-shrink mx-2 text-gray-400 font-bold">COLLECTIONS</Link> |
    <Link href="/auth/signin" className="text-base md:text-sm lg:text-md flex-shrink mx-2 text-gray-400 font-bold">LOGIN</Link>
    <div className="flex-grow "></div>
</div>
    </header>

  );
};

export default Navbar;
