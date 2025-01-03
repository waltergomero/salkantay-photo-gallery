import UserEditForm from "@/components/users/edit-form";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import {fetchUserById} from '@/actions/user-actions'
import notFound from "./not-found";

export default async function UserEditPage({params}) {

  const {id} = await params;
  const [user] = await Promise.all([fetchUserById(id)]);
  console.log("user edit page", user);

  if (!user) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Users", href: "/admin/users" },
          {
            label: "Update User Information",
            href: `/admin/users/${id}/edit`,
            active: true,
          },
        ]}
      />
      <UserEditForm user={user}/>
    </main>
  );
}