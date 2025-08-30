import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import * as A from "./actions";

export const revalidate = 0;

export default async function Pricing() {
  const services = await prisma.service.findMany({ include: { plans: { orderBy: { order: 'asc' } } }, orderBy: { order: 'asc' } });

  async function updateAction(id: number, fd: FormData) { "use server"; await A.updatePlan(id, fd); }
  async function deleteAction(id: number) { "use server"; await A.deletePlan(id); }

  return (
    <div className="grid gap-4">
      {services.map(s => (
        <Card key={s.id}>
          <h2 className="text-lg font-semibold">{s.title}</h2>
          <div className="grid gap-3 md:grid-cols-2 mt-3">
            <form action={A.addPlan} className="border rounded-lg p-3">
              <input type="hidden" name="serviceId" value={s.id} />
              <div><label className="label">Plan name</label><input name="name" className="input mt-1" required/></div>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div><label className="label">Currency</label><input name="currency" defaultValue="USD" className="input mt-1"/></div>
                <div><label className="label">Price text</label><input name="priceText" placeholder="$99/mo" className="input mt-1"/></div>
              </div>
              <div className="mt-2"><label className="label">Features (comma separated)</label><input name="features" className="input mt-1"/></div>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div><label className="label">Order</label><input type="number" name="order" defaultValue="0" className="input mt-1"/></div>
                <label className="label inline-flex items-center gap-2 mt-6"><input type="checkbox" name="popular"/> Popular</label>
              </div>
              <Button className="mt-3" type="submit">Add plan</Button>
            </form>

            <div className="grid gap-3">
              {s.plans.map(p => (
                <form key={p.id} action={updateAction.bind(null, p.id)} className="border rounded-lg p-3">
                  <div className="grid md:grid-cols-2 gap-3">
                    <div><label className="label">Plan name</label><input name="name" defaultValue={p.name} className="input mt-1"/></div>
                    <div><label className="label">Price text</label><input name="priceText" defaultValue={p.priceText} className="input mt-1"/></div>
                    <div><label className="label">Currency</label><input name="currency" defaultValue={p.currency} className="input mt-1"/></div>
                    <div><label className="label">Order</label><input type="number" name="order" defaultValue={p.order} className="input mt-1"/></div>
                  </div>
                  <div className="mt-2"><label className="label">Features</label><input name="features" defaultValue={p.features.join(', ')} className="input mt-1"/></div>
                  <div className="flex gap-2 mt-3">
                    <label className="label inline-flex items-center gap-2"><input type="checkbox" name="popular" defaultChecked={p.popular}/> Popular</label>
                    <Button type="submit">Save</Button>
                    <form action={deleteAction.bind(null, p.id)}><Button variant="danger">Delete</Button></form>
                  </div>
                </form>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
