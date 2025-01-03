import React from 'react';
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Gallery from '@/components/gallery/gallery';
import {fetchCategories} from "@/actions/category-actions";
import {fetchImages} from "@/actions/gallery-actions";

const GalleryPage = async () => {
    const categories = await fetchCategories();
    const images = await fetchImages()
  return (
    <main>
    <Breadcrumbs
      breadcrumbs={[
        { label: "Photo Gallery", href: "/dashboard/gallery" },

      ]}
    />
    <Gallery categories={categories} images={images}/>
  </main>
  )
}

export default GalleryPage