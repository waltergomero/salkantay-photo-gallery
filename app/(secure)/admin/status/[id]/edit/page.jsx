import StatusEditForm from "@/components/status/edit-form";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import {fetchStatusById, fetchStatusTypeId} from '@/actions/status-actions'
import notFound from "./not-found";

export default async function StatusEditPage({params}) {
  const {id} = await params;

  const [status] = await Promise.all([fetchStatusById(id)]);
  const statustypeid = await fetchStatusTypeId();

  if (!status) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Status", href: "/dashboard/status" },
          {
            label: "Update Status Information",
            href: `/dashboard/status/${id}/edit`,
            active: true,
          },
        ]}
      />
      <StatusEditForm status={status} statustypeid={statustypeid}/>
    </main>
  );
}
