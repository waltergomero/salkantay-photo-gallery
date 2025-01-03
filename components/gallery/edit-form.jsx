'use client';

import React  from 'react'
import { useState} from "react";
import { PlusIcon} from "@heroicons/react/24/outline";
import {CancelUpdateBtn} from "@/components/gallery/buttons";
import { updateImageCategory } from '@/actions/gallery-actions';
import {  useRouter } from 'next/navigation';
import { toast } from 'react-toastify';



const EditImageForm = ({image, categories}) => {
    const router = useRouter();
    const [categoryValue, setCategoryValue] = useState(image.category_id);
    const [categoryText, setCategoryText] = useState(image.category_name);
    const id= image._id;
    const image_name= image.image_name;
    const path= image.path;

  
    
   const saveImageInformation = async (e) => {
    e.preventDefault();
    if(categoryText === null) {
      toast.error("Please select a category.");
      return
    }
    else{
        const formdata = new FormData();
        formdata.append("image_id", id);
        formdata.append("image_name", image_name);
        formdata.append("category_id", categoryValue);
        formdata.append("category_name", categoryText);
        formdata.append("path", path);

        await updateImageCategory(formdata);
    }
    setTimeout(() => {
      router.refresh();
    }, 1000)

  }

  const handleClick = e => {
    e.preventDefault();
    const dropdownName = e.target.options[e.target.selectedIndex].text;
    if(dropdownName){
      setCategoryText(dropdownName);
      setCategoryValue(e.target.value);
    } 
    else{
      setCategoryText(null);
      setCategoryValue(null);
    }
  };

  return (

        <div className="rounded-sm p-4 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="mb-4 flex justify-center">
            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Category:<span className="text-meta-1">*</span>
              </label>
              <select
                name="category_id"
                onClick={handleClick}
                defaultValue={categoryValue}
                required
                className="peer ml-2 block w-[25%] cursor-pointer rounded-md border border-gray-200 px-3 mb-2 py-1 text-sm outline-2 placeholder:text-gray-500">
                {categories.map((category) => (
                  <option key={category._id.toString()} value={category._id.toString()}>
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center">
                <img  
                    className="rounded-md"
                        width="480"                            
                    src={image.path}  alt={image.caption} />  
               </div>     
                <div className="mt-6 flex justify-center gap-4">
                    <CancelUpdateBtn />
                    
                <button type="submit"
                        onClick={saveImageInformation}
                        className="flex h-10 mb-4 items-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors px-4 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                        <span className="hidden md:block">Save Image Information</span>
                        <PlusIcon className="h-6 md:ml-4" />
                        </button>
                </div>
            </div>        

  )
}

export default EditImageForm