import ProductCreateForm from "@/components/products/create-form";
import {fetchCategories} from "@/actions/category-actions";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export default async function StatusCreatePage() {
  const categories = await fetchCategories();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Products", href: "/dashboard/products" },
          {
            label: "Add New Product",
            href: "/dashboard/products/create",
            active: true,
          },
        ]}
      />
      <ProductCreateForm categories={categories}/>
    </main>
  );
}
