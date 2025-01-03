import CategoryEditForm from "@/components/categories/edit-form";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import {fetchCategoryById, fetchParentCategories, } from '@/actions/category-actions'
import notFound from "./not-found";

export default async function CategoryEditPage({params}) {
  const {id} = await params;

  const [category] = await Promise.all([fetchCategoryById(id)]);
  const parentcategory = await fetchParentCategories();


  if (!category) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Category", href: "/admin/categories" },
          {
            label: "Update Category Information",
            href: `/admin/categories/${id}/edit`,
            active: true,
          },
        ]}
      />
      <CategoryEditForm category={category} parentcategory={parentcategory}/>
    </main>
  );
}
