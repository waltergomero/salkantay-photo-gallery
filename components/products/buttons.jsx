import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  XCircleIcon, PhotoIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteProduct, deleteImageFromProduct } from "@/actions/product-actions";
import { Button } from "@/components/ui/button";


export function CreateProductBtn() {
  return (
    <Link
      href="/admin/products/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Add New Product</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateProductBtn({ id }) {
  return (
    <Link
      href={`/admin/products/edit/${id}/${0}`}  >
      <PencilIcon className="w-5 text-blue-500" />
    </Link>
  );
}

export function DeleteProductBtn({ id }) {
  const deleteProductWithId = deleteProduct.bind(null, id);
  return (
    <form action={deleteProductWithId}>
      <button >
        <TrashIcon className="w-4 text-rose-500" />
      </button>
    </form>
  );
}

export function CancelProductBtn() {
  return (
    <Link
      href="/admin/products"
      className="flex h-10 items-center rounded-lg bg-gray-400 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
    >
      <span className="hidden md:block">Cancel</span>{" "}
      <XCircleIcon className="h-6 md:ml-4" />
    </Link>
  );
}

export function SaveProductBtn() {
  return (
    <Button type="submit" 
    className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
      <span className="hidden md:block">Save Product</span>
      <PlusIcon className="h-6 md:ml-4" />
    </Button>
  );
}

export function DeleteImageFromProductBtn({id, image_path}) {
  const deleteProductImageId = deleteImageFromProduct.bind(null, id, image_path);
 
  return (
    <form action={deleteProductImageId}>
      <button className="absolute top-0 right-0 rounded-sm bg-rose-400">
        <TrashIcon className="w-5 h-5 text-white" />
      </button>
    </form>
  );
}

export function SaveImageBtn() {
  return (
    <Button type="submit"
    className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
      <span className="hidden md:block">Save Images</span>
      <PlusIcon className="h-6 md:ml-4" />
    </Button>
  );
}

export function AddImageToProductBtn({ id }) {
  return (
    <Link
      href={`/admin/products/edit/${id}/${1}`}  >
      <PhotoIcon className="w-5 text-blue-500" />
    </Link>
  );
}