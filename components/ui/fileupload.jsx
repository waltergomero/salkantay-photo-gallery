import React from 'react';
import { useState} from "react";
import { TrashIcon,PlusIcon} from "@heroicons/react/24/outline";
import Compressor from "compressorjs";

const FileUpload = () => {
    const [selectedImages, setSelectedImages] = useState([])
    const [isActive, setIsActive] = useState(false);
  
    
    const uploadImagesHandler = (e) =>{
        const selectedFilesArray = Array.from(e.target.files)
        setSelectedImages((previousImages) => previousImages.concat(selectedFilesArray))
        setIsActive(true);
    }

    const removeSelectedImage =(_name) =>{
        setSelectedImages(image => image.filter(x => x.name != _name)) 
        if(selectedImages.length == 1)
            {
                setIsActive(false);
            }
    }

  return (
    <>
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
                    {selectedImages && selectedImages?.map((image,index) => (             
                        <div className="relative" key={index}>
                                    <img  
                                    className="rounded-md"
                                    width="150"
                                    data-key={image.name}                              
                                    src={URL.createObjectURL(image)}  alt="uploaded Images" />  
                        <button className="absolute top-0 right-0 rounded-sm bg-rose-400" 
                         onClick={() => removeSelectedImage(image.name)}
                            >
                            <TrashIcon className="w-5 h-5 text-white"/></button> 
                        </div>                                                                                                                                                          
                        ))}
                    </div>

                </div>
                </div>
    </>
  )
}

export default FileUpload