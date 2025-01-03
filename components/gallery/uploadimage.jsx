
import React, {useRef} from 'react'
import { useState} from "react";
import { TrashIcon,PlusIcon} from "@heroicons/react/24/outline";
import Compressor from "compressorjs";
import {  useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


const UploadImage = ({categories}) => {
    const router = useRouter();
    const inputFile = useRef(null);

    const [selectedImages, setSelectedImages] = useState([])
    const [isActive, setIsActive] = useState(false);
    const [categoryValue, setCategoryValue] = useState(null);
    const [categoryText, setCategoryText] = useState(null);
  
    
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

   const uploadImages = async (e) => {
    console.log("categoryText: ", categoryText)
    const API_PATH = "/api/dashboard/gallery/";

    if(categoryText === null) {
      toast.error("Please select a category.");
      return
    }
    else{
        if (selectedImages != null) {
          selectedImages && selectedImages?.map((image) => {
            const extension = image.name.substr(image.name.lastIndexOf(".") + 1);    
            new Compressor(image, {
              quality: 0.9, // 0.6 can also be used, but its not recommended to go below.
              maxWidth: 1290,
              maxHeight: 1290,
              success: (result) => {
                const formdata = new FormData();
                formdata.append("image", image);
                formdata.append("extension", extension);
                formdata.append("category_id", categoryValue);
                formdata.append("category_name", categoryText);
                fetch(API_PATH, {
                  method: "POST",
                  body: formdata,
                });
              },
            });
              
          });
        } 
        else {
          setErrorMessage(true);
        }
    }
    setTimeout(() => {
      router.refresh();
    }, 1000)

    setSelectedImages([]);
    setIsActive(false);

    if (inputFile.current) {
      inputFile.current.value = "";
      inputFile.current.type = "file";   
      };
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


  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!isOpen);

  return (
    <>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke dark:border-strokedark ">
            <button
                onClick={toggleMenu}
                className="flex h-8 items-center m-4 px-4 text-sm font-medium text-white transition-colors rounded-lg bg-blue-600 hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {isOpen ? ' Close ' : ' Add Images '}
              </button>
            </div>
            {isOpen && (
            <div className="p-4">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
  
            <div className="w-full xl:w-1/5">
            <input type="hidden" name="category_name" defaultValue={categoryText}/>
            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Category:<span className="text-meta-1">*</span>
              </label>
              <select
                name="category_id"
                onClick={handleClick}
                required
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 px-3 mb-2 py-1 text-sm outline-2 placeholder:text-gray-500">
                <option value=""></option>
                {categories.map((category) => (
                  <option key={category._id.toString()} value={category._id.toString()}>
                    {category.category_name}
                  </option>
                ))}
              </select>
                <input
                  type="file"
                  ref={inputFile}
                  name="fileupload"
                  required 
                  multiple
                  onChange={uploadImagesHandler}
                  className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                />
                </div>
                <div className="w-full xl:w-4/5">
                <div className="flex gap-4">  
                    {selectedImages && selectedImages?.map((image,index) => (           
                        <div className="relative" key={index}>
                            <img  
                              className="rounded-md"
                              width="150"
                              data-key={image.name}                              
                              src={URL.createObjectURL(image)}  alt="uploaded Images" />  
                        <button className="absolute top-0 right-2 rounded-sm bg-rose-400" 
                         onClick={() => removeSelectedImage(image.name)}
                            >
                            <TrashIcon className="w-5 h-5 text-white"/></button> 
                        </div> 
                                                                                                                                                                           
                      ))}
                    </div>
                </div>
                </div>
                <div className="mt-6 flex justify-center gap-4">
                <button type="submit"
                        disabled={!isActive}
                        onClick={uploadImages}
                        className={ `
                            flex h-10 items-center rounded-lg 
                            ${isActive ? 'bg-blue-600 hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600' 
                                : 'bg-blue-200'} 
                            px-4 text-sm font-medium text-white transition-colors `}>
                        <span className="hidden md:block">Save Images</span>
                        <PlusIcon className="h-6 md:ml-4" />
                        </button>
                </div>
            </div>
            )}
        </div>
    </>
  )
}

export default UploadImage