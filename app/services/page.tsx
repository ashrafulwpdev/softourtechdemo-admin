import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import * as A from "./actions";

export const revalidate = 0;

export default async function Services() {
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });

  async function updateAction(id: number, fd: FormData) { "use server"; await A.updateService(id, fd); }
  async function deleteAction(id: number) { "use server"; await A.deleteService(id); }

  return (
    <div className="grid gap-4">
      <Card>
        <h2 className="text-lg font-semibold">Create service</h2>
        <form action={A.createService} className="mt-3 grid gap-3 md:grid-cols-2">
          <div><label className="label">Title</label><input name="title" className="input mt-1" required/></div>
          <div><label className="label">Icon key</label><input name="iconKey" className="input mt-1"/></div>
          <div className="md:col-span-2"><label className="label">Short description</label><input name="shortDesc" className="input mt-1"/></div>
          <div className="md:col-span-2"><label className="label">Bullets (comma separated)</label><input name="bullets" className="input mt-1"/></div>
          <div><label className="label">Order</label><input name="order" type="number" className="input mt-1" defaultValue="0"/></div>
          <label className="label inline-flex items-center gap-2"><input type="checkbox" name="active" defaultChecked/> Active</label>
          <div className="md:col-span-2"><Button type="submit">Add Service</Button></div>
        </form>
      </Card>

      <div className="grid gap-4">
        {services.map(s => (
          <Card key={s.id}>
            <form action={updateAction.bind(null, s.id)} className="grid gap-3 md:grid-cols-2">
              <div><label className="label">Title</label><input name="title" defaultValue={s.title} className="input mt-1"/></div>
              <div><label className="label">Icon key</label><input name="iconKey" defaultValue={s.iconKey} className="input mt-1"/></div>
              <div className="md:col-span-2"><label className="label">Short description</label><input name="shortDesc" defaultValue={s.shortDesc} className="input mt-1"/></div>
              <div className="md:col-span-2"><label className="label">Bullets</label><input name="bullets" defaultValue={s.bullets.join(', ')} className="input mt-1"/></div>
              <div><label className="label">Order</label><input name="order" type="number" defaultValue={s.order} className="input mt-1"/></div>
              <label className="label inline-flex items-center gap-2"><input type="checkbox" name="active" defaultChecked={s.active}/> Active</label>
              <div className="md:col-span-2 flex gap-2">
                <Button type="submit">Save</Button>
                <form action={deleteAction.bind(null, s.id)}>
                  <Button variant="danger">Delete</Button>
                </form>
              </div>
            </form>
          </Card>
        ))}
      </div>
    </div>
  );
}
