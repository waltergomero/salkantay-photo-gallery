import ImageEditForm from "@/components/gallery/edit-form";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import {fetchImageById, } from '@/actions/gallery-actions'
import {fetchCategories, } from '@/actions/category-actions'


export default async function ImageEditPage({params}) {
  const {id} = await params;

  const [imageInformation] = await Promise.all([fetchImageById(id)]);
  const categories = await fetchCategories();


  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Gallery", href: "/admin/gallery" },
          {
            label: "Update Image Information",
            href: `/admin/gallery/${id}/edit`,
            active: true,
          },
        ]}
      />
      <ImageEditForm image={imageInformation} categories={categories}/>
    </main>
  );
}
