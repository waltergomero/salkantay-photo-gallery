
import React from 'react'
import Image from 'next/image'
import {DeleteImageBtn, SetImageVisible, SetImageNotVisible, EditImageBtn } from './buttons'


const GalleryGrid =  ({images}) => {
  return (
    <>
  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-2">
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 xl:columns-4 2xl:columns-5">
    {images && images?.map((item) =>(
      <div className='relative after:content group relative mb-4 block w-full  after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight' 
         key={item.image_name}>
          <Image       
          alt={""}
          className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
          style={{ transform: 'translate3d(0, 0, 0)' }}             
          src={ item.path}
          width={720}
          height={480}
          layout="responsive"
          sizes="(max-width: 640px) 100vw,
            (max-width: 1280px) 50vw,
            (max-width: 1536px) 33vw,
            25vw"
        />
        <DeleteImageBtn image_id={item._id} image_path={item.path} />
        <EditImageBtn image_id={item._id} image_path={item.path} />
        { item.make_visible ? 
            <SetImageNotVisible image_id={item._id} image_path={item.path} />         
            :  <SetImageVisible image_id={item._id} /> 
        }
    
       </div>
    ))
        }
  
    </div>
    </div>
    </>
  )
}

export default GalleryGrid