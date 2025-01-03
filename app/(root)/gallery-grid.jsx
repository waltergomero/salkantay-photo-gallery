"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const GalleryGrid = ({images}) => {

  const onInit = () => {
    console.log("lightGallery has been initialized");
    console.log("images", images)
  };

  return (
        <div className='relative text-center'>     
        {images && images?.map((item) =>(
          <Link
             key={item.category_id}
             href={`/gallerybycategory/${item.category_id}`}
             shallow
             className="after:content group relative mb-0.5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                  >
              <Image
              alt="Next.js Conf photo"
              className="transform brightness-40 transition will-change-auto group-hover:brightness-110"
              style={{ transform: 'translate3d(0, 0, 0)' }}        
              src={item.path}
              width={720}
              height={480}
              sizes="(max-width: 640px) 100vw,
                (max-width: 1280px) 50vw,
                (max-width: 1536px) 33vw,
                25vw"
            />
            <span className="absolute top-[50%] left-[35%] p-2 rounded-md uppercase  text-white text-2xl">{item.category_name}</span>
            </Link>
        ))
            }
        </div>
  )
}

export default GalleryGrid