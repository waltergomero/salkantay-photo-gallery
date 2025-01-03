"use client";

import { useState} from "react";
import { createProduct } from "@/actions/product-actions";
import { SaveProductBtn, CancelProductBtn } from "@/components/products/buttons";
import { ZodErrors } from "@/components/common/zodErrors";
import { toast } from 'react-toastify';


export default function ProductCreateForm({categories}) {

  const [CategoryValue, setCategoryValue] = useState("");
   const [state, setState] = useState(null);
  
    async function onSubmit(event) {
      event.preventDefault();
      setState(null);
      
      const formData = new FormData(event.currentTarget);
      const response = await createProduct(formData);
  
      if (response.error === "validation") {
              setState(response);
              toast.error(response.message);
          } 
      else if (response.error==="productexists") {
            toast.error(response.message);
          } 
      else {
            toast.error(response.error);
          }
        
    }


  const handleClick = e => {
    e.preventDefault();
    const dropdownName = e.target.options[e.target.selectedIndex].text;
    setCategoryValue(dropdownName);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
      <h3 className="font-medium text-black dark:text-white">
        New Product Form
      </h3>
    </div>
    <form onSubmit={onSubmit} >
    <input type="hidden" name="category_name" defaultValue={CategoryValue}/>
      <div className="p-6.5">
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Product name:<span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              name="product_name"
              placeholder="Enter product name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
               <ZodErrors error={state?.zodErrors?.product_name} />
          </div>
          <div className="w-full xl:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Slug (code name):<span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              name="slug"
              placeholder="Enter product code name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
               <ZodErrors error={state?.zodErrors?.slug} />
          </div>
        </div>
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Category:<span className="text-meta-1">*</span>
            </label>
            <select
              name="category_id"
              onClick={handleClick}
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 px-5 py-1 text-sm outline-2 placeholder:text-gray-500">
              <option value=""></option>
              {categories.map((category) => (
                <option key={category._id.toString()} value={category._id.toString()}>
                  {category.category_name}
                </option>
              ))}
            </select>
               <ZodErrors error={state?.zodErrors?.category_id} />
          </div>
          <div className="w-full xl:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Quantity per unit:
            </label>
            <input
              type="text"
              name="quantity_per_unit"
              placeholder="Enter quantity per unit"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

        </div>
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Cost:
            </label>
            <input
              type="number"
              name="cost"
              step="0.01"
              placeholder="Enter cost of the product"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="w-full xl:w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Price:
            </label>
            <input
              type="number"
              name="price"
              step="0.01"
              placeholder="Enter price to sell the product"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/3">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              In Stock:
            </label>
            <input
              type="number"
              name="number_instock"
              step="0.01"
              placeholder="Enter number of product in stock"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="w-full xl:w-1/3">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              On Order:
            </label>
            <input
              type="number"
              name="number_onorder"
              step="0.01"
              placeholder="Enter number of product on order"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="w-full xl:w-1/3">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Reorder level:
            </label>
            <input
              type="number"
              name="reorder_level"
              step="0.01"
              placeholder="Enter reorder level of the product"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-2/3">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Description:
                  </label>
                  <textarea
                    rows={2}
                    name="description"
                    placeholder="Type your notes here..."
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
          </div>
        </div>

    <div className="mt-6 flex justify-end gap-4">
          {/* <Link
            href="/dashboard/products"
            className="flex h-10 items-center rounded-lg bg-gray-400 px-4 text-sm font-medium text-gray-100 transition-colors hover:bg-gray-500"
          >
            Cancel
          </Link> */}
          <CancelProductBtn/>
          <SaveProductBtn/>
        </div>
      </div>
    </form>
  </div>

  );
}