import React, {useRef} from 'react'
import { useState} from "react";
import { SaveImageBtn } from "@/components/products/buttons";
import { TrashIcon,} from "@heroicons/react/24/outline";
import Compressor from "compressorjs";
import {  useRouter } from 'next/navigation';
import Link from "next/link";


const addImage = ({productid}) => {
  
  const [selectedImages, setSelectedImages] = useState([]);
  
  const uploadImagesHandler = (e) =>{
    const selectedFilesArray = Array.from(e.target.files)
    const imagesArray = selectedFilesArray.map((file) => {
        return URL.createObjectURL(file)
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray))
  }

  function removeSelectedImage(_name){
    selectedImages(image => image.filter(x => x.name != _name))
   };

  // const _addImagesToProduct = async (data) => {
  //   const API_PATH = "/api/dashboard/image/";
  //   alert("why")

  //   if (selectedFiles != null) {
  //     let order = 1;
  //     selectedFiles && selectedFiles?.map((image) => {
  //       const ext = image.name.substr(image.name.lastIndexOf(".") + 1);    
  //       new Compressor(image, {
  //         quality: 0.9, // 0.6 can also be used, but its not recommended to go below.
  //         maxWidth: 1290,
  //         maxHeight: 1290,
  //         success: (result) => {
  //           const formdata = new FormData();
  //           formdata.append("productid", productid);
  //           formdata.append("image", image);
  //           formdata.append("extension", ext);
  //           formdata.append("order", order);
  //           fetch(API_PATH, {
  //             method: "POST",
  //             body: formdata,
  //           });
  //           order ++;   
  //         },
  //       });
           
  //     });
  //   } 
  //   else {
  //     setErrorMessage(true);
  //   }
  //   setTimeout(() => {
  //     router.refresh();
  //   }, 1000)

  //   setSelectedFiles(null);
  //   //inputFile.current.value = "";
  //   //inputFile.current.type = "file";

  // };

  return (
    <>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white pt-4 pb-2">
                Images
            </h3>
            </div>
            <div className="p-4">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/5">
                        <input
                        type="file"
                        name="fileupload"
                        required 
                        multiple
                        onChange={uploadImagesHandler}
                        className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                        />

                </div>
                <div className="w-full xl:w-4/5">
                <div className="flex gap-2">  
                    {selectedImages && selectedImages?.map((file,index) => (             
                        <div className="relative" key={index}>
                                    <img  
                                    className="rounded-md"
                                    width="150"
                                    data-key={file.name}                              
                                    src={URL.createObjectURL(file)} alt="uploaded Images" />  
                        <button className="absolute top-0 right-0 rounded-md bg-rose-500 "  onClick={() => removeSelectedImage(file.name)}>
                            <TrashIcon className="w-5 h-5 text-white"/></button> 
                        </div>                                                                                                                                                          
                        ))}
                    </div>

                </div>
                </div>
                <div className="mt-6 flex justify-center gap-4">
                <Link
                    href="/dashboard/products"
                    className="flex h-10 items-center rounded-lg bg-gray-400 px-4 text-sm font-medium text-gray-100 transition-colors hover:bg-gray-500"
                >
                    Cancel
                </Link>
                <SaveImageBtn/>
                </div>
            </div>
        </div>
  </>
  )
}

export default addImage