import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CategoryGrid from '@/app/(root)/gallerybycategory/category-grid';
import {fetchImagesByCategory} from "@/actions/gallery-actions";


const GalleryByCategory = async ({params}) => {
  const {id} = await params;
  const [images] = await Promise.all([fetchImagesByCategory(id[0])]);

  return (
        <div >
         <CategoryGrid images={images}/>
        </div>
  )
}

export default GalleryByCategory