import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  XCircleIcon, EyeIcon, EyeSlashIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteImageFromGallery, MakeImageNotVisible, MakeImageVisible } from "@/actions/gallery-actions";
import { Button } from "@/components/ui/button";



export function EditImageBtn({id }) {
  return (
    <Link className="absolute top-18 right-0 rounded-sm bg-green-400"
      href={`/admin/gallery/${id}/edit`}  >
      <PencilIcon className="w-7" />
    </Link>
  );
}

export function DeleteImageBtn({ image_id, image_path }) {
  const deleteImageId = deleteImageFromGallery.bind(null, image_id, image_path);
  return (
    <form action={deleteImageId}>
      <button className="absolute top-1 right-0 rounded-sm bg-rose-400">
        <TrashIcon className="w-7 text-white" />
      </button>
    </form>
  );
}

export function SetImageVisible({ image_id}) {
  const makeImageVisible = MakeImageVisible.bind(null, image_id);
  return (
    <form action={makeImageVisible}>
      <button className="absolute top-10 right-0 rounded-sm bg-gray-400">
        <EyeSlashIcon className="w-7 text-white" />
      </button>
    </form>
  );
}

export function SetImageNotVisible({ image_id, image_path}) {
  console.log("button ImageIsVisible", image_id, image_path)
  const makeImageNotVisble = MakeImageNotVisible.bind(null, image_id, image_path);
  return (
    <form action={makeImageNotVisble}>
      <button className="absolute top-10 right-0 rounded-sm bg-blue-500">
        <EyeIcon className="w-7 text-white" />
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

export function CancelUpdateBtn() {
  return (
    <Link
      href="/admin/gallery"
      className="flex h-10 items-center rounded-lg bg-gray-400 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
    >
      <span className="hidden md:block">Cancel</span>{" "}
      <XCircleIcon className="h-6 md:ml-4" />
    </Link>
  );
}
// export function CreateProduct() {
//   return (
//     <Link
//       href="/dashboard/products/create"
//       className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
//     >
//       <span className="hidden md:block">Add New Product</span>{" "}
//       <PlusIcon className="h-5 md:ml-4" />
//     </Link>
//   );
// }

// export function UpdateProduct({ id }) {
//   return (
//     <Link
//       href={`/dashboard/products/${id}/edit`}  >
//       <PencilIcon className="w-5" />
//     </Link>
//   );
// }

// export function DeleteProduct({ id }) {
//   const deleteProductWithId = deleteProduct.bind(null, id);
//   return (
//     <form action={deleteProductWithId}>
//       <button >
//         <TrashIcon className="w-4 text-rose-500" />
//       </button>
//     </form>
//   );
// }

// export function CancelProduct() {
//   return (
//     <Link
//       href="/dashboard/products"
//       className="flex h-10 items-center rounded-lg bg-gray-400 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
//     >
//       <span className="hidden md:block">Cancel</span>{" "}
//       <XCircleIcon className="h-6 md:ml-4" />
//     </Link>
//   );
// }

// export function SaveProductBtn() {
//   return (
//     <Button type="submit" 
//     className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
//       <span className="hidden md:block">Save Product</span>
//       <PlusIcon className="h-6 md:ml-4" />
//     </Button>
//   );
// }
