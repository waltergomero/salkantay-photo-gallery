"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import Thumbnail from "lightgallery/plugins/thumbnail";

const CategoryGrid = ({images}) => {
  const categoryname = images[0]["category_name"];

  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

  return (
    <>
    <div className="relative mt-1 flex py-15 items-center bg-black-2">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-2 text-gray-400 text-2xl">CATEGORY: {categoryname}</span>
        <div className="flex-grow border-t border-gray-400"></div>
    </div>

    <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-2">
            <div className="mt-10 gap-1 columns-1  md:columns-2 lg:columns-3 xl:columns-4 xl:columns-5  mb-2"> 
          <LightGallery
            mode="lg-fade"
            onInit={onInit}
            speed={500}
            plugins={[Thumbnail, lgZoom]}
          >       
        {images && images?.map((item) =>(
          <Link
             key={item._id}
             href={item.path}
             shallow
             className="after:content group relative mb-0.5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight">
             {
             item.format==="Landscape"?
              <img
              alt={item.caption}
              className="transform w-96 h-72 rounded-md brightness-30 transition will-change-auto group-hover:brightness-110"
              style={{ transform: 'translate3d(0, 0, 0)' }}        
              src={item.path}
            />:
            <img
            alt={item.caption}
            className="transform w-72 h-96 rounded-md brightness-30 transition will-change-auto group-hover:brightness-110"
            style={{ transform: 'translate3d(0, 0, 0)' }}        
            src={item.path}
            
          />
             }
            </Link>
        ))
            }
            </LightGallery> 
        </div>
            </div>
        </div>
      </div>

    </>

  )
}

export default CategoryGrid